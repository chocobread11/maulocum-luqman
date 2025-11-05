import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if user is trying to access login or register page
	if (pathname === "/login" || pathname === "/register") {
		try {
			// Check if user has an active session using Better Auth
			const session = await auth.api.getSession({
				headers: request.headers,
			});

			// If user is authenticated, redirect them away from login/register
			if (session) {
				// Get the referrer (previous page) from headers
				const referer = request.headers.get("referer");

				// If there's a valid referrer and it's from the same domain
				if (referer) {
					try {
						const refererUrl = new URL(referer);
						const isSameDomain =
							refererUrl.hostname === request.nextUrl.hostname;

						// Don't redirect back to auth pages
						const isAuthPage =
							refererUrl.pathname === "/login" ||
							refererUrl.pathname === "/register" ||
							refererUrl.pathname.startsWith("/api/v2/auth") ||
							refererUrl.pathname.startsWith("/api/auth");

						if (isSameDomain && !isAuthPage) {
							return NextResponse.redirect(refererUrl);
						}
					} catch (error) {
						console.error("Middleware referer check error:", error);
						// Invalid referer URL, continue to default redirect
					}
				}

				// Default redirect to jobs page if no valid referrer
				const url = request.nextUrl.clone();
				url.pathname = "/jobs";
				return NextResponse.redirect(url);
			}
		} catch (error) {
			// If session check fails, allow access to login page
			console.error("Middleware session check error:", error);
		}
	}

	return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
	matcher: [
		// Match login page
		"/login",
		// Optionally add register page too
		"/register",
	],
};
