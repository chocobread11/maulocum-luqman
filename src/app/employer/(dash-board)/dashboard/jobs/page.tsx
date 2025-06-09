import React from "react";

function JobsPage() {
	const applicantJobs = [
		{
			id: "job1",
			clinicName: "One Medic",
			dateNeeded: "20 May 2025",
			postedAt: "5 days ago",
			specialist: "General Practice",
			payRate: "RM40/hour",
			workingHours: "9:00 AM - 6:00 PM",
			status: "Open",
		},
		{
			id: "job2",
			clinicName: "One Medic",
			dateNeeded: "11 May 2025",
			postedAt: "3 days ago",
			specialist: "Orthopaedics",
			payRate: "RM45/hour",
			workingHours: "6:00 PM - 10:00 PM",
			status: "Open",
		},
		{
			id: "job3",
			clinicName: "One Medic",
			dateNeeded: "15 May 2025",
			postedAt: "1 day ago",
			specialist: "Paediatrics",
			payRate: "RM50/hour",
			workingHours: "8:00 AM - 5:00 PM",
			status: "Closed",
		},
	];

	return (
		<div className="px-6 w-full">
			<h1 className="text-2xl font-bold mb-6">Your Job Postings</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
				{applicantJobs.map((job) => (
					<a
						key={job.id}
						href={`/employer/jobs/${job.id}`}
						className="block group"
					>
						<div className="bg-card border rounded-lg shadow-sm p-6 h-full transition-all duration-200 hover:shadow-md hover:border-primary">
							<div className="flex justify-between items-start mb-4">
								<h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
									{job.clinicName}
								</h3>
								<div className="flex flex-col items-end gap-1">
									<span className="text-xs bg-muted px-2 py-1 rounded-full">
										Posted {job.postedAt}
									</span>
									<span
										className={`text-xs px-2 py-1 rounded-full ${job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
									>
										{job.status}
									</span>
								</div>
							</div>

							<div className="space-y-3 text-sm text-muted-foreground">
								<div className="flex justify-between">
									<span>Date Needed:</span>
									<span className="font-medium text-foreground">
										{job.dateNeeded}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Specialization:</span>
									<span className="font-medium text-foreground">
										{job.specialist}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Pay Rate:</span>
									<span className="font-medium text-foreground">
										{job.payRate}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Working Hours:</span>
									<span className="font-medium text-foreground">
										{job.workingHours}
									</span>
								</div>
							</div>

							<div className="mt-4 text-xs text-right text-primary opacity-0 group-hover:opacity-100 transition-opacity">
								View details →
							</div>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}

export default JobsPage;
