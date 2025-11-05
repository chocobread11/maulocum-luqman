import {
	ArrowLeft,
	Calendar,
	CheckCircle,
	MapPin,
	MessageSquare,
	Star,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DOCTORS } from "@/lib/constant";

// Mock reviews data
const DOCTOR_REVIEWS = {
	1: [
		{
			id: 101,
			clinicName: "Clinic Anonymous",
			rating: 5,
			comment:
				"Excellent bedside manner and very thorough with diagnoses. Highly recommended!",
			date: "May 15, 2025",
		},
		{
			id: 102,
			clinicName: "Clinic Anonymous",
			rating: 4,
			comment:
				"Very professional and knowledgeable. Patients love her approach.",
			date: "April 22, 2025",
		},
		{
			id: 103,
			clinicName: "Clinic Anonymous",
			rating: 5,
			comment:
				"Punctual and efficient. Great communication with staff and patients.",
			date: "March 10, 2025",
		},
	],
	2: [
		{
			id: 201,
			clinicName: "Clinic Anonymous",
			rating: 5,
			comment: "Excellent with children. Very patient and thorough.",
			date: "May 20, 2025",
		},
		{
			id: 202,
			clinicName: "Clinic Anonymous",
			rating: 4,
			comment:
				"Great pediatrician. Kids feel comfortable with him immediately.",
			date: "April 5, 2025",
		},
		{
			id: 203,
			clinicName: "Clinic Anonymous",
			rating: 4,
			comment: "Very knowledgeable and explains things clearly to parents.",
			date: "March 18, 2025",
		},
	],
	3: [
		{
			id: 301,
			clinicName: "Clinic Anonymous",
			rating: 5,
			comment:
				"Excellent under pressure. Handles emergency situations with calm efficiency.",
			date: "May 12, 2025",
		},
		{
			id: 302,
			clinicName: "Clinic Anonymous",
			rating: 5,
			comment:
				"Incredible diagnostic skills. Saved multiple critical patients.",
			date: "April 30, 2025",
		},
		{
			id: 303,
			clinicName: "Clinic Anonymous",
			rating: 5,
			comment:
				"Outstanding emergency physician. Works well with the entire team.",
			date: "April 2, 2025",
		},
	],
	4: [
		{
			id: 401,
			clinicName: "Clinic Anonymous",
			rating: 4,
			comment: "Very thorough cardiologist. Takes time with each patient.",
			date: "May 25, 2025",
		},
		{
			id: 402,
			clinicName: "Clinic Anonymous",
			rating: 4,
			comment: "Excellent diagnostic skills. Explains conditions clearly.",
			date: "April 15, 2025",
		},
		{
			id: 403,
			clinicName: "Clinic Anonymous",
			rating: 5,
			comment: "Great follow-up care. Very attentive to patient concerns.",
			date: "March 22, 2025",
		},
	],
};

interface DoctorPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function DoctorDetailsPage({ params }: DoctorPageProps) {
	// Parse the ID parameter
	const doctorId = Number.parseInt((await params).id, 10);

	// Find the doctor by ID
	const doctor = DOCTORS.find((doc) => doc.id === doctorId);

	// If doctor not found, show 404 page
	if (!doctor) {
		notFound();
	}

	// Get reviews for this doctor
	const reviews = DOCTOR_REVIEWS[doctorId as keyof typeof DOCTOR_REVIEWS] || [];

	// Generate rating distribution
	const ratingDistribution = {
		5: reviews.filter((r) => r.rating === 5).length,
		4: reviews.filter((r) => r.rating === 4).length,
		3: reviews.filter((r) => r.rating === 3).length,
		2: reviews.filter((r) => r.rating === 2).length,
		1: reviews.filter((r) => r.rating === 1).length,
	};

	// Calculate total reviews
	const totalReviews = reviews.length;

	return (
		<div className="container mx-auto py-8">
			<div className="mb-6">
				<Button variant="ghost" asChild className="mb-4">
					<Link href="/employer/doctors">
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to Doctors
					</Link>
				</Button>
				<h1 className="text-3xl font-bold">Doctor Profile</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left Column - Doctor Info */}
				<div className="col-span-1">
					<Card>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center text-center">
								<Avatar className="h-32 w-32 mb-4">
									<AvatarImage src={doctor.image} alt={doctor.name} />
									<AvatarFallback>
										{doctor.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>

								<h2 className="text-2xl font-bold mb-1">{doctor.name}</h2>

								<div className="flex items-center gap-2 mb-2">
									<Badge variant="secondary" className="text-sm">
										{doctor.specialty}
									</Badge>
									<Badge
										variant="outline"
										className="bg-green-50 text-green-700 flex items-center gap-1 border-green-200"
									>
										<CheckCircle className="h-3 w-3" /> Verified
									</Badge>
								</div>

								<div className="flex items-center text-amber-500 mb-2">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`h-5 w-5 ${i < Math.round(doctor.rating) ? "fill-current" : "fill-none"}`}
										/>
									))}
									<span className="ml-2 text-gray-700 font-medium">
										{doctor.rating.toFixed(1)}
									</span>
								</div>

								<div className="flex flex-col gap-3 w-full mt-4">
									<div className="flex items-center text-gray-600">
										<MapPin className="h-5 w-5 mr-2 text-gray-400" />
										<span>{doctor.location}</span>
									</div>

									<div className="flex items-center text-gray-600">
										<Calendar className="h-5 w-5 mr-2 text-gray-400" />
										<span>Available: {doctor.availability}</span>
									</div>
								</div>

								<div className="mt-6 w-full">
									<Button className="w-full">Contact Doctor</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Column - Reviews */}
				<div className="col-span-1 md:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<MessageSquare className="mr-2 h-5 w-5" /> Reviews
								<span className="ml-2 text-sm font-normal text-gray-500">
									({totalReviews})
								</span>
							</CardTitle>
							<CardDescription>
								Feedback from clinics where {doctor.name} has worked
							</CardDescription>
						</CardHeader>
						<CardContent>
							{/* Rating Distribution */}
							<div className="mb-6 p-4 bg-gray-50 rounded-lg">
								<h3 className="text-lg font-medium mb-3">
									Rating Distribution
								</h3>
								<div className="space-y-2">
									{[5, 4, 3, 2, 1].map((rating) => (
										<div key={rating} className="flex items-center">
											<div className="flex items-center w-16">
												<span className="text-sm font-medium mr-2">
													{rating}
												</span>
												<Star className="h-4 w-4 fill-amber-400 text-amber-400" />
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
												<div
													className="bg-amber-400 h-2.5 rounded-full"
													style={{
														width: `${totalReviews ? (ratingDistribution[rating as keyof typeof ratingDistribution] / totalReviews) * 100 : 0}%`,
													}}
												/>
											</div>
											<span className="text-sm text-gray-500 w-8">
												{
													ratingDistribution[
														rating as keyof typeof ratingDistribution
													]
												}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Reviews List */}
							<div className="space-y-4">
								{reviews.map((review) => (
									<div
										key={review.id}
										className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
									>
										<div className="flex justify-between items-start mb-2">
											<div>
												<h4 className="font-medium">{review.clinicName}</h4>
												<p className="text-sm text-gray-500">{review.date}</p>
											</div>
											<div className="flex text-amber-500">
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className={`h-4 w-4 ${i < review.rating ? "fill-current" : "fill-none"}`}
													/>
												))}
											</div>
										</div>
										<p className="text-gray-700">"{review.comment}"</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
