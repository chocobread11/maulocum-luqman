"use client";

import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IconDotsVertical, IconSearch, IconFilter } from "@tabler/icons-react";

function DoctorsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");

	// Mock data for doctors
	const doctors = [
		{
			id: 1,
			name: "Dr. Sarah Johnson",
			apcLicenseId: "APC12345",
			status: "active",
			completedLocum: 24,
			rating: 4.8,
			specialty: "General Practice",
		},
		{
			id: 2,
			name: "Dr. Michael Chen",
			apcLicenseId: "APC67890",
			status: "active",
			completedLocum: 18,
			rating: 4.5,
			specialty: "Pediatrics",
		},
		{
			id: 3,
			name: "Dr. Emily Rodriguez",
			apcLicenseId: "APC54321",
			status: "expired",
			completedLocum: 32,
			rating: 4.9,
			specialty: "Emergency Medicine",
		},
		{
			id: 4,
			name: "Dr. James Wilson",
			apcLicenseId: "APC98765",
			status: "pending",
			completedLocum: 0,
			rating: 0,
			specialty: "Cardiology",
		},
		{
			id: 5,
			name: "Dr. Aisha Patel",
			apcLicenseId: "APC24680",
			status: "expired",
			completedLocum: 28,
			rating: 4.7,
			specialty: "Psychiatry",
		},
	];

	// Filter doctors based on search query and status
	const filteredDoctors = doctors.filter((doctor) => {
		const matchesSearch =
			doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			doctor.apcLicenseId.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus =
			filterStatus === "all" || doctor.status === filterStatus;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="px-6 w-full mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Doctors Management</h1>
				<Button>Add New Doctor</Button>
			</div>

			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center space-x-2 w-1/3">
					<Input
						placeholder="Search doctors..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="max-w-sm"
					/>
				</div>
				<div className="flex items-center space-x-2">
					<Select value={filterStatus} onValueChange={setFilterStatus}>
						<SelectTrigger className="w-[180px]">
							<div className="flex items-center">
								<IconFilter className="mr-2 h-4 w-4" />
								<span>
									Status:{" "}
									{filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
								</span>
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="active">Active</SelectItem>
							<SelectItem value="expired">Expired</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>APC License ID</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Completed Locum</TableHead>
							<TableHead>Rating</TableHead>
							<TableHead>Specialty</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredDoctors.map((doctor) => (
							<TableRow key={doctor.id}>
								<TableCell className="font-medium">{doctor.name}</TableCell>
								<TableCell>{doctor.apcLicenseId}</TableCell>
								<TableCell>
									<Badge
										variant={
											doctor.status === "active"
												? "default"
												: doctor.status === "pending"
													? "secondary"
													: "destructive"
										}
									>
										{doctor.status.charAt(0).toUpperCase() +
											doctor.status.slice(1)}
									</Badge>
								</TableCell>
								<TableCell>{doctor.completedLocum}</TableCell>
								<TableCell>{doctor.rating}/5.0</TableCell>
								<TableCell>{doctor.specialty}</TableCell>
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="h-8 w-8 p-0">
												<IconDotsVertical className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>View Profile</DropdownMenuItem>
											<DropdownMenuItem>Edit Details</DropdownMenuItem>
											<DropdownMenuItem className="text-red-600">
												Suspend Account
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

export default DoctorsPage;
