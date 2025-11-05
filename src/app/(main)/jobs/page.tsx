"use client";

import React, { Suspense } from "react";
import { FilterCombobox } from "@/components/filter-combobox";
import JobDetails from "@/components/jobs/job-details";
import JobList from "@/components/jobs/job-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SPECIALIST_OPTIONS, STATE_OPTIONS } from "@/lib/constant";

function JobsPage() {
	const [selectedState, setSelectedState] = React.useState<string>("all");
	const [selectedSpecialist, setSelectedSpecialist] =
		React.useState<string>("all");

	return (
		<div>
			<div className="bg-accent py-10">
				<form
					onSubmit={(e) => e.preventDefault()}
					className="px-3 lg:container"
				>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Input placeholder="Search jobs..." />
						<FilterCombobox
							options={STATE_OPTIONS}
							placeholder="Select State..."
							value={selectedState}
							onValueChange={setSelectedState}
							triggerClassName="w-full sm:w-[250px]"
							contentClassName="w-full p-0 sm:w-[250px]"
						/>
						<FilterCombobox
							options={SPECIALIST_OPTIONS}
							placeholder="Select Specialist..."
							value={selectedSpecialist}
							onValueChange={setSelectedSpecialist}
							triggerClassName="w-full sm:w-[250px]"
							contentClassName="w-full p-0 sm:w-[250px]"
						/>
						<Button type="submit" className="w-full sm:w-auto">
							Search Jobs
						</Button>
					</div>
				</form>
			</div>

			<div className="px-3 lg:container flex flex-col md:flex-row w-full gap-2 py-5">
				{/* Left Side (Scrollable Job Listings) */}
				<Suspense fallback={<div>Loading...</div>}>
					<JobList />
					<JobDetails />
				</Suspense>
				{/* Right Side (Sticky Details Pane) */}
			</div>
		</div>
	);
}

export default JobsPage;
