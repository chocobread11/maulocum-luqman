"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import Cookies from "js-cookie";

const SignIn1 = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState("");

	const validateEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleSignIn = () => {
		if (!email || !password) {
			setError("Please enter both email and password.");
			return;
		}
		if (!validateEmail(email)) {
			setError("Please enter a valid email address.");
			return;
		}
		setError("");

		Cookies.set("user", email);
		window.location.href = "/jobs";
		alert("Sign in successful! (Demo)");
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 relative overflow-hidden w-full">
			{/* Centered glass card */}
			<div className="relative z-10 w-full max-w-sm rounded-3xl bg-secondary backdrop-blur-sm  shadow-2xl p-8 flex flex-col items-center">
				<Link
					href="/"
					className="absolute top-4 left-4 text-white hover:text-gray-200"
				>
					<div className="flex items-center gap-1 rounded-full bg-white/20 p-2">
						<ArrowLeftIcon className="h-5 w-5" />
						<span className="text-sm">Back</span>
					</div>
				</Link>

				{/* Logo */}
				<div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-6 shadow-lg">
					<img alt="logo" src="http://hextaui.com/logo.svg" />
				</div>
				{/* Title */}
				<h2 className="text-2xl font-semibold text-white mb-6 text-center">
					MauLocum
				</h2>
				{/* Form */}
				<form action={handleSignIn} className="flex flex-col w-full gap-4">
					<div className="w-full flex flex-col gap-3 text-primary">
						<input
							placeholder="Email"
							type="email"
							value={email}
							className="w-full px-5 py-3 rounded-xl  bg-white/10 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							placeholder="Password"
							type="password"
							value={password}
							className="w-full px-5 py-3 rounded-xl  bg-white/10 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && (
							<div className="text-sm text-red-400 text-left">{error}</div>
						)}
					</div>
					<hr className="opacity-10" />
					<div>
						<Button
							type="submit"
							className="w-full bg-white/10 font-medium px-5 py-3 rounded-full shadow hover:bg-white/20 transition mb-3  text-sm"
						>
							Sign in
						</Button>
						{/* Google Sign In */}
						<Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#232526] to-[#2d2e30] rounded-full px-5 py-3 font-medium text-white shadow hover:brightness-110 transition mb-2 text-sm">
							<img
								src="https://www.svgrepo.com/show/475656/google-color.svg"
								alt="Google"
								className="w-5 h-5"
							/>
							Continue with Google
						</Button>
						<div className="w-full text-center mt-2">
							<span className="text-xs text-gray-400">
								Don&apos;t have an account?{" "}
								<Link
									href="#"
									className="underline text-white/80 hover:text-white"
								>
									Sign up, it&apos;s free!
								</Link>
							</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export { SignIn1 };
