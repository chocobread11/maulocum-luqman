import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { SignUpForm } from "./_components/signup-form";

function RegisterPage() {
	return (
		<>
			<CardHeader>
				<CardTitle className="text-lg tracking-tight">
					Create an account
				</CardTitle>
				<CardDescription>
					Enter your email and password to create an account. <br />
					Already have an account?{" "}
					<Link
						href="/login"
						className="hover:text-primary underline underline-offset-4"
					>
						Sign In
					</Link>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<SignUpForm />
			</CardContent>
			<CardFooter>
				<p className="text-muted-foreground px-8 text-center text-sm">
					By creating an account, you agree to our{" "}
					<a
						href="/terms"
						className="hover:text-primary underline underline-offset-4"
					>
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						href="/privacy"
						className="hover:text-primary underline underline-offset-4"
					>
						Privacy Policy
					</a>
					.
				</p>
			</CardFooter>
		</>
	);
}

export default RegisterPage;
