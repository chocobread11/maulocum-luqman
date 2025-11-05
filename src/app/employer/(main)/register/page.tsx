"use client";

import { CheckCircle, Upload } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function EmployerRegistrationPage() {
	const [facilityEmail, setFacilityEmail] = useState("");
	const [adminEmail, setAdminEmail] = useState("");
	const [facilityLocation, setFacilityLocation] = useState("");
	const [ssmId, setSsmId] = useState("");
	const [ssmDocument, setSsmDocument] = useState<File | null>(null);
	const [clinicLicense, setClinicLicense] = useState<File | null>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
		}, 2000);
	};

	if (isSubmitted) {
		return (
			<div className="container max-w-3xl py-16">
				<Card className="bg-white text-center">
					<CardHeader>
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
							<CheckCircle className="h-8 w-8 text-green-600" />
						</div>
						<CardTitle className="text-2xl">
							Thank You for Your Submission
						</CardTitle>
						<CardDescription className="text-lg">
							We have received your facility verification request
						</CardDescription>
					</CardHeader>
					<CardContent className="pb-8">
						<p className="mb-4">
							Our team will review your credentials and documentation within 3-5
							business days. You will receive an email notification once the
							verification process is complete.
						</p>
						<p>
							If you have any questions, please contact our support team at
							support@medlocum.com
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container max-w-3xl py-8">
			<div className="mb-8 space-y-2">
				<h1 className="text-3xl font-bold">Facility Verification</h1>
				<p className="text-muted-foreground">
					Complete your facility verification to start posting job opportunities
				</p>
			</div>

			<Card className="bg-white">
				<CardHeader>
					<CardTitle>Facility Information</CardTitle>
					<CardDescription>
						Please provide accurate details about your healthcare facility
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-4">
							<div>
								<Label htmlFor="facilityEmail">Facility Email</Label>
								<Input
									id="facilityEmail"
									type="email"
									value={facilityEmail}
									onChange={(e) => setFacilityEmail(e.target.value)}
									placeholder="facility@example.com"
									required
								/>
							</div>

							<div>
								<Label htmlFor="adminEmail">Admin Email (Owner)</Label>
								<Input
									id="adminEmail"
									type="email"
									value={adminEmail}
									onChange={(e) => setAdminEmail(e.target.value)}
									placeholder="admin@example.com"
									required
								/>
								<p className="text-sm text-muted-foreground mt-1">
									This email will be used for administrative access
								</p>
							</div>

							<div>
								<Label htmlFor="facilityLocation">Facility Location</Label>
								<Input
									id="facilityLocation"
									value={facilityLocation}
									onChange={(e) => setFacilityLocation(e.target.value)}
									placeholder="Complete address of your facility"
									required
								/>
							</div>

							<div>
								<Label htmlFor="ssmId">SSM Registration Number</Label>
								<Input
									id="ssmId"
									value={ssmId}
									onChange={(e) => setSsmId(e.target.value)}
									placeholder="Enter SSM registration number"
									required
								/>
							</div>

							<Separator className="my-4" />

							<div>
								<Label htmlFor="ssmDocument">
									Upload SSM Registration Document
								</Label>
								<div className="mt-2">
									<div className="flex items-center justify-center w-full">
										<label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<Upload className="w-8 h-8 mb-2 text-gray-500" />
												<p className="mb-2 text-sm text-gray-500">
													{ssmDocument
														? ssmDocument.name
														: "Click to upload SSM document"}
												</p>
												<p className="text-xs text-gray-500">
													PDF or Image (MAX. 5MB)
												</p>
											</div>
											<input
												id="ssmDocument"
												type="file"
												className="hidden"
												onChange={(e) =>
													e.target.files && setSsmDocument(e.target.files[0])
												}
												required
											/>
										</label>
									</div>
								</div>
							</div>

							<div>
								<Label htmlFor="clinicLicense">
									Upload Clinic/Hospital License (KPJKS)
								</Label>
								<div className="mt-2">
									<div className="flex items-center justify-center w-full">
										<label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<Upload className="w-8 h-8 mb-2 text-gray-500" />
												<p className="mb-2 text-sm text-gray-500">
													{clinicLicense
														? clinicLicense.name
														: "Click to upload KPJKS license"}
												</p>
												<p className="text-xs text-gray-500">
													PDF or Image (MAX. 5MB)
												</p>
											</div>
											<input
												id="clinicLicense"
												type="file"
												className="hidden"
												onChange={(e) =>
													e.target.files && setClinicLicense(e.target.files[0])
												}
												required
											/>
										</label>
									</div>
								</div>
							</div>
						</div>

						<CardFooter className="px-0 pt-6">
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? "Submitting..." : "Submit for Verification"}
							</Button>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default EmployerRegistrationPage;
