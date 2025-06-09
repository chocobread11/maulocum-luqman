"use server";
import { cookies } from "next/headers";

export async function getSession() {
	const cookieStore = await cookies();
	return cookieStore.get("user")?.value || null;
}
