import { IconDotsVertical } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

function FacilitiesPage() {
	const facilities = [
		{
			id: 1,
			name: "Oriental Hospital",
			totalApplicants: 24,
			rating: 4.5,
			location: "Kuala Lumpur",
			status: "active",
			contactNo: "+60 3-2615 5555",
			owner: "Lim Guan Eng",
		},
		{
			id: 2,
			name: "Penang Medical Centre",
			totalApplicants: 16,
			rating: 4.2,
			location: "Penang",
			status: "active",
			contactNo: "+60 4-222 8888",
			owner: "Dr. Ahmad Razak",
		},
		{
			id: 3,
			name: "Johor Specialist Clinic",
			totalApplicants: 0,
			rating: 0,
			location: "Johor Bahru",
			status: "pending",
			contactNo: "+60 7-223 1234",
			owner: "Dr. Tan Wei Ming",
		},
		{
			id: 4,
			name: "Pantai Hospital",
			totalApplicants: 12,
			rating: 4.0,
			location: "Kuching",
			status: "inactive",
			contactNo: "+60 8-234 5678",
			owner: "Lim Swie King",
		},
		{
			id: 5,
			name: "Ipoh Community Hospital",
			totalApplicants: 5,
			rating: 3.7,
			location: "Ipoh, Perak",
			status: "rejected",
			contactNo: "+60 5-253 7890",
			owner: "Dr. Lim Soo Hock",
		},
	];

	const getStatusColor = (
		status: "active" | "pending" | "rejected" | "inactive",
	) => {
		switch (status) {
			case "active":
				return "text-green-600 bg-green-100";
			case "pending":
				return "text-yellow-600 bg-yellow-100";
			case "rejected":
				return "text-red-600 bg-red-100";
			case "inactive":
				return "text-gray-600 bg-gray-100";
			default:
				return "";
		}
	};

	return (
		<div className="w-full mx-auto px-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Healthcare Facilities</h1>
				<Button>Add New Facility</Button>
			</div>

			<div className="borderbg-white rounded-lg shadow overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Facility Name</TableHead>
							<TableHead>Total Applicants</TableHead>
							<TableHead>Rating</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Approval Status</TableHead>
							<TableHead>Contact No</TableHead>
							<TableHead>Owner</TableHead>
							<TableHead className="w-[80px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{facilities.map((facility) => (
							<TableRow key={facility.id}>
								<TableCell className="font-medium">{facility.name}</TableCell>
								<TableCell>{facility.totalApplicants}</TableCell>
								<TableCell>{facility.rating}/5</TableCell>
								<TableCell>{facility.location}</TableCell>
								<TableCell>
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(facility.status as "active" | "pending" | "rejected" | "inactive")}`}
									>
										{facility.status.charAt(0).toUpperCase() +
											facility.status.slice(1)}
									</span>
								</TableCell>
								<TableCell>{facility.contactNo}</TableCell>
								<TableCell>{facility.owner}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="h-8 w-8 p-0">
												<IconDotsVertical className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>View Details</DropdownMenuItem>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem className="text-red-600">
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export default FacilitiesPage;
