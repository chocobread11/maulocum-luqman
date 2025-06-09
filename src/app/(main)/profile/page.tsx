import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { FacilityCard } from "@/components/profile/facility-card";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { Check, AlertCircle, Menu } from "lucide-react";

// Mock data - in a real app, this would come from an API or database
const mockFacility = {
	id: "facility-123",
	name: "Klinik Kesihatan Ampang",
	type: "Clinic" as const,
	address: "Jalan Ampang, 50450 Kuala Lumpur, Malaysia",
	phone: "+60 3-4256 7890",
	email: "info@klinikampang.com.my",
	status: "Active" as const,
	logoUrl:
		"https://images.unsplash.com/photo-1748199625281-bde664abf23f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D", // This would be a real logo in production
};

// In a real app, this would be fetched from an API
const getUserFacilities = async (userId: string) => {
	// This is just a mock implementation
	// Return null to test the "no facilities" state
	return mockFacility;

	// Uncomment to test the "no facilities" state
	// return null;
};

export default async function ProfilePage() {
	const sessionCookie = await getSession();
	// In a real app, you would parse the session cookie to get the user ID
	const userId = sessionCookie ? "user-123" : null;
	const userFacility = userId ? await getUserFacilities(userId) : null;

	return (
		<div className="sm:container px-4 mx-auto py-4 sm:py-6 lg:py-8">
			{/* Mobile navigation - visible only on small screens */}
			<div className="md:hidden mb-6 flex items-center justify-between">
				<h1 className="text-2xl sm:text-3xl font-bold">My Profile</h1>
				{/* Mobile menu button is now part of the ProfileSidebar component */}
				<div className="md:hidden">
					<ProfileSidebar />
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-6 lg:gap-8">
				{/* Sidebar - hidden on mobile, shown on desktop */}
				<div className="hidden md:block w-64 shrink-0">
					<div className="sticky top-20">
						<ProfileSidebar />
					</div>
				</div>

				{/* Main content */}
				<div className="flex-1 space-y-6 lg:space-y-8">
					<div className="hidden md:flex items-center justify-between">
						<h1 className="text-3xl font-bold">My Profile</h1>
					</div>

					{/* Profile header card */}
					<Card className="overflow-hidden">
						<div className="bg-gradient-to-r from-primary/20 to-primary/5 h-24 sm:h-32" />
						<div className="p-4 sm:p-6 pt-0 relative">
							<Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-background absolute -top-10 sm:-top-12 left-4 sm:left-6">
								<AvatarImage
									src="/placeholder-avatar.jpg"
									alt="Profile picture"
								/>
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>

							<div className="ml-24 sm:ml-28 pt-1 sm:pt-2 flex flex-col justify-between gap-3 sm:gap-4">
								<div>
									<h2 className="text-xl sm:text-2xl font-semibold">
										John Doe
									</h2>
									<p className="text-sm sm:text-base text-muted-foreground">
										Medical Officer
									</p>
								</div>

								<div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-0">
									<Badge
										variant="outline"
										className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm"
									>
										<Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-500" />
										<span>Verified</span>
									</Badge>

									<Button asChild size="sm" className="h-8 text-xs sm:text-sm">
										<Link href="/profile/edit">Edit Profile</Link>
									</Button>
								</div>
							</div>
						</div>
					</Card>

					{/* Personal Information */}
					<div className="bg-card rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6">
						<h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
							Personal Information
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
							<div>
								<p className="text-xs sm:text-sm text-muted-foreground mb-1">
									Full Name
								</p>
								<p className="font-medium text-sm sm:text-base">John Doe</p>
							</div>
							<div>
								<p className="text-xs sm:text-sm text-muted-foreground mb-1">
									Email
								</p>
								<p className="font-medium text-sm sm:text-base break-all">
									johndoe@example.com
								</p>
							</div>
							<div>
								<p className="text-xs sm:text-sm text-muted-foreground mb-1">
									Phone
								</p>
								<p className="font-medium text-sm sm:text-base">
									+60 12-345 6789
								</p>
							</div>
							<div>
								<p className="text-xs sm:text-sm text-muted-foreground mb-1">
									Location
								</p>
								<p className="font-medium text-sm sm:text-base">
									Kuala Lumpur, Malaysia
								</p>
							</div>
							<div>
								<p className="text-xs sm:text-sm text-muted-foreground mb-1">
									Specialty
								</p>
								<p className="font-medium text-sm sm:text-base">
									Emergency Medicine
								</p>
							</div>
							<div>
								<p className="text-xs sm:text-sm text-muted-foreground mb-1">
									Years of Experience
								</p>
								<p className="font-medium text-sm sm:text-base">5 years</p>
							</div>
						</div>
						<Button
							variant="outline"
							size="sm"
							className="text-xs sm:text-sm h-8 sm:h-9"
						>
							Edit Personal Information
						</Button>
					</div>

					{/* Linked Facility */}
					<div className="bg-card rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6">
						<h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
							Linked Facility
						</h3>
						<FacilityCard facility={userFacility} />
					</div>

					{/* License Information */}
					<div
						id="documents"
						className="bg-card rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6"
					>
						<h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
							License Information
						</h3>

						<div className="mb-4 sm:mb-6">
							<div className="flex justify-between items-center mb-2">
								<span className="font-medium text-sm sm:text-base">
									APC License
								</span>
								<Badge
									variant="outline"
									className="text-green-600 bg-green-50 text-xs sm:text-sm"
								>
									Active
								</Badge>
							</div>
							<div className="bg-muted/50 p-3 sm:p-4 rounded-md">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-2">
									<div>
										<p className="text-xs sm:text-sm text-muted-foreground">
											License Number
										</p>
										<p className="text-sm sm:text-base">APC-12345-2023</p>
									</div>
									<div>
										<p className="text-xs sm:text-sm text-muted-foreground">
											Expiry Date
										</p>
										<div className="flex flex-wrap items-center gap-1.5">
											<p className="text-sm sm:text-base">31 December 2023</p>
											<Badge variant="destructive" className="text-xs">
												Expired
											</Badge>
										</div>
									</div>
								</div>
								<div className="flex flex-wrap items-center gap-2 mt-3">
									<Button
										variant="outline"
										size="sm"
										className="text-xs sm:text-sm h-8 sm:h-9"
									>
										View License
									</Button>
									<Button size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
										Update License
									</Button>
								</div>
							</div>
						</div>

						<div>
							<h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-3">
								Upload Documents
							</h4>
							<div className="border-2 border-dashed border-muted rounded-md p-4 sm:p-6 text-center">
								<p className="text-xs sm:text-sm text-muted-foreground mb-2">
									Drag and drop files here or click to browse
								</p>
								<Button
									variant="outline"
									size="sm"
									className="text-xs sm:text-sm h-8 sm:h-9"
								>
									Browse Files
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
