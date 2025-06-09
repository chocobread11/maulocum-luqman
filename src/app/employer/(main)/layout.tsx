import { NavbarEmployer } from "@/app/employer/_components/navbar";

export default function MainEmployerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<NavbarEmployer />
			{children}
		</>
	);
}
