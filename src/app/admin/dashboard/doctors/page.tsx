import { Suspense } from "react";
import { DoctorsContent } from "./doctors-content";

function DoctorsPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DoctorsContent />
		</Suspense>
	);
}

export default DoctorsPage;
