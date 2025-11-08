"use client";

import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define breadcrumb mappings
const breadcrumbMap: Record<string, string> = {
	admin: "Admin",
	dashboard: "Dashboard",
	doctors: "Doctors",
	facilities: "Facilities",
	verifications: "Verifications",
	users: "Users",
};

export function DynamicBreadcrumb() {
	const pathname = usePathname();

	// Split pathname and filter out empty strings
	const segments = pathname.split("/").filter(Boolean);

	// Generate breadcrumb items
	const breadcrumbItems = segments.map((segment, index) => {
		const href = `/${segments.slice(0, index + 1).join("/")}`;
		const label = breadcrumbMap[segment] || segment;
		const isLast = index === segments.length - 1;

		return {
			href,
			label,
			isLast,
		};
	});

	// Don't show breadcrumb if only one segment or on root
	if (breadcrumbItems.length <= 1) {
		return null;
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbItems.map((item, index) => (
					<div key={item.href} className="contents">
						{index > 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem>
							{item.isLast ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</div>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
