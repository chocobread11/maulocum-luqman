"use client";

import type * as React from "react";
import {
	IconCamera,
	IconChartBar,
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconFileDescription,
	IconFileWord,
	IconFolder,
	IconHelp,
	IconInnerShadowTop,
	IconListDetails,
	IconReport,
	IconSearch,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react";

import { NavJobs } from "@/components/nav-jobs";
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
		name: "Klinik One Medic",
		email: "klinik@onemedic.com",
		avatar: "https://source.unsplash.com/random/400x400/?logo,medical,clinic",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/employer/dashboard",
			icon: IconDashboard,
		},
		{
			title: "Applicants",
			url: "/employer/dashboard/applicants",
			icon: IconUsers,
		},
		// {
		// 	title: "Analytics",
		// 	url: "/employer/analytics",
		// 	icon: IconChartBar,
		// },
	],
	navClouds: [
		{
			title: "Recruitment",
			icon: IconCamera,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Listings",
					url: "/employer/listings/active",
				},
				{
					title: "Drafts",
					url: "/employer/listings/drafts",
				},
				{
					title: "Expired",
					url: "/employer/listings/expired",
				},
			],
		},
		{
			title: "Doctors",
			icon: IconFileDescription,
			url: "#",
			items: [
				{
					title: "Talent Pool",
					url: "/employer/doctors/pool",
				},
				{
					title: "Favorites",
					url: "/employer/doctors/favorites",
				},
				{
					title: "Previous Hires",
					url: "/employer/doctors/previous",
				},
			],
		},
		{
			title: "Contracts",
			icon: IconFileAi,
			url: "#",
			items: [
				{
					title: "Active Contracts",
					url: "/employer/contracts/active",
				},
				{
					title: "Pending Approval",
					url: "/employer/contracts/pending",
				},
				{
					title: "Completed",
					url: "/employer/contracts/completed",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Clinic Profile",
			url: "/employer/profile",
			icon: IconSettings,
		},
		{
			title: "Support",
			url: "#",
			icon: IconHelp,
		},
		{
			title: "Search Doctors",
			url: "/employer/doctors",
			icon: IconSearch,
		},
	],
	documents: [
		{
			name: "Posting",
			url: "/employer/dashboard/job-post",
			icon: IconReport,
		},
		{
			name: "History",
			url: "/employer/dashboard/jobs",
			icon: IconDatabase,
		},
		// {
		// 	name: "Job Description Templates",
		// 	url: "/employer/templates",
		// 	icon: IconFileWord,
		// },
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
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="/employer">
								<IconInnerShadowTop className="!size-5" />
								<span className="text-base font-semibold">MauLocum</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavJobs items={data.documents} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
