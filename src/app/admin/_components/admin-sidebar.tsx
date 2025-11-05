"use client";

import {
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconFileDescription,
	IconFileWord,
	IconHelp,
	IconInnerShadowTop,
	IconReport,
	IconSearch,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "Admin Panel",
		email: "admin@maulocum.com",
		avatar: "https://source.unsplash.com/random/400x400/?admin,medical",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/admin/dashboard",
			icon: IconDashboard,
		},
		{
			title: "Users",
			url: "/admin/dashboard/users",
			icon: IconUsers,
		},
		{
			title: "Doctors",
			url: "/admin/dashboard/doctors",
			icon: IconFileDescription,
		},
		{
			title: "Facilities",
			url: "/admin/dashboard/facilities",
			icon: IconDatabase,
		},
	],
	navClouds: [
		{
			title: "Verification",
			icon: IconFileAi,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Doctor Verifications",
					url: "/admin/dashboard/verification/doctors",
				},
				{
					title: "Facility Verifications",
					url: "/admin/dashboard/verification/facilities",
				},
				{
					title: "Rejected Applications",
					url: "/admin/dashboard/verification/rejected",
				},
			],
		},
		{
			title: "Content",
			icon: IconFileDescription,
			url: "#",
			items: [
				{
					title: "Job Listings",
					url: "/admin/dashboard/content/jobs",
				},
				{
					title: "Contracts",
					url: "/admin/dashboard/content/contracts",
				},
				{
					title: "Reviews",
					url: "/admin/content/reviews",
				},
			],
		},
		{
			title: "Reports",
			icon: IconReport,
			url: "#",
			items: [
				{
					title: "User Activity",
					url: "/admin/reports/activity",
				},
				{
					title: "System Logs",
					url: "/admin/reports/logs",
				},
				{
					title: "Analytics",
					url: "/admin/reports/analytics",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "/admin/settings",
			icon: IconSettings,
		},
		{
			title: "Support Tickets",
			url: "/admin/support",
			icon: IconHelp,
		},
		{
			title: "Global Search",
			url: "/admin/search",
			icon: IconSearch,
		},
	],
	documents: [
		{
			name: "User Database",
			url: "/admin/database/users",
			icon: IconDatabase,
		},
		{
			name: "Audit Reports",
			url: "/admin/reports/audit",
			icon: IconReport,
		},
		{
			name: "System Templates",
			url: "/admin/templates",
			icon: IconFileWord,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:p-1.5!"
						>
							<a href="/employer">
								<IconInnerShadowTop className="size-5!" />
								<span className="text-base font-semibold">MauLocum</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavDocuments items={data.documents} /> */}
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
