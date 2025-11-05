"use client";

import { IconSearch } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";

export function DoctorsSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const [searchValue, setSearchValue] = useState(
		searchParams.get("search") || "",
	);
	const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);

	const handleSearch = (term: string) => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		debounceTimer.current = setTimeout(() => {
			const params = new URLSearchParams(searchParams);

			if (term) {
				params.set("search", term);
			} else {
				params.delete("search");
			}

			startTransition(() => {
				router.push(`?${params.toString()}`);
			});
		}, 300);
	};

	useEffect(() => {
		return () => {
			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}
		};
	}, []);

	return (
		<div className="relative max-w-md">
			<IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
			<Input
				placeholder="Search by name, email, or APC number..."
				value={searchValue}
				onChange={(e) => {
					setSearchValue(e.target.value);
					handleSearch(e.target.value);
				}}
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
