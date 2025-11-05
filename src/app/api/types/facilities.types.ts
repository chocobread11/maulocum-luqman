import { z } from "zod";

// Contact Info interface
export interface ContactInfo {
	name: string;
	position: string;
	contact: string;
}

// Review interface
export interface Review {
	name: string;
	star: number;
	comment: string;
	date: Date;
}

// Facility interface
export interface Facility {
	id: string;
	name: string;
	address: string;
	contactEmail: string;
	contactPhone: string;
	createdAt: Date;
	updatedAt: Date;
	profileImage?: string;
	contactInfo: ContactInfo[];
	reviews: Review[];
	openJobs: string[];
}

// Zod schemas for validation
const contactInfoSchema = z.object({
	name: z.string().min(1, "Contact name is required"),
	position: z.string().min(1, "Position is required"),
	contact: z.string().min(1, "Contact is required"),
});

const reviewSchema = z.object({
	name: z.string().min(1, "Reviewer name is required"),
	star: z.number().min(1).max(5),
	comment: z.string().min(1, "Comment is required"),
	date: z.date(),
});

export const facilitySchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, "Facility name is required"),
	address: z.string().min(1, "Address is required"),
	contactEmail: z.string().email("Invalid email address"),
	contactPhone: z.string().min(1, "Contact phone is required"),
	createdAt: z.date(),
	updatedAt: z.date(),
	profileImage: z.string().url().optional(),
	contactInfo: z.array(contactInfoSchema).default([]),
	reviews: z.array(reviewSchema).default([]),
	openJobs: z.array(z.string()).default([]),
});

export const createFacilitySchema = facilitySchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const updateFacilitySchema = createFacilitySchema.partial();

// Type exports
export type CreateFacilityInput = z.infer<typeof createFacilitySchema>;
export type UpdateFacilityInput = z.infer<typeof updateFacilitySchema>;
