"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useUploadAPC, useVerifyDoctor } from "@/lib/hooks/useVerification";

const formSchema = z
	.object({
		fullName: z.string().min(1, "Full name is required"),
		phoneNumber: z.string().min(10, "Valid phone number is required"),
		location: z.string().min(1, "Location is required"),
		specialty: z.string().optional(),
		yearsOfExperience: z
			.number()
			.min(0, "Years of experience must be positive"),
		provisionalId: z.string().optional(),
		fullId: z.string().optional(),
		apcNumber: z.string().min(1, "APC number is required"),
		apcDocument: z.instanceof(File).optional(),
	})
	.refine((data) => data.provisionalId || data.fullId, {
		message: "Either Provisional ID or Full ID must be provided",
		path: ["provisionalId"],
	});

type FormData = z.infer<typeof formSchema>;

interface DoctorVerificationFormProps {
	userId: string;
}

export function DoctorVerificationForm({
	userId,
}: DoctorVerificationFormProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const router = useRouter();

	const uploadMutation = useUploadAPC();
	const verifyMutation = useVerifyDoctor();

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			phoneNumber: "",
			location: "",
			specialty: "",
			yearsOfExperience: 0,
			provisionalId: "",
			fullId: "",
			apcNumber: "",
		},
	});

	const handleFileChange = (file: File) => {
		setSelectedFile(file);
		form.setValue("apcDocument", file);
	};

	async function onSubmit(data: FormData) {
		try {
			// Validate file is selected
			if (!selectedFile) {
				toast.error("Please select an APC document");
				return;
			}

			// Upload the file
			toast.loading("Uploading document...");
			const uploadResult = await uploadMutation.mutateAsync({
				file: selectedFile,
				userId,
			});
			const apcDocumentUrl = uploadResult.url;
			toast.dismiss();

			// Submit verification
			toast.loading("Submitting verification...");
			await verifyMutation.mutateAsync({
				userId,
				fullName: data.fullName,
				phoneNumber: data.phoneNumber,
				location: data.location,
				specialty: data.specialty || undefined,
				yearsOfExperience: data.yearsOfExperience,
				provisionalId: data.provisionalId || undefined,
				fullId: data.fullId || undefined,
				apcNumber: data.apcNumber,
				apcDocumentUrl,
			});

			toast.dismiss();
			toast.success("Verification submitted successfully!");
			router.refresh();
		} catch (error) {
			toast.dismiss();
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to submit verification";
			toast.error(errorMessage);
		}
	}

	return (
		<Card className="p-6">
			<div className="mb-6">
				<h2 className="text-2xl font-bold">Complete Your Doctor Profile</h2>
				<p className="text-muted-foreground mt-2">
					Please provide the following information to verify your credentials
					and access full features.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Full Name */}
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name *</FormLabel>
								<FormControl>
									<Input placeholder="Dr. John Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Phone Number */}
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number *</FormLabel>
								<FormControl>
									<Input placeholder="+60 12-345 6789" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Location */}
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Location *</FormLabel>
								<FormControl>
									<Input placeholder="Kuala Lumpur, Malaysia" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Specialty */}
						<FormField
							control={form.control}
							name="specialty"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Specialty (Optional)</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select specialty" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="general">General Practice</SelectItem>
											<SelectItem value="emergency">
												Emergency Medicine
											</SelectItem>
											<SelectItem value="pediatrics">Pediatrics</SelectItem>
											<SelectItem value="surgery">Surgery</SelectItem>
											<SelectItem value="internal">
												Internal Medicine
											</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Years of Experience */}
						<FormField
							control={form.control}
							name="yearsOfExperience"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Years of Experience *</FormLabel>
									<FormControl>
										<Input
											type="number"
											min="0"
											placeholder="5"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Provisional ID */}
						<FormField
							control={form.control}
							name="provisionalId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Provisional Registration ID</FormLabel>
									<FormControl>
										<Input placeholder="PRO-12345" {...field} />
									</FormControl>
									<FormDescription>
										Provide either Provisional or Full ID
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Full ID */}
						<FormField
							control={form.control}
							name="fullId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Registration ID</FormLabel>
									<FormControl>
										<Input placeholder="FULL-12345" {...field} />
									</FormControl>
									<FormDescription>
										Provide either Provisional or Full ID
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* APC Number */}
					<FormField
						control={form.control}
						name="apcNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Annual Practicing Certificate (APC) Number *
								</FormLabel>
								<FormControl>
									<Input placeholder="APC-12345-2024" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* APC Document Upload */}
					<FormField
						control={form.control}
						name="apcDocument"
						render={() => (
							<FormItem>
								<FormLabel>Upload APC Document *</FormLabel>
								<FormControl>
									<div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
										<input
											type="file"
											accept=".pdf,.jpg,.jpeg,.png"
											onChange={(e) => {
												const file = e.target.files?.[0];
												if (file) {
													handleFileChange(file);
												}
											}}
											className="hidden"
											id="apc-upload"
										/>
										<label
											htmlFor="apc-upload"
											className="cursor-pointer flex flex-col items-center gap-2"
										>
											{selectedFile ? (
												<>
													<CheckCircle2 className="h-10 w-10 text-green-600" />
													<p className="text-sm font-medium">
														{selectedFile.name}
													</p>
													<p className="text-xs text-muted-foreground">
														File selected. Click "Submit" to upload.
													</p>
												</>
											) : (
												<>
													<Upload className="h-10 w-10 text-muted-foreground" />
													<p className="text-sm font-medium">
														Click to select APC document
													</p>
													<p className="text-xs text-muted-foreground">
														PDF only (Max 1MB)
													</p>
												</>
											)}
										</label>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex gap-4 pt-4">
						<Button
							type="submit"
							disabled={
								uploadMutation.isPending ||
								verifyMutation.isPending ||
								!selectedFile
							}
							className="flex-1"
						>
							{uploadMutation.isPending || verifyMutation.isPending ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									{uploadMutation.isPending ? "Uploading..." : "Submitting..."}
								</>
							) : (
								"Submit for Verification"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</Card>
	);
}
