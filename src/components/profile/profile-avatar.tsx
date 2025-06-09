"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Bookmark,
	Cog,
	LogOut,
	Stethoscope,
	User,
	type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileAvatarProps {
	imageSrc?: string;
	fallback: string;
	className?: string;
}

interface ProfileLinkItem {
	href: string;
	label: string;
	icon: LucideIcon;
	isDestructive?: boolean;
	onClickAction?: () => void;
}

export function ProfileAvatar({
	imageSrc,
	fallback,
	className,
}: ProfileAvatarProps) {
	const [open, setOpen] = React.useState(false);
	const pathname = usePathname();

	const profileLinks: ProfileLinkItem[] = [
		{ href: "/profile/bookmarks", label: "Bookmarks", icon: Bookmark },
		{
			href: "/profile/history",
			label: "History",
			icon: Stethoscope,
		},
		{ href: "/profile", label: "Profile", icon: User },
		// { href: "/profile/settings", label: "Settings", icon: Cog },
		{
			href: "#",
			label: "Logout",
			icon: LogOut,
			isDestructive: true,
			onClickAction: () => {
				Cookies.remove("user");
				window.location.reload();
			},
		},
	];

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					className="p-0 h-auto rounded-full focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2"
				>
					<Avatar className={cn("cursor-pointer", className)}>
						{imageSrc && <AvatarImage src={imageSrc} alt="Profile" />}
						<AvatarFallback>{fallback}</AvatarFallback>
					</Avatar>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-44 p-2" align="end">
				<div className="flex flex-col gap-1">
					{profileLinks.map((link) => {
						const isActive = pathname === link.href;
						let itemVariant: "ghost" | "secondary" = "ghost";

						if (isActive && !link.isDestructive && link.href !== "#") {
							itemVariant = "secondary";
						}

						return (
							<Link
								key={link.href + link.label}
								href={link.href}
								className={cn(
									"flex w-full items-center gap-2 p-2 rounded-md transition-colors",
									buttonVariants({
										variant: itemVariant,
										size: "sm",
										className: "justify-start w-full",
									}),

									link.isDestructive &&
										"text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:bg-destructive/10 focus-visible:text-destructive-foreground",
								)}
								onClick={() => {
									if (link.onClickAction) {
										link.onClickAction();
									}
									setOpen(false); // Close popover on any link click
								}}
							>
								<link.icon className="mr-2 h-4 w-4" />
								<span>{link.label}</span>
							</Link>
						);
					})}
				</div>
			</PopoverContent>
		</Popover>
	);
}
