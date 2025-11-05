import { z } from "zod";

// Enums
export enum JobStatus {
	DRAFT = "draft",
	PUBLISHED = "published",
	CLOSED = "closed",
}

export enum JobType {
	FULL_TIME = "full_time",
	PART_TIME = "part_time",
	LOCUM = "locum",
	CONTRACT = "contract",
}

// Job interface
export interface Job {
	id: string;
	title: string;
	description: string;
	location: string;
	jobType: JobType;
	status: JobStatus;
	salary: {
		min: number;
		max: number;
		currency: string;
	};
	requirements: string[];
	benefits: string[];
	startDate: string;
	endDate?: string;
	contactEmail: string;
	contactPhone: string;
	createdAt: string;
	updatedAt: string;
}

// Zod schemas for validation
export const createJobSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	location: z.string().min(1, "Location is required"),
	jobType: z.nativeEnum(JobType),
	salary: z.object({
		min: z.number().min(0),
		max: z.number().min(0),
		currency: z.string().default("MYR"),
	}),
	requirements: z.array(z.string()).default([]),
	benefits: z.array(z.string()).default([]),
	startDate: z.string(),
	endDate: z.string().optional(),
	contactEmail: z.string().email(),
	contactPhone: z.string(),
});

export const updateJobSchema = createJobSchema.partial().extend({
	status: z.nativeEnum(JobStatus).optional(),
});

export const jobQuerySchema = z.object({
	page: z.coerce.number().min(1).default(1),
	limit: z.coerce.number().min(1).max(100).default(10),
	status: z.nativeEnum(JobStatus).optional(),
	jobType: z.nativeEnum(JobType).optional(),
	search: z.string().optional(),
});

// Type exports
export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobQuery = z.infer<typeof jobQuerySchema>;

// Response types
export interface PaginatedResponse<T> {
	success: boolean;
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export interface SuccessResponse<T> {
	success: boolean;
	data: T;
}
