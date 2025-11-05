import {
	Clock,
	Edit,
	Globe,
	Mail,
	MapPin,
	Phone,
	Shield,
	User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function EmployerProfilePage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">Clinic Profile</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="col-span-1 md:sticky md:top-20 self-start">
					{/* User Profile Card */}
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex flex-col items-center">
							<Avatar className="h-24 w-24 mb-4">
								<AvatarImage src="https://source.unsplash.com/random/400x400/?portrait,professional" />
								<AvatarFallback>AF</AvatarFallback>
							</Avatar>
							<h2 className="text-xl font-semibold">Luqman Ariffin</h2>
							<div className="flex items-center gap-2 my-2">
								<Badge variant="secondary" className="flex items-center gap-1">
									<Shield className="h-3 w-3" /> Super Admin
								</Badge>
							</div>
							<p className="text-gray-500 mb-2">Clinic Owner</p>

							<div className="w-full mt-2 mb-4 p-3 bg-blue-50 rounded-md text-center">
								<p className="text-sm text-gray-500">Managing</p>
								<p className="font-medium text-blue-800">Klinik One Medic</p>
								<div className="flex justify-center mt-1">
									<div className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs flex items-center">
										<span className="mr-1">✓</span> Verified
									</div>
								</div>
							</div>

							<div className="w-full space-y-3">
								<Button className="w-full">
									<Edit className="mr-2 h-4 w-4" /> Edit Profile
								</Button>
								<Button variant="outline" className="w-full justify-center">
									<User className="mr-2 h-4 w-4" /> User Settings
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className="col-span-1 md:col-span-2">
					<div className="bg-white rounded-lg shadow p-6 mb-6">
						<h3 className="text-xl font-semibold mb-4">Clinic Information</h3>
						<div className="grid grid-cols-1 gap-4 mb-6">
							<div className="flex items-start">
								<MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
								<div>
									<p className="text-sm text-gray-500 mb-1">Location</p>
									<p className="font-medium">
										Block D-12-3, Subang Square, Jalan SS15/4, 47500 Subang
										Jaya, Selangor
									</p>
								</div>
							</div>
							<div className="flex items-start">
								<Phone className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
								<div>
									<p className="text-sm text-gray-500 mb-1">Phone</p>
									<p className="font-medium">+60 3-5612 3456</p>
								</div>
							</div>
							<div className="flex items-start">
								<Mail className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
								<div>
									<p className="text-sm text-gray-500 mb-1">Email</p>
									<p className="font-medium">klinik@onemedic.com</p>
								</div>
							</div>
							<div className="flex items-start">
								<Globe className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
								<div>
									<p className="text-sm text-gray-500 mb-1">Website</p>
									<p className="font-medium">www.klinikonemedic.com</p>
								</div>
							</div>
							<div className="flex items-start">
								<Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
								<div>
									<p className="text-sm text-gray-500 mb-1">Operating Hours</p>
									<p className="font-medium">Mon-Fri: 8:00 AM - 10:00 PM</p>
									<p className="font-medium">Sat-Sun: 9:00 AM - 6:00 PM</p>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6 mb-6">
						<h3 className="text-xl font-semibold mb-4">About Our Clinic</h3>
						<p className="text-gray-700 mb-4">
							Klinik One Medic is a modern primary care facility providing
							comprehensive healthcare services to the Subang Jaya community
							since 2010. Our team of experienced doctors and nurses is
							committed to delivering high-quality, patient-centered care in a
							comfortable and welcoming environment.
						</p>
						<p className="text-gray-700">
							We specialize in family medicine, preventive care, chronic disease
							management, and minor procedures. Our clinic is equipped with
							state-of-the-art facilities including digital X-ray, laboratory
							services, and electronic medical records system.
						</p>
					</div>

					<div className="bg-white rounded-lg shadow p-6 mb-6">
						<h3 className="text-xl font-semibold mb-4">
							Facilities & Services
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							{[
								"General Consultation",
								"Vaccination",
								"Health Screening",
								"Minor Surgery",
								"Laboratory Services",
								"X-Ray",
								"ECG",
								"Ultrasound",
								"Nebulization",
								"Wound Dressing",
							].map((service, index) => (
								<div key={index} className="flex items-center">
									<div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
									<span>{service}</span>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<h3 className="text-xl font-semibold mb-4">Key Staff</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{[
								{
									name: "Dr. Ahmad Razak",
									role: "Medical Director",
									image:
										"https://source.unsplash.com/random/100x100/?doctor,male",
								},
								{
									name: "Dr. Sarah Tan",
									role: "General Practitioner",
									image:
										"https://source.unsplash.com/random/100x100/?doctor,female",
								},
								{
									name: "Ms. Lily Wong",
									role: "Clinic Manager",
									image:
										"https://source.unsplash.com/random/100x100/?manager,female",
								},
								{
									name: "Mr. Jason Lee",
									role: "Administrative Officer",
									image:
										"https://source.unsplash.com/random/100x100/?office,male",
								},
							].map((staff, index) => (
								<div key={index} className="flex items-center">
									<Avatar className="h-12 w-12 mr-4">
										<AvatarImage src={staff.image} />
										<AvatarFallback>
											{staff.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium">{staff.name}</p>
										<p className="text-sm text-gray-500">{staff.role}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmployerProfilePage;
