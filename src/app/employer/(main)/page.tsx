import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { FileText, Search, Building, Users } from "lucide-react";

function EmployerPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-primary/90 py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
							Find the Perfect Healthcare Professionals for Your Facility
						</h1>
						<p className="text-xl text-blue-100 mb-8">
							MauLocum connects healthcare facilities with qualified locum
							professionals across Malaysia
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary">
								Learn More
							</Button>
							<Link href="/employer/register">
								<Button size="lg" variant="default">
									Register
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 bg-white">
				<div className="container mx-auto">
					<h2 className="text-3xl font-bold text-center mb-16">
						How MauLocum Works for Employers
					</h2>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="bg-blue-50 p-6 rounded-xl">
							<FileText className="h-12 w-12  mb-4" />
							<h3 className="text-xl font-semibold mb-2">Post Job Listings</h3>
							<p className="text-gray-600">
								Create detailed job postings to attract qualified healthcare
								professionals.
							</p>
						</div>

						<div className="bg-blue-50 p-6 rounded-xl">
							<Search className="h-12 w-12  mb-4" />
							<h3 className="text-xl font-semibold mb-2">Search Talent</h3>
							<p className="text-gray-600">
								Browse our database of verified healthcare professionals.
							</p>
						</div>

						<div className="bg-blue-50 p-6 rounded-xl">
							<Building className="h-12 w-12  mb-4" />
							<h3 className="text-xl font-semibold mb-2">Employer Branding</h3>
							<p className="text-gray-600">
								Showcase your facility to attract the best talent in the
								industry.
							</p>
						</div>

						<div className="bg-blue-50 p-6 rounded-xl">
							<Users className="h-12 w-12  mb-4" />
							<h3 className="text-xl font-semibold mb-2">Staffing Solutions</h3>
							<p className="text-gray-600">
								Get personalized assistance finding the right professionals.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto text-center">
					<h2 className="text-3xl font-bold mb-4">
						Ready to find your next healthcare professional?
					</h2>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Join hundreds of healthcare facilities across Malaysia using
						MauLocum to find qualified professionals.
					</p>
					<Link href="/employer/post-job">
						<Button size="lg">Get Started Today</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}

export default EmployerPage;
