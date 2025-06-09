"use client";
import { type HTMLAttributes, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	IconBrandFacebook,
	IconBrandGithub,
	IconBrandGoogle,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import Link from "next/link";
import Cookies from "js-cookie";

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>;

const formSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Please enter your email" })
		.email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(1, {
			message: "Please enter your password",
		})
		.min(7, {
			message: "Password must be at least 7 characters long",
		}),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "drluqman@gmail.com",
			password: "1234567890",
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		setIsLoading(true);
		// eslint-disable-next-line no-console
		console.log(data);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		Cookies.set("user", data.email);
		window.location.href = "/jobs";
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("grid gap-3", className)}
				{...props}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="name@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="relative">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<PasswordInput placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
							<Link href="/login/forgot-password">Forgot password?</Link>
						</FormItem>
					)}
				/>
				<Button className="mt-2" disabled={isLoading}>
					Login
				</Button>
				<Link href="/register" className="text-xs underline">
					Don't have an account?
				</Link>

				<div className="relative my-2">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background text-muted-foreground px-2">
							Or continue with
						</span>
					</div>
				</div>
				<Button variant="outline" type="button" disabled={isLoading}>
					<IconBrandGoogle className="h-4 w-4" /> Google
				</Button>
			</form>
		</Form>
	);
}
