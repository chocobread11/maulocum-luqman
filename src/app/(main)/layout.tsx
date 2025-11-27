import { Footerdemo } from "@/components/footer";
import { MainNavbar } from "@/components/main-navbar";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<MainNavbar />
			<div className="min-h-screen">{children}</div>
			<Footerdemo />
		</main>
	);
}
