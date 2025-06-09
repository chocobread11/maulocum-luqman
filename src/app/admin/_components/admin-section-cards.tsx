import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
	return (
		<div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
			<Card className="@container/card">
				<CardHeader className="relative">
					<CardDescription>Verified Doctors</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						1,250
					</CardTitle>
					<div className="absolute right-4 top-4">
						<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
							<TrendingUpIcon className="size-3" />
							+15.3%
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Increasing verification rate <TrendingUpIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">
						250 new doctors verified this month
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader className="relative">
					<CardDescription>Verified Facilities</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						568
					</CardTitle>
					<div className="absolute right-4 top-4">
						<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
							<TrendingUpIcon className="size-3" />
							+8.2%
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Steady growth in clinics <TrendingUpIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">
						42 new facilities added this month
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader className="relative">
					<CardDescription>Active Accounts</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						45,678
					</CardTitle>
					<div className="absolute right-4 top-4">
						<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
							<TrendingUpIcon className="size-3" />
							+12.5%
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Strong user retention <TrendingUpIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">Engagement exceed targets</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader className="relative">
					<CardDescription>Available Specialists</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						834
					</CardTitle>
					<div className="absolute right-4 top-4">
						<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
							<TrendingDownIcon className="size-3" />
							-3.2%
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Slight decrease this month <TrendingDownIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Seasonal availability trend
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
