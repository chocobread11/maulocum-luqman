import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Active Job Listings</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						12
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingUp />
							+3
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						3 new listings this month <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">
						9 active from previous month
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Applicant Response Rate</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						68%
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingDown />
							-5%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Down 5% this period <IconTrendingDown className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Job descriptions need improvement
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Locum Doctors Available</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						156
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingUp />
							+12
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Growing talent pool <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">12 new doctors joined</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Fill Rate</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						92%
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingUp />
							+4%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Positions filled successfully <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">Above industry average</div>
				</CardFooter>
			</Card>
		</div>
	);
}
