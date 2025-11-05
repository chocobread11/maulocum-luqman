import { Footerdemo } from "@/components/footer";
import { Navbar1 } from "@/components/navbar";

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
