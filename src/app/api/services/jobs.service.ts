import type { Context } from "hono";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "../../../../prisma/generated/prisma/client";
import type {
	CreateJobApplicationInput,
	CreateJobInput,
	JobQuery,
	UpdateJobApplicationInput,
	UpdateJobInput,
} from "../types/jobs.types";

export class JobService {
	async createJob(data: CreateJobInput) {
		return prisma.job.create({
			data,
			include: {
				facility: {
					select: {
						id: true,
						name: true,
						address: true,
					},
				},
			},
		});
	}

	// Get job by ID
	async getJobById(id: string) {
		return prisma.job.findUnique({
			where: { id },
			include: {
				facility: {
					select: {
						id: true,
						name: true,
						address: true,
						contactEmail: true,
						contactPhone: true,
					},
				},
				applicants: {
					include: {
						DoctorProfile: true,
					},
				},
			},
		});
	}

	// Get all jobs with filters and pagination
	async getJobs(
		query: JobQuery,
		c: Context,
	): Promise<
		| {
				jobs: Array<{
					id: string;
					title: string;
					description: string | null;
					location: string;
					payRate: string;
					payBasis: string;
					startTime: string;
					endTime: string;
					startDate: Date;
					endDate: Date;
					jobType: string;
					urgency: string;
					status: string;
					requiredSpecialists: string[];
					documentUrls: string[];
					facilityId: string;
					createdAt: Date;
					updatedAt: Date;
					facility: {
						id: string;
						name: string;
						address: string;
						contactEmail: string;
						contactPhone: string;
						profileImage: string | null;
						description: string | null;
						createdAt: Date;
						updatedAt: Date;
						ownerId: string;
						reviews: Array<{
							id: string;
							rating: number;
							comment: string | null;
							createdAt: Date;
						}>;
						contactInfo: Array<{
							id: string;
							name: string;
							position: string;
							contact: string;
						}>;
					};
					_count: {
						applicants: number;
					};
				}>;
				pagination: {
					total: number;
					page: number;
					limit: number;
					totalPages: number;
				};
		  }
		| {
				jobs: Array<{
					id: string;
					payBasis: string;
					startDate: Date;
					endDate: Date;
				}>;
				pagination: {
					total: number;
					page: number;
					limit: number;
					totalPages: number;
				};
		  }
	> {
		const session = await auth.api.getSession({
			headers: c.req.raw.headers,
		});

		const {
			status,
			urgency,
			facilityId,
			location,
			payBasis,
			startDate,
			endDate,
			page,
			limit,
		} = query;

		const where: Prisma.JobWhereInput = {};

		if (status) where.status = status;
		if (urgency) where.urgency = urgency;
		if (facilityId) where.facilityId = facilityId;
		if (location) where.location = { contains: location, mode: "insensitive" };
		if (payBasis) where.payBasis = payBasis;
		if (startDate) where.startDate = { gte: startDate };
		if (endDate) where.endDate = { lte: endDate };

		const skip = (page - 1) * limit;

		// Check if user has doctor or admin role
		let hasFullAccess = false;
		if (session?.user?.id) {
			const user = await prisma.user.findUnique({
				where: { id: session.user.id },
				select: { role: true },
			});
			hasFullAccess = user?.role === "DOCTOR" || user?.role === "ADMIN";
		}

		// Define select fields based on user role
		const fullAccessSelect = {
			id: true,
			title: true,
			description: true,
			location: true,
			payRate: true,
			payBasis: true,
			startTime: true,
			endTime: true,
			startDate: true,
			endDate: true,
			jobType: true,
			urgency: true,
			status: true,
			requiredSpecialists: true,
			documentUrls: true,
			facilityId: true,
			createdAt: true,
			updatedAt: true,
			facility: {
				select: {
					id: true,
					name: true,
					address: true,
					contactEmail: true,
					contactPhone: true,
					profileImage: true,
					description: true,
					createdAt: true,
					updatedAt: true,
					ownerId: true,
					reviews: {
						select: {
							id: true,
							rating: true,
							comment: true,
							createdAt: true,
						},
					},
					contactInfo: {
						select: {
							id: true,
							name: true,
							position: true,
							contact: true,
						},
					},
				},
			},
			_count: {
				select: {
					applicants: true,
				},
			},
		} as const;

		const limitedAccessSelect = {
			id: true,
			payBasis: true,
			startDate: true,
			endDate: true,
		} as const;

		if (hasFullAccess) {
			const [jobs, total] = await Promise.all([
				prisma.job.findMany({
					where,
					skip,
					take: limit,
					orderBy: [{ urgency: "desc" }, { createdAt: "desc" }],
					select: fullAccessSelect,
				}),
				prisma.job.count({ where }),
			]);

			return {
				jobs,
				pagination: {
					total,
					page,
					limit,
					totalPages: Math.ceil(total / limit),
				},
			};
		} else {
			const [jobs, total] = await Promise.all([
				prisma.job.findMany({
					where,
					skip,
					take: limit,
					orderBy: [{ urgency: "desc" }, { createdAt: "desc" }],
					select: limitedAccessSelect,
				}),
				prisma.job.count({ where }),
			]);

			return {
				jobs,
				pagination: {
					total,
					page,
					limit,
					totalPages: Math.ceil(total / limit),
				},
			};
		}
	}

