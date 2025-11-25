"use client";

import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { useDoctorVerifications } from "@/lib/hooks/useAdminDoctors";
import { DoctorsSearch } from "./doctors-search";
import { DoctorsTable } from "./doctors-table";

export function DoctorsContent() {
	const [search] = useQueryState("search");
	const [debouncedSearch] = useDebounce(search, 1000);

	const { data, isLoading, error } = useDoctorVerifications({
		search: debouncedSearch || undefined,
	});

	const verifications = data?.data?.verifications || [];
	const total = data?.data?.total || 0;

	return (
		<div className="px-6 w-full mx-auto">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold">Doctor Verifications</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Total: {total} verification{total !== 1 ? "s" : ""}
					</p>
				</div>
			</div>

			<div className="mb-4">
				<DoctorsSearch />
			</div>

			{isLoading ? (
				<div className="rounded-md border p-8 text-center">
					<div className="flex items-center justify-center gap-2">
						<div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
						<p className="text-muted-foreground">Loading verifications...</p>
					</div>
				</div>
			) : error ? (
				<div className="rounded-md border border-destructive p-8 text-center">
					<p className="text-destructive">
						Error loading verifications: {error.message}
					</p>
				</div>
			) : verifications.length === 0 ? (
				<div className="rounded-md border p-8 text-center">
					<p className="text-muted-foreground">No verifications found.</p>
				</div>
			) : (
				<DoctorsTable data={verifications} />
			)}
		</div>
	);
}
