"use client";

import { FileText, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function ApplyJobDialog({
	trigger,
	jobTitle = "This Position",
}: {
	trigger?: React.ReactNode;
	jobTitle?: string;
}) {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			setOpen(false);
			// Reset form here if needed
		}, 1000);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger || <Button>Apply Now</Button>}
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Apply for {jobTitle}</DialogTitle>
					<DialogDescription>
						Add any additional information that might help your application.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="cover-note">Additional Notes (Optional)</Label>
						<Textarea
							id="cover-note"
							placeholder="Share any relevant experience or availability information..."
							className="min-h-[100px]"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="document">Upload Document (Optional)</Label>
						<div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
							<input
								id="document"
								type="file"
								className="hidden"
								onChange={handleFileChange}
								accept=".pdf,.doc,.docx"
							/>
							<Label
								htmlFor="document"
								className="cursor-pointer w-full h-full flex flex-col items-center gap-2"
							>
								<Upload className="h-8 w-8 text-muted-foreground" />
								<span className="text-sm font-medium">
									{file ? file.name : "Click to upload or drag and drop"}
								</span>
								<span className="text-xs text-muted-foreground">
									PDF, DOC, DOCX (Max 5MB)
								</span>
							</Label>
						</div>
						{file && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<FileText className="h-4 w-4" />
								<span className="truncate">{file.name}</span>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => setFile(null)}
								>
									Remove
								</Button>
							</div>
						)}
					</div>

					<DialogFooter className="pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Applying..." : "Apply Now"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default ApplyJobDialog;
