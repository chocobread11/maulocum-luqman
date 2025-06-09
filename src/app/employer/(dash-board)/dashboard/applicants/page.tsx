import { DataTable } from "@/components/data-table";
import React from "react";
import { ApplicantsTable } from "./_components/applicants-table";
function Applicants() {
	// Mock data for applicants
	const mockApplicants = [
		{
			id: 1,
			drName: "Dr. Sarah Wong",
			apcLicenseId: "APC12345",
			status: "Verified",
			jobPending: 3,
		},
		{
			id: 2,
			drName: "Dr. Ahmad Rahman",
			apcLicenseId: "APC67890",
			status: "Verified",
			jobPending: 1,
		},
		{
			id: 3,
			drName: "Dr. Michael Tan",
			apcLicenseId: "APC24680",
			status: "Verified",
			jobPending: 0,
		},
		{
			id: 4,
			drName: "Dr. Lisa Chen",
			apcLicenseId: "APC13579",
			status: "Verified",
			jobPending: 2,
		},
		{
			id: 5,
			drName: "Dr. Raj Patel",
			apcLicenseId: "APC54321",
			status: "Verified",
			jobPending: 4,
		},
		{
			id: 6,
			drName: "Dr. Mei Lin",
			apcLicenseId: "APC98765",
			status: "Verified",
			jobPending: 2,
		},
		{
			id: 7,
			drName: "Dr. James Wilson",
			apcLicenseId: "APC11223",
			status: "Verified",
			jobPending: 1,
		},
		{
			id: 8,
			drName: "Dr. Nurul Hassan",
			apcLicenseId: "APC44556",
			status: "Verified",
			jobPending: 0,
		},
		{
			id: 9,
			drName: "Dr. Siti Aminah",
			apcLicenseId: "APC78901",
			status: "Verified",
			jobPending: 5,
		},
		{
			id: 10,
			drName: "Dr. David Lee",
			apcLicenseId: "APC36925",
			status: "Verified",
			jobPending: 2,
		},
	];

	return (
		<div className="mx-auto px-6 w-full">
			<h1 className="mb-6 text-2xl font-bold">Applicants Management</h1>
			<ApplicantsTable data={mockApplicants} />
		</div>
	);
}

export default Applicants;
