import { Navbar1 } from "@/components/navbar";
import { Footerdemo } from "@/components/footer";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar1 />
			{children}
			<Footerdemo />
		</>
	);
}
