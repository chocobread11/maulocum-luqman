"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	CalendarIcon,
	Clock,
	MapPin,
	Briefcase,
	FileText,
	DollarSign,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { STATE_OPTIONS, SPECIALIST_OPTIONS } from "@/lib/constant";

function PostJobPage() {
	const [date, setDate] = useState<Date>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			alert("Job posted successfully!");
			setIsSubmitting(false);
		}, 1500);
	};

	return (
		<div className="px-6 mx-auto w-full">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Post a Locum Job</h1>
				<p className="text-gray-600">
					Fill out the form below to post a new locum position at your facility
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-3">
				<div className="bg-card p-6 rounded-lg border shadow-sm space-y-6">
					<h2 className="text-xl font-semibold flex items-center gap-2">
						<Briefcase className="size-5" />
						Job Details
					</h2>

					<div className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="jobTitle">Job Title</Label>
							<Input
								className="border-border"
								id="jobTitle"
								placeholder="e.g. General Practitioner Locum"
								required
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-3">
								<Label htmlFor="specialty">Specialty</Label>
								<Select required>
									<SelectTrigger className="border-border">
										<SelectValue placeholder="Select specialty" />
									</SelectTrigger>
									<SelectContent>
										{SPECIALIST_OPTIONS.map((specialty) => (
											<SelectItem key={specialty.value} value={specialty.value}>
												{specialty.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-3">
								<Label htmlFor="urgency">Urgency Level</Label>
								<Select required>
									<SelectTrigger className="border-border">
										<SelectValue placeholder="Select urgency" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="low">Low</SelectItem>
										<SelectItem value="medium">Medium</SelectItem>
										<SelectItem value="high">High</SelectItem>
										<SelectItem value="critical">Critical</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-3">
							<Label htmlFor="description">Job Description</Label>
							<Textarea
								id="description"
								className="border-border"
								placeholder="Provide a detailed description of the role and requirements"
								rows={4}
								required
							/>
						</div>

						<div className="space-y-3">
							<Label>Responsibilities</Label>
							<Textarea
								className="border-border"
								placeholder="List the key responsibilities (one per line)"
								rows={3}
								required
							/>
							<p className="text-sm text-gray-500 mt-1">
								Enter each responsibility on a new line
							</p>
						</div>

						<div className="space-y-3">
							<Label htmlFor="facilities">Available Facilities</Label>
							<Textarea
								id="facilities"
								className="border-border"
								placeholder="Describe the facilities and equipment available"
								rows={3}
								required
							/>
						</div>
					</div>
				</div>

				<div className="bg-card p-6 rounded-lg border shadow-sm space-y-6">
					<h2 className="text-xl font-semibold flex items-center gap-2">
						<Clock className="size-5" />
						Schedule & Compensation
					</h2>

					<div className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-3">
								<Label>Date Needed</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className={cn(
												"w-full justify-start text-left font-normal border-border",
												!date && "text-muted-foreground",
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{date ? format(date, "PPP") : "Select date"}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<Calendar
											mode="single"
											selected={date}
											onSelect={setDate}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className="space-y-3">
								<Label htmlFor="workingHours">Working Hours</Label>
								<Input
									id="workingHours"
									className="border-border"
									placeholder="e.g. 9:00 AM - 6:00 PM"
									required
								/>
							</div>
						</div>

						<div className="space-y-3">
							<Label htmlFor="payment">Payment Details</Label>
							<div className="flex items-center">
								<div className="relative">
									<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-4" />
									<Input
										id="payment"
										className="pl-10 border-border"
										placeholder="e.g. RM40/hour with transportation allowance"
										required
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-end space-x-4">
					<Button variant="outline" type="button" className="border-border">
						Cancel
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Posting..." : "Post Job"}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default PostJobPage;