	// Update job
	async updateJob(id: string, data: UpdateJobInput) {
		return prisma.job.update({
			where: { id },
			data,
			include: {
				facility: {
					select: {
						id: true,
						name: true,
						address: true,
					},
				},
			},
		});
	}

	// Delete job
	async deleteJob(id: string) {
		return prisma.job.delete({
			where: { id },
		});
	}

	// Get jobs by facility
	async getJobsByFacility(facilityId: string) {
		return prisma.job.findMany({
			where: { facilityId },
			orderBy: { createdAt: "desc" },
			include: {
				_count: {
					select: {
						applicants: true,
					},
				},
			},
		});
	}
}

// Job Application Service (Single Responsibility Principle)
export class JobApplicationService {
	// Create job application
	async createApplication(data: CreateJobApplicationInput) {
		// Check if already applied
		const existing = await prisma.jobApplication.findUnique({
			where: {
				jobId: data.jobId,
				doctorProfileId: data.applicantId,
			},
		});

		if (existing) {
			throw new Error("You have already applied to this job");
		}

		return prisma.jobApplication.create({
			data,
			include: {
				job: {
					select: {
						id: true,
						title: true,
						facility: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});
	}

	// Get application by ID
	async getApplicationById(id: string) {
		return prisma.jobApplication.findUnique({
			where: { id },
			include: {
				job: {
					include: {
						facility: true,
					},
				},
				DoctorProfile: {
					select: {
						id: true,
						fullName: true,
						phoneNumber: true,
						user: {
							select: {
								email: true,
							},
						},
					},
				},
			},
		});
	}

	// Get applications by job
	async getApplicationsByJob(jobId: string) {
		return prisma.jobApplication.findMany({
			where: { jobId },
			orderBy: { appliedAt: "desc" },
			select: {
				DoctorProfile: {
					select: {
						id: true,
						fullName: true,
						user: {
							select: {
								email: true,
							},
						},
						phoneNumber: true,
					},
				},
			},
		});
	}

	// Get applications by user
	async getApplicationsByUser(applicantId: string) {
		return prisma.jobApplication.findMany({
			where: { doctorProfileId: applicantId },
			orderBy: { appliedAt: "desc" },
			select: {
				job: {
					select: {
						id: true,
						title: true,
						facility: {
							select: {
								id: true,
								name: true,
								address: true,
							},
						},
					},
				},
			},
		});
	}

	// Update application status
	async updateApplication(id: string, data: UpdateJobApplicationInput) {
		return prisma.jobApplication.update({
			where: { id },
			data,
		});
	}

	// Delete application
	async deleteApplication(id: string) {
		return prisma.jobApplication.delete({
			where: { id },
		});
	}
}

// Export singleton instances
export const jobService = new JobService();
export const jobApplicationService = new JobApplicationService();
