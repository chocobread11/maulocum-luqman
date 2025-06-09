import { useQuery } from "@tanstack/react-query";
import { getSession } from "../session";

export function useSession() {
	const { data: session, isPending } = useQuery({
		queryKey: ["session"],
		queryFn: getSession,
	});
	return { session, isPending };
}
