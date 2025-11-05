import type {
	CreateJobInput,
	Job,
	JobQuery,
	UpdateJobInput,
} from "../types/job.types";
import { JobStatus } from "../types/job.types";
import { mockJobs } from "../utils/jobs.mock";

/**
 * Job Service - handles business logic for job operations
 * In a real application, this would interact with a database (Prisma, etc.)
 */
class JobService {
	// Mock database - replace with actual database calls
	private jobs: Job[] = [...mockJobs];

	/**
	 * Get all jobs with pagination and filtering
	 */
	async getJobs(query: JobQuery) {
		let filteredJobs = [...this.jobs];

		// filters
		if (query.status) {
			filteredJobs = filteredJobs.filter((job) => job.status === query.status);
		}

		if (query.jobType) {
			filteredJobs = filteredJobs.filter(
				(job) => job.jobType === query.jobType,
			);
		}

		if (query.search) {
			const searchLower = query.search.toLowerCase();
			filteredJobs = filteredJobs.filter(
				(job) =>
					job.title.toLowerCase().includes(searchLower) ||
					job.description.toLowerCase().includes(searchLower) ||
					job.location.toLowerCase().includes(searchLower),
			);
		}

		// pagination
		const total = filteredJobs.length;
		const totalPages = total === 0 ? 1 : Math.ceil(total / query.limit);

		// validate page number
		if (query.page > totalPages) {
			if (total === 0) {
				throw new Error("No jobs found");
			}
			throw new Error(`Page ${query.page} exceeds total pages (${totalPages})`);
		}

		const start = (query.page - 1) * query.limit;
		const end = start + query.limit;

		const paginatedJobs = filteredJobs.slice(start, end);

		return {
			data: paginatedJobs,
			pagination: {
				page: query.page,
				limit: query.limit,
				total,
				totalPages,
			},
		};
	}

	/**
	 * Get a single job by ID
	 */
	async getJobById(id: string): Promise<Job | null> {
		return this.jobs.find((job) => job.id === id) || null;
	}

	/**
	 * Create a new job
	 */
	async createJob(data: CreateJobInput): Promise<Job> {
		const newJob: Job = {
			id: crypto.randomUUID(),
			...data,
			status: JobStatus.DRAFT,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		this.jobs.push(newJob);
		return newJob;
	}

	/**
	 * Update an existing job
	 */
	async updateJob(id: string, data: UpdateJobInput): Promise<Job | null> {
		const index = this.jobs.findIndex((job) => job.id === id);

		if (index === -1) {
			return null;
		}

		const updatedJob: Job = {
			...this.jobs[index],
			...data,
			updatedAt: new Date().toISOString(),
		};

		this.jobs[index] = updatedJob;
		return updatedJob;
	}

	/**
	 * Delete a job
	 */
	async deleteJob(id: string): Promise<boolean> {
		const index = this.jobs.findIndex((job) => job.id === id);

		if (index === -1) {
			return false;
		}

		this.jobs.splice(index, 1);
		return true;
	}

	/**
	 * Publish a job (change status from draft to published)
	 */
	async publishJob(id: string): Promise<Job | null> {
		const job = await this.getJobById(id);

		if (!job) {
			return null;
		}

		return this.updateJob(id, { status: JobStatus.PUBLISHED });
	}

	/**
	 * Close a job (change status to closed)
	 */
	async closeJob(id: string): Promise<Job | null> {
		const job = await this.getJobById(id);

		if (!job) {
			return null;
		}

		return this.updateJob(id, { status: JobStatus.CLOSED });
	}
}

// Export singleton instance
export const jobService = new JobService();
