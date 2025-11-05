import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "../_components/admin-section-cards";

async function AdminDashboardPage() {
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
