"use client";

import { Building2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface FacilityCardProps {
	facility: {
		id: string;
		name: string;
		type: "Clinic" | "Hospital" | "Medical Center";
		address: string;
		phone?: string;
		email?: string;
		status: "Active" | "Pending" | "Inactive";
		logoUrl?: string;
	} | null;
}

export function FacilityCard({ facility }: FacilityCardProps) {
	if (!facility) {
		return (
			<Card className="w-full">
				<CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
					<CardTitle className="text-lg sm:text-xl">
						No Linked Facility
					</CardTitle>
					<CardDescription className="text-xs sm:text-sm">
						You are not currently linked to any medical facilities
					</CardDescription>
				</CardHeader>
				<CardContent className="px-4 sm:px-6 py-2 sm:py-4">
					<div className="flex flex-col items-center justify-center py-4 sm:py-6 text-center space-y-3 sm:space-y-4">
						<Building2 className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
						<p className="text-xs sm:text-sm text-muted-foreground max-w-md">
							Link your profile to clinics or hospitals where you work to
							streamline the locum application process. Facilities can verify
							your credentials and work history.
						</p>
					</div>
				</CardContent>
				<CardFooter className="px-4 sm:px-6 py-4 sm:py-6">
					<Button asChild className="w-full h-8 sm:h-9 text-xs sm:text-sm">
						<Link href="/profile/facilities">Browse Facilities</Link>
					</Button>
				</CardFooter>
			</Card>
		);
	}

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-6">
				<div className="h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
					{facility.logoUrl ? (
						<Image
							src={facility.logoUrl}
							alt={facility.name}
							className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
						/>
					) : (
						<Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
					)}
				</div>
				<div className="flex-1 min-w-0">
					<CardTitle className="text-base sm:text-xl truncate">
						{facility.name}
					</CardTitle>
					<div className="flex flex-wrap items-center gap-2 mt-1">
						<Badge
							variant={
								facility.status === "Active"
									? "default"
									: facility.status === "Pending"
										? "secondary"
										: "outline"
							}
							className={
								facility.status === "Active"
									? "bg-green-100 text-green-800 text-xs"
									: facility.status === "Pending"
										? "bg-yellow-100 text-yellow-800 text-xs"
										: "text-xs"
							}
						>
							{facility.status}
						</Badge>
						<span className="text-xs sm:text-sm text-muted-foreground">
							{facility.type}
						</span>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-2 sm:space-y-3 px-4 sm:px-6 py-2 sm:py-4">
				<div className="flex items-start gap-2">
					<MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
					<span className="text-xs sm:text-sm">{facility.address}</span>
				</div>
				{facility.phone && (
					<div className="flex items-center gap-2">
						<Phone className="h-4 w-4 text-muted-foreground shrink-0" />
						<span className="text-xs sm:text-sm">{facility.phone}</span>
					</div>
				)}
				{facility.email && (
					<div className="flex items-center gap-2">
						<Mail className="h-4 w-4 text-muted-foreground shrink-0" />
						<span className="text-xs sm:text-sm break-all">
							{facility.email}
						</span>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4 sm:py-6">
				<Button
					variant="outline"
					size="sm"
					className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
				>
					View Details
				</Button>
				<Button
					size="sm"
					asChild
					className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
				>
					<Link href={`/facilities/${facility.id}`}>
						<ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
						Visit Page
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
