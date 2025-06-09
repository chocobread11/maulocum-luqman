import { Card } from "@/components/ui/card";

export default function RegisterLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Card className="gap-4 max-w-xl w-full">{children}</Card>
		</div>
	);
}
