"use client";

import { IconSearch } from "@tabler/icons-react";
import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";

export function DoctorsSearch() {
	const [isPending, startTransition] = useTransition();
	const [, setSearch] = useQueryState("search", {
		startTransition,
	});

	return (
		<div className="relative max-w-md">
			<IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
			<Input
				placeholder="Search by name,email, phone, APC number, provisional ID, or full ID..."
				onChange={(e) => setSearch(e.target.value || null)}
				className="pl-9"
			/>
			{isPending && (
				<div className="absolute right-3 top-1/2 -translate-y-1/2">
					<div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
				</div>
			)}
		</div>
	);
}
