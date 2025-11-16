import { Footerdemo } from "@/components/footer";
import { MainNavbar } from "@/components/main-navbar";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<MainNavbar />
			{children}
			<Footerdemo />
		</>
	);
}
