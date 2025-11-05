import Link from "next/link";

const jobDetailsArray = [
	{
		id: "job1",
		clinicName: "HealthFirst Family Clinic",
		description:
			"Weekend coverage needed for busy family clinic in Petaling Jaya with moderate patient flow.",
		responsibilities: [
			"General outpatient consultations",
			"Basic wound care and procedures",
			"Prescription management",
		],
		facilities:
			"Full nursing support team available. Modern clinic with digital X-ray and basic lab services.",
		payment: "RM40/hour with transportation allowance",
		dateNeeded: "20 May 2025",
		workingHours: "9:00 AM - 6:00 PM",
		address:
			"45, Jalan PJU 5/11, Dataran Sunway, 47810 Petaling Jaya, Selangor",
		gmapLink:
			"https://maps.google.com/?q=45,+Jalan+PJU+5/11,+Dataran+Sunway,+47810+Petaling+Jaya,+Selangor",
		urgency: "Medium",
	},
	{
		id: "job2",
		clinicName: "Medilife Center",
		description:
			"Seeking locum doctor for weekday evening shifts at our busy primary care clinic in Subang Jaya.",
		responsibilities: [
			"Manage acute and chronic conditions",
			"Perform basic health screenings",
			"Provide health education",
		],
		facilities:
			"Well-equipped clinic with in-house pharmacy, ECG, and basic laboratory services.",
		payment: "RM45/hour with performance bonus",
		dateNeeded: "11 May 2025",
		workingHours: "6:00 PM - 10:00 PM",
		address:
			"Block D-12-3, Subang Square, Jalan SS15/4, 47500 Subang Jaya, Selangor",
		gmapLink:
			"https://maps.google.com/?q=Block+D-12-3,+Subang+Square,+Jalan+SS15/4,+47500+Subang+Jaya,+Selangor",
		urgency: "High",
	},
];

async function JobDetailPage({
	params,
}: {
	params: Promise<{ jobId: string }>;
}) {
	const paramjobs = await params;
	const jobId = paramjobs.jobId;
	const job = jobDetailsArray.find((job) => job.id === jobId);

	if (!job) {
		return (
			<div className="container min-h-screen justify-center py-10 flex flex-col items-center">
				<h1 className="text-2xl font-bold text-red-500">Job Not Found</h1>
				<p className="text-muted-foreground mt-2">
					The job you're looking for doesn't exist.
				</p>
				<Link
					href="/jobs"
					className="mt-4 p-3 rounded-md bg-primary text-primary-foreground"
				>
					Back to Jobs
				</Link>
			</div>
		);
	}

	return (
		<div className="container py-8">
			<div className="bg-card rounded-lg shadow-md p-6 border">
				<div className="flex justify-between items-start mb-6">
					<h1 className="text-2xl font-bold">{job.clinicName}</h1>
					<span
						className={`px-3 py-1 rounded-full text-sm font-medium 
            ${
							job.urgency === "Critical"
								? "bg-red-100 text-red-800"
								: job.urgency === "High"
									? "bg-orange-100 text-orange-800"
									: job.urgency === "Medium"
										? "bg-yellow-100 text-yellow-800"
										: "bg-green-100 text-green-800"
						}`}
					>
						{job.urgency} Priority
					</span>
				</div>

				<p className="text-muted-foreground mb-6">{job.description}</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<div>
						<h2 className="text-lg font-semibold mb-3">Responsibilities</h2>
						<ul className="list-disc pl-5 space-y-1">
							{job.responsibilities.map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</div>

					<div>
						<h2 className="text-lg font-semibold mb-3">Facility Information</h2>
						<p>{job.facilities}</p>
					</div>
				</div>

				<div className="space-y-4 border-t pt-4">
					<div>
						<h2 className="text-lg font-semibold mb-2">Payment</h2>
						<p>{job.payment}</p>
					</div>

					<div>
						<h2 className="text-lg font-semibold mb-2">Date Needed</h2>
						<p>
							{job.dateNeeded} • {job.workingHours}
						</p>
					</div>

					<div>
						<h2 className="text-lg font-semibold mb-2">Location</h2>
						<p>{job.address}</p>
						<a
							href={job.gmapLink}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline mt-1 inline-block"
						>
							View on Google Maps
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default JobDetailPage;
