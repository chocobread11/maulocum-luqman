import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "../../prisma/generated/prisma/client";

const prisma = new PrismaClient();
export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
	basePath: "/api/v2/auth",
	database: prismaAdapter(prisma, {
		provider: "postgresql", // or "mysql", "postgresql", ...etc
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	plugins: [
		magicLink({
			sendMagicLink: async ({ email, token, url }, _request) => {
				// TODO: Implement email sending service (e.g., Resend, SendGrid, etc.)
				console.log("Magic link for", email);
				console.log("URL:", url);
				console.log("Token:", token);

				// For development, log the magic link URL
				// In production, send this via email service
			},
			expiresIn: 300, // 5 minutes
			disableSignUp: false, // Allow new users to sign up via magic link
		}),
	],
});
