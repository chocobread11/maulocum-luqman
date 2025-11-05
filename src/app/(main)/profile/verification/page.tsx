"use client";

import { AlertCircle, CheckCircle, FileText, Upload } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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

function VerificationPage() {
	const [fullName, setFullName] = useState("");
	const [icNumber, setIcNumber] = useState("");
	const [apcNumber, setApcNumber] = useState("");
	const [icDocument, setIcDocument] = useState<File | null>(null);
	const [apcDocument, setApcDocument] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			// Handle submission success
		}, 2000);
	};

	return (
		<div className="container max-w-3xl py-8">
			<div className="mb-8 space-y-2">
				<h1 className="text-3xl font-bold">Verification</h1>
				<p className="text-muted-foreground">
					Complete your profile verification to access all features
				</p>
			</div>

			<Card className="bg-white">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<FileText className="h-5 w-5" />
						Professional Verification
					</CardTitle>
					<CardDescription>
						We need to verify your identity and professional credentials
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-4">
							<div>
								<Label htmlFor="fullName">Full Name (as per IC)</Label>
								<Input
									id="fullName"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									placeholder="Enter your full name"
									required
								/>
							</div>

							<div>
								<Label htmlFor="icNumber">IC Number</Label>
								<Input
									id="icNumber"
									value={icNumber}
									onChange={(e) => setIcNumber(e.target.value)}
									placeholder="e.g. 000000-00-0000"
									required
								/>
							</div>

							<div>
								<Label htmlFor="apcNumber">APC License Number</Label>
								<Input
									id="apcNumber"
									value={apcNumber}
									onChange={(e) => setApcNumber(e.target.value)}
									placeholder="Enter your APC license number"
									required
								/>
							</div>
						</div>

						<Separator />

						<div className="space-y-4">
							<h3 className="font-medium">Document Upload</h3>

							<div className="rounded-lg border border-dashed p-6">
								<div className="flex flex-col items-center gap-2">
									<div className="mb-2 rounded-full bg-primary/10 p-2">
										<Upload className="h-6 w-6 text-primary" />
									</div>
									<h3 className="font-medium">Upload IC Document</h3>
									<p className="text-sm text-muted-foreground text-center">
										Upload a clear scan or photo of your IC (front and back)
									</p>
									<Input
										type="file"
										className="mt-2 w-full max-w-xs"
										onChange={(e) => setIcDocument(e.target.files?.[0] || null)}
										required
									/>
									{icDocument && (
										<Badge variant="outline" className="gap-1 mt-2">
											<CheckCircle className="h-3 w-3" />
											{icDocument.name}
										</Badge>
									)}
								</div>
							</div>

							<div className="rounded-lg border border-dashed p-6">
								<div className="flex flex-col items-center gap-2">
									<div className="mb-2 rounded-full bg-primary/10 p-2">
										<FileText className="h-6 w-6 text-primary" />
									</div>
									<h3 className="font-medium">Upload APC License</h3>
									<p className="text-sm text-muted-foreground text-center">
										Upload a clear scan or photo of your APC license
									</p>
									<Input
										type="file"
										className="mt-2 w-full max-w-xs"
										onChange={(e) =>
											setApcDocument(e.target.files?.[0] || null)
										}
										required
									/>
									{apcDocument && (
										<Badge variant="outline" className="gap-1 mt-2">
											<CheckCircle className="h-3 w-3" />
											{apcDocument.name}
										</Badge>
									)}
								</div>
							</div>
						</div>
					</form>
				</CardContent>

				<CardFooter className="flex justify-between border-t p-6">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<AlertCircle className="h-4 w-4" />
						All information will be verified manually
					</div>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit for Verification"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default VerificationPage;
