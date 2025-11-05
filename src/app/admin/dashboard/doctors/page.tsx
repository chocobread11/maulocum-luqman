"use client";

import { IconDotsVertical } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
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
import { useVerifiedDoctors } from "@/lib/hooks/useAdminDoctors";
import { DoctorsSearch } from "./doctors-search";

function DoctorsPage() {
	const searchParams = useSearchParams();
	const search = searchParams.get("search") || undefined;

	const { data, isLoading, error } = useVerifiedDoctors({ search });

	const doctors = data?.doctors || [];
	const total = data?.total || 0;

	return (
		<div className="px-6 w-full mx-auto">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold">Verified Doctors</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Total: {total} verified doctor{total !== 1 ? "s" : ""}
					</p>
				</div>
			</div>

			<div className="mb-4">
				<DoctorsSearch />
			</div>

			{isLoading ? (
				<div className="rounded-md border p-8 text-center">
					<div className="flex items-center justify-center gap-2">
						<div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
						<p className="text-muted-foreground">Loading doctors...</p>
					</div>
				</div>
			) : error ? (
				<div className="rounded-md border border-destructive p-8 text-center">
					<p className="text-destructive">
						Error loading doctors: {error.message}
					</p>
				</div>
			) : doctors.length === 0 ? (
				<div className="rounded-md border p-8 text-center">
					<p className="text-muted-foreground">
						{search
							? "No doctors found matching your search."
							: "No verified doctors yet."}
					</p>
				</div>
			) : (
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>APC Number</TableHead>
								<TableHead>Specialty</TableHead>
								<TableHead>Experience</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{doctors.map((doctor) => (
								<TableRow key={doctor.id}>
									<TableCell className="font-medium">{doctor.name}</TableCell>
									<TableCell className="text-sm text-muted-foreground">
										{doctor.email}
									</TableCell>
									<TableCell>
										{doctor.doctorVerification?.apcNumber || "N/A"}
									</TableCell>
									<TableCell>
										{doctor.doctorVerification?.specialty || "Not specified"}
									</TableCell>
									<TableCell>
										{doctor.doctorVerification?.yearsOfExperience || 0} years
									</TableCell>
									<TableCell>
										{doctor.doctorVerification?.location ||
											doctor.location ||
											"N/A"}
									</TableCell>
									<TableCell>
										<Badge variant="default">Verified</Badge>
									</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<IconDotsVertical className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>View Profile</DropdownMenuItem>
												<DropdownMenuItem>View APC Document</DropdownMenuItem>
												<DropdownMenuItem className="text-red-600">
													Revoke Verification
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}

export default DoctorsPage;
