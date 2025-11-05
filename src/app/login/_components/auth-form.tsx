"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGoogle, IconMail } from "@tabler/icons-react";
import { type HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

const formSchema = z.object({
	email: z.email({ message: "Please enter a valid email address" }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [magicLinkSent, setMagicLinkSent] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/jobs",
			});
		} catch (error) {
			console.error("Google sign-in error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	async function onSubmit(data: z.infer<typeof formSchema>) {
		setIsLoading(true);
		try {
			const result = await authClient.signIn.magicLink({
				email: data.email,
				callbackURL: "/jobs",
			});

			if (result.error) {
				console.error("Magic link error:", result.error);
			} else {
				setMagicLinkSent(true);
			}
		} catch (error) {
			console.error("Magic link error:", error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className={cn("space-y-5", className)} {...props}>
			{/* Google Sign-In */}
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				onClick={handleGoogleSignIn}
				className="w-full h-11 text-sm font-medium"
			>
				<IconBrandGoogle className="mr-2 h-5 w-5" />
				Continue with Google
			</Button>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-card text-muted-foreground px-3">
						Or continue with email
					</span>
				</div>
			</div>

			{/* Magic Link Form */}
			{magicLinkSent ? (
				<div className="rounded-lg border border-green-200 bg-green-50 p-5 text-center dark:border-green-800 dark:bg-green-950">
					<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
						<IconMail className="h-6 w-6 text-green-600 dark:text-green-400" />
					</div>
					<h3 className="text-base font-semibold text-green-900 dark:text-green-100">
						Check your email
					</h3>
					<p className="mt-2 text-sm text-green-700 dark:text-green-300">
						We've sent a magic link to your email address. Click the link to
						sign in.
					</p>
					<Button
						variant="ghost"
						size="sm"
						className="mt-4 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
						onClick={() => setMagicLinkSent(false)}
					>
						Use a different email
					</Button>
				</div>
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="email"
											placeholder="you@example.com"
											className="h-11"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							disabled={isLoading}
							className="w-full h-11 text-sm font-medium"
						>
							{isLoading ? (
								<>
									<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
									Sending...
								</>
							) : (
								<>
									<IconMail className="mr-2 h-4 w-4" />
									Send Magic Link
								</>
							)}
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
}
