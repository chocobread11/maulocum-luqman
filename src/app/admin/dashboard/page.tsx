import React from "react";
import { SectionCards } from "../_components/admin-section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

function AdminDashboardPage() {
	return (
		<>
			<SectionCards />
			<div className="px-4 lg:px-6">
				<ChartAreaInteractive />
			</div>
		</>
	);
}

export default AdminDashboardPage;
