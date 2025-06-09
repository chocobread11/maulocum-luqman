import "./employer.css";
export default function EmployerRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="facility-theme">{children}</div>;
}
