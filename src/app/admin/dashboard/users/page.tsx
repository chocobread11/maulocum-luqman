"use client";

import {
	IconDotsVertical,
	IconEdit,
	IconSearch,
	IconStar,
	IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

function UsersPage() {
	const [search, setSearch] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");

	// Mock data - replace with actual API call
	const users = [
		{
			id: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			role: "admin",
			isStaffMember: true,
			facility: "Hospital Pantai",
			status: "active",
		},
		{
			id: 2,
			name: "Jane Smith",
			email: "jane.smith@example.com",
			role: "doctor",
			isStaffMember: true,
			facility: "Sunway Medical Center",
			status: "active",
			rating: 4.5,
		},
		{
			id: 3,
			name: "Robert Johnson",
			email: "robert@example.com",
			role: "user",
			isStaffMember: false,
			facility: null,
			status: "active",
		},
		{
			id: 4,
			name: "Sarah Williams",
			email: "sarah@example.com",
			role: "doctor",
			isStaffMember: false,
			facility: null,
			status: "inactive",
			rating: 3.8,
		},
		{
			id: 5,
			name: "Michael Brown",
			email: "michael@example.com",
			role: "user",
			isStaffMember: true,
			facility: "Klinik One Medic",
			status: "active",
		},
	];

	// Filter users based on search and role filter
	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			search === "" ||
			user.name.toLowerCase().includes(search.toLowerCase()) ||
			user.email.toLowerCase().includes(search.toLowerCase());

		const matchesRole = roleFilter === "all" || user.role === roleFilter;

		return matchesSearch && matchesRole;
	});

	const getRoleBadgeColor = (role: string) => {
		switch (role) {
			case "admin":
				return "bg-red-100 text-red-800";
			case "doctor":
				return "bg-blue-100 text-blue-800";
			case "user":
				return "bg-gray-100 text-gray-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="mx-auto w-full px-6">
			<h1 className="text-2xl font-bold mb-6">User Management</h1>

			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-4 w-full max-w-md">
					<div className="relative w-full">
						<IconSearch
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={18}
						/>
						<Input
							placeholder="Search users..."
							className="pl-10"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>

					<Select value={roleFilter} onValueChange={setRoleFilter}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filter by role" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Roles</SelectItem>
							<SelectItem value="admin">Admin</SelectItem>
							<SelectItem value="doctor">Doctor</SelectItem>
							<SelectItem value="user">User</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Button>Add User</Button>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Facility Staff</TableHead>
							<TableHead>Facility</TableHead>
							<TableHead>Rating</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredUsers.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="font-medium">{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									<Badge className={getRoleBadgeColor(user.role)}>
										{user.role.charAt(0).toUpperCase() + user.role.slice(1)}
									</Badge>
								</TableCell>
								<TableCell>
									{user.isStaffMember ? (
										<Badge
											variant="outline"
											className="bg-green-50 text-green-700 border-green-200"
										>
											Yes
										</Badge>
									) : (
										<Badge
											variant="outline"
											className="bg-gray-50 text-gray-500 border-gray-200"
										>
											No
										</Badge>
									)}
								</TableCell>
								<TableCell>{user.facility || "-"}</TableCell>
								<TableCell>
									{user.role === "doctor" ? (
										<div className="flex items-center">
											<IconStar className="h-4 w-4 text-yellow-400 mr-1" />
											<span>{user.rating}</span>
										</div>
									) : (
										"-"
									)}
								</TableCell>
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<IconDotsVertical className="h-4 w-4" />
												<span className="sr-only">Open menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<IconEdit className="mr-2 h-4 w-4" />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem className="text-red-600">
												<IconTrash className="mr-2 h-4 w-4" />
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

export default UsersPage;
