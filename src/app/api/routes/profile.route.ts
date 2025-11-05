import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
	deleteFromR2,
	extractKeyFromUrl,
	generateFileKey,
	uploadToR2,
} from "@/lib/r2";
import { PrismaClient } from "../../../../prisma/generated/prisma/client";

const prisma = new PrismaClient();

// Schema for doctor verification submission
const doctorVerificationSchema = z
	.object({
		userId: z.string(),
		fullName: z.string().min(1, "Full name is required").uppercase(),
		phoneNumber: z.string().min(10, "Valid phone number is required"),
		location: z.string().min(1, "Location is required").uppercase(),
		specialty: z.string().uppercase().optional(),
		yearsOfExperience: z
			.number()
			.min(0, "Years of experience must be positive"),
		provisionalId: z.string().optional(),
		fullId: z.string().optional(),
		apcNumber: z.string().min(1, "APC number is required"),
		apcDocumentUrl: z.url("Valid document URL is required"),
	})
	.refine((data) => data.provisionalId || data.fullId, {
		message: "Either Provisional ID or Full ID must be provided",
		path: ["provisionalId"],
	});

const app = new Hono()
	// Get user profile with verification status
	.get(
		"/user/:userId",
		zValidator("param", z.object({ userId: z.string() })),
		async (c) => {
			const { userId } = c.req.valid("param");

			try {
				const user = await prisma.user.findUnique({
					where: { id: userId },
					include: {
						doctorVerification: true,
					},
				});

				if (!user) {
					return c.json({ error: "User not found" }, 404);
				}

				return c.json({ user });
			} catch (error) {
				console.error("Error fetching user profile:", error);
				return c.json({ error: "Failed to fetch user profile" }, 500);
			}
		},
	)
	// Upload APC document to R2
	.post("/upload-apc", async (c) => {
		try {
			const formData = await c.req.formData();
			console.log(formData);
			const file = formData.get("file") as File;
			const userId = formData.get("userId") as string;

			if (!file || !userId) {
				return c.json({ error: "File and userId are required" }, 400);
			}

			// Validate file type
			const allowedTypes = ["application/pdf"];
			if (!allowedTypes.includes(file.type)) {
				return c.json({ error: "Invalid file type. Only PDF is allowed" }, 400);
			}

			// Validate file size (1MB max)
			const maxSize = 1 * 1024 * 1024;
			if (file.size > maxSize) {
				return c.json({ error: "File size must be less than 1MB" }, 400);
			}

			// Convert file to buffer
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			// Generate unique key and upload to R2
			const fileKey = generateFileKey(userId, file.name);
			const result = await uploadToR2(buffer, fileKey, file.type);

			return c.json({ url: result.url, key: result.key }, 200);
		} catch (error) {
			console.error("Error uploading file:", error);
			return c.json({ error: "Failed to upload file" }, 500);
		}
	})
	// Submit doctor verification
	.post(
		"/verify-doctor",
		zValidator("json", doctorVerificationSchema),
		async (c) => {
			const data = c.req.valid("json");

			try {
				// Check if user exists
				const user = await prisma.user.findUnique({
					where: { id: data.userId },
					include: { doctorVerification: true },
				});

				if (!user) {
					return c.json({ error: "User not found" }, 404);
				}

				// Check if verification already exists
				if (user.doctorVerification) {
					return c.json({ error: "Verification already submitted" }, 400);
				}

				// Create doctor verification with PENDING status
				// User role will remain as USER until admin approves
				const verification = await prisma.doctorVerification.create({
					data: {
						userId: data.userId,
						fullName: data.fullName,
						phoneNumber: data.phoneNumber,
						location: data.location,
						specialty: data.specialty,
						yearsOfExperience: data.yearsOfExperience,
						provisionalId: data.provisionalId,
						fullId: data.fullId,
						apcNumber: data.apcNumber,
						apcDocumentUrl: data.apcDocumentUrl,
						status: "PENDING", // Explicitly set to PENDING
					},
				});

				// Update user's phone and location (but NOT the role)
				await prisma.user.update({
					where: { id: data.userId },
					data: {
						phoneNumber: data.phoneNumber,
						location: data.location,
						// Role stays as USER until admin approves
					},
				});

				return c.json(
					{
						verification,
						message:
							"Verification submitted successfully. Please wait for admin approval.",
					},
					201,
				);
			} catch (error) {
				console.error("Error submitting verification:", error);
				return c.json({ error: "Failed to submit verification" }, 500);
			}
		},
	)
	// Replace APC document for existing verification
	.post("/verification/:verificationId/replace-document", async (c) => {
		const verificationId = c.req.param("verificationId");

		try {
			const formData = await c.req.formData();
			const file = formData.get("file") as File;

			if (!file) {
				return c.json({ error: "File is required" }, 400);
			}

			// Get existing verification
			const verification = await prisma.doctorVerification.findUnique({
				where: { id: verificationId },
			});

			if (!verification) {
				return c.json({ error: "Verification not found" }, 404);
			}

			if (verification.status !== "PENDING") {
				return c.json(
					{ error: "Can only replace document while verification is pending" },
					400,
				);
			}

			// Validate file type
			const allowedTypes = ["application/pdf"];
			if (!allowedTypes.includes(file.type)) {
				return c.json({ error: "Invalid file type. Only PDF is allowed" }, 400);
			}

			// Validate file size (1MB max)
			const maxSize = 1 * 1024 * 1024;
			if (file.size > maxSize) {
				return c.json({ error: "File size must be less than 1MB" }, 400);
			}

			// Convert file to buffer
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			// Upload new file
			const fileKey = generateFileKey(verification.userId, file.name);
			const result = await uploadToR2(buffer, fileKey, file.type);

			// Delete old file
			try {
				const oldKey = extractKeyFromUrl(verification.apcDocumentUrl);
				await deleteFromR2(oldKey);
			} catch (error) {
				console.error("Failed to delete old file:", error);
				// Continue even if deletion fails
			}

			// Update verification with new URL
			await prisma.doctorVerification.update({
				where: { id: verificationId },
				data: {
					apcDocumentUrl: result.url,
				},
			});

			return c.json({ url: result.url, key: result.key }, 200);
		} catch (error) {
			console.error("Error replacing document:", error);
			return c.json({ error: "Failed to replace document" }, 500);
		}
	})
	// Update verification details (only for PENDING status)
	.patch("/verification/:verificationId", async (c) => {
		const verificationId = c.req.param("verificationId");
		const data = await c.req.json();

		try {
			// Check if verification exists and is PENDING
			const verification = await prisma.doctorVerification.findUnique({
				where: { id: verificationId },
			});

			if (!verification) {
				return c.json({ error: "Verification not found" }, 404);
			}

			if (verification.status !== "PENDING") {
				return c.json(
					{ error: "Can only edit verification while it's pending" },
					400,
				);
			}

			// Update verification
			const updated = await prisma.doctorVerification.update({
				where: { id: verificationId },
				data: {
					fullName: data.fullName,
					phoneNumber: data.phoneNumber,
					location: data.location,
					specialty: data.specialty || null,
					yearsOfExperience: data.yearsOfExperience,
					provisionalId: data.provisionalId || null,
					fullId: data.fullId || null,
					apcNumber: data.apcNumber,
				},
			});

			// Also update user's phone and location
			await prisma.user.update({
				where: { id: verification.userId },
				data: {
					phoneNumber: data.phoneNumber,
					location: data.location,
				},
			});

			return c.json({ verification: updated });
		} catch (error) {
			console.error("Error updating verification:", error);
			return c.json({ error: "Failed to update verification" }, 500);
		}
	})
	// Update user role (admin only)
	.patch("/user/:userId/role", async (c) => {
		const userId = c.req.param("userId");
		const { role } = await c.req.json();

		try {
			const user = await prisma.user.update({
				where: { id: userId },
				data: { role },
			});

			return c.json({ user });
		} catch (error) {
			console.error("Error updating user role:", error);
			return c.json({ error: "Failed to update user role" }, 500);
		}
	});

export default app;
