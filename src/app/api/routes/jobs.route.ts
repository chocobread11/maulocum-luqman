import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import z from "zod";
import { jobService } from "../services/job.service";
import {
	createJobSchema,
	type Job,
	jobQuerySchema,
	type PaginatedResponse,
	type SuccessResponse,
	updateJobSchema,
} from "../types/job.types";

// Initialize jobs route
const app = new Hono()

	/**
	 * GET /api/v2/jobs
	 * Get all jobs with pagination and filtering
	 */
	.get("/", zValidator("query", jobQuerySchema), async (c) => {
		const query = c.req.valid("query");

		try {
			const result = await jobService.getJobs(query);

			const response: PaginatedResponse<Job> = {
				success: true,
				...result,
			};

			return c.json(response);
		} catch (error) {
			if (error instanceof Error) {
				if (
					error.message.includes("exceeds total pages") ||
					error.message === "No jobs found"
				) {
					throw new HTTPException(404, { message: error.message });
				}
			}
			throw error;
		}
	})

	/**
	 * GET /api/v2/jobs/:id
	 * Get a single job by ID
	 */
	.get(
		"/:id",
		zValidator(
			"param",
			z.object({
				id: z.string(),
			}),
		),
		async (c) => {
			const { id } = c.req.valid("param");

			const job = await jobService.getJobById(id);

			if (!job) {
				throw new HTTPException(404, { message: "Job not found" });
			}

			const response: SuccessResponse<Job> = {
				success: true,
				data: job,
			};

			return c.json(response);
		},
	)

	/**
	 * POST /api/v2/jobs
	 * Create a new job
	 */
	.post("/", zValidator("json", createJobSchema), async (c) => {
		const data = c.req.valid("json");

		const job = await jobService.createJob(data);

		const response: SuccessResponse<Job> = {
			success: true,
			data: job,
		};

		return c.json(response, 201);
	})

	/**
	 * PUT /api/v2/jobs/:id
	 * Update an existing job
	 */
	.put(
		"/:id",
		zValidator(
			"param",
			z.object({
				id: z.string(),
			}),
		),
		zValidator("json", updateJobSchema),
		async (c) => {
			const { id } = c.req.valid("param");
			const data = c.req.valid("json");

			const job = await jobService.updateJob(id, data);

			if (!job) {
				throw new HTTPException(404, { message: "Job not found" });
			}

			const response: SuccessResponse<Job> = {
				success: true,
				data: job,
			};

			return c.json(response);
		},
	)

	/**
	 * DELETE /api/v2/jobs/:id
	 * Delete a job
	 */
	.delete(
		"/:id",
		zValidator(
			"param",
			z.object({
				id: z.string(),
			}),
		),
		async (c) => {
			const { id } = c.req.valid("param");

			const deleted = await jobService.deleteJob(id);

			if (!deleted) {
				throw new HTTPException(404, { message: "Job not found" });
			}

			return c.json({
				success: true,
				message: "Job deleted successfully",
			});
		},
	)

	/**
	 * POST /api/v2/jobs/:id/publish
	 * Publish a job (change status from draft to published)
	 */
	.post(
		"/:id/publish",
		zValidator(
			"param",
			z.object({
				id: z.string(),
			}),
		),
		async (c) => {
			const { id } = c.req.valid("param");

			const job = await jobService.publishJob(id);

			if (!job) {
				throw new HTTPException(404, { message: "Job not found" });
			}

			const response: SuccessResponse<Job> = {
				success: true,
				data: job,
			};

			return c.json(response);
		},
	)

	/**
	 * POST /api/v2/jobs/:id/close
	 * Close a job (change status to closed)
	 */
	.post(
		"/:id/close",
		zValidator(
			"param",
			z.object({
				id: z.string(),
			}),
		),
		async (c) => {
			const { id } = c.req.valid("param");

			const job = await jobService.closeJob(id);

			if (!job) {
				throw new HTTPException(404, { message: "Job not found" });
			}

			const response: SuccessResponse<Job> = {
				success: true,
				data: job,
			};

			return c.json(response);
		},
	)

	/**
	 * POST /api/v2/jobs/:id/apply
	 * Apply to a job
	 */
	.post(
		"/:id/apply",
		zValidator(
			"param",
			z.object({
				id: z.string(),
			}),
		),
		zValidator(
			"json",
			z.object({
				applicantName: z.string().min(2, "Name must be at least 2 characters"),
				applicantEmail: z.string().email("Invalid email address"),
				applicantPhone: z.string().optional(),
				coverLetter: z.string().optional(),
				resumeUrl: z.string().url("Invalid resume URL").optional(),
			}),
		),
		async (c) => {
			const { id } = c.req.valid("param");
			const applicationData = c.req.valid("json");

			// Check if job exists
			const job = await jobService.getJobById(id);

			if (!job) {
				throw new HTTPException(404, { message: "Job not found" });
			}

			// Check if job is published
			if (job.status !== "published") {
				throw new HTTPException(400, {
					message: "This job is not accepting applications",
				});
			}

			// TODO: Save application to database
			// For now, just return success response
			const application = {
				id: crypto.randomUUID(),
				jobId: id,
				...applicationData,
				appliedAt: new Date().toISOString(),
				status: "pending",
			};

			return c.json(
				{
					success: true,
					data: application,
					message: "Application submitted successfully",
				},
				201,
			);
		},
	);

export default app;
