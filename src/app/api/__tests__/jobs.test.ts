import { describe, expect, test } from "bun:test";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import jobsRoute from "../routes/jobs.route";
import { JobType } from "../types/job.types";

// Create a test app instance
const app = new Hono();

// Add global error handler (same as main route.ts)
app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return c.json(
			{
				success: false,
				error: err.message,
				code: err.status,
			},
			err.status,
		);
	}

	console.error("Unhandled error:", err);
	return c.json(
		{
			success: false,
			error: "Internal Server Error",
			code: 500,
		},
		500,
	);
});

app.route("/jobs", jobsRoute);

describe("Jobs API", () => {
	describe("GET /jobs", () => {
		test("should return paginated jobs with default params", async () => {
			const res = await app.request("/jobs");
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);
			expect(data.data).toBeArray();
			expect(data.pagination).toEqual({
				page: 1,
				limit: 10,
				total: expect.any(Number),
				totalPages: expect.any(Number),
			});
		});

		test("should return paginated jobs with custom limit", async () => {
			const res = await app.request("/jobs?limit=5");
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);
			expect(data.data.length).toBeLessThanOrEqual(5);
			expect(data.pagination.limit).toBe(5);
		});

		test("should return second page of results", async () => {
			const res = await app.request("/jobs?page=2&limit=5");
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);
			expect(data.pagination.page).toBe(2);
		});

		test("should filter jobs by status", async () => {
			const res = await app.request("/jobs?status=published");
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);

			if (data.data.length > 0) {
				for (const job of data.data) {
					expect(job.status).toBe("published");
				}
			}
		});

		test("should filter jobs by jobType", async () => {
			const res = await app.request("/jobs?jobType=locum");
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);

			if (data.data.length > 0) {
				for (const job of data.data) {
					expect(job.jobType).toBe("locum");
				}
			}
		});

		test("should search jobs by keyword", async () => {
			const res = await app.request("/jobs?search=doctor");
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);

			if (data.data.length > 0) {
				const hasKeyword = data.data.some(
					(job: any) =>
						job.title.toLowerCase().includes("doctor") ||
						job.description.toLowerCase().includes("doctor") ||
						job.location.toLowerCase().includes("doctor"),
				);
				expect(hasKeyword).toBe(true);
			}
		});

		test("should combine multiple filters", async () => {
			const res = await app.request(
				"/jobs?status=published&jobType=full_time&limit=5",
			);
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);

			if (data.data.length > 0) {
				for (const job of data.data) {
					expect(job.status).toBe("published");
					expect(job.jobType).toBe("full_time");
				}
			}
		});

		test("should return 404 when page exceeds total pages", async () => {
			const res = await app.request("/jobs?page=999&limit=10");
			const data = await res.json();

			expect(res.status).toBe(404);
			expect(data.success).toBe(false);
			expect(data.error).toContain("exceeds total pages");
		});

		test("should return 404 with clear message when no jobs found and page > 1", async () => {
			const res = await app.request("/jobs?page=2&search=nonexistentjobxyz123");
			const data = await res.json();

			expect(res.status).toBe(404);
			expect(data.success).toBe(false);
			expect(data.error).toBe("No jobs found");
		});

		test("should return empty array for page 1 when no results", async () => {
			const res = await app.request("/jobs?search=nonexistentjobxyz123");
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);
			expect(data.data).toEqual([]);
			expect(data.pagination.total).toBe(0);
		});

		test("should validate query parameters", async () => {
			const res = await app.request("/jobs?page=invalid");
			const data = await res.json();

			expect(res.status).toBe(400);
			expect(data.success).toBe(false);
		});

		test("should enforce max limit of 100", async () => {
			const res = await app.request("/jobs?limit=200");
			const data = await res.json();

			expect(res.status).toBe(400);
			expect(data.success).toBe(false);
		});
	});

	describe("POST /jobs", () => {
		test("should create a new job with valid data", async () => {
			const newJob = {
				title: "Test Locum Doctor Position",
				description: "This is a test job posting for a locum doctor position",
				location: "Test City Hospital",
				jobType: JobType.LOCUM,
				salary: {
					min: 5000,
					max: 8000,
					currency: "MYR",
				},
				requirements: ["MBBS", "Valid MMC registration"],
				benefits: ["Flexible hours", "Competitive pay"],
				contactEmail: "test@example.com",
				contactPhone: "+60123456789",
			};

			const res = await app.request("/jobs", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newJob),
			});

			const data = await res.json();

			expect(res.status).toBe(201);
			expect(data.success).toBe(true);
			expect(data.data).toMatchObject({
				title: newJob.title,
				description: newJob.description,
				location: newJob.location,
				jobType: newJob.jobType,
				status: "draft",
			});
			expect(data.data.id).toBeDefined();
			expect(data.data.createdAt).toBeDefined();
			expect(data.data.updatedAt).toBeDefined();

			// Save ID for later tests
		});

		test("should reject job creation with missing required fields", async () => {
			const invalidJob = {
				title: "Test Job",
				// Missing required fields
			};

			const res = await app.request("/jobs", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invalidJob),
			});

			const data = await res.json();

			expect(res.status).toBe(400);
			expect(data.success).toBe(false);
		});

		test("should reject job with invalid email", async () => {
			const invalidJob = {
				title: "Test Job",
				description: "Test description",
				location: "Test Location",
				jobType: JobType.FULL_TIME,
				contactEmail: "invalid-email",
			};

			const res = await app.request("/jobs", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invalidJob),
			});

			const data = await res.json();

			expect(res.status).toBe(400);
			expect(data.success).toBe(false);
		});

		test("should reject job with title too short", async () => {
			const invalidJob = {
				title: "AB", // Too short
				description: "Test description that is long enough",
				location: "Test Location",
				jobType: JobType.FULL_TIME,
				contactEmail: "test@example.com",
			};

			const res = await app.request("/jobs", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invalidJob),
			});

			const data = await res.json();

			expect(res.status).toBe(400);
			expect(data.success).toBe(false);
		});
	});

	describe("GET /jobs/:id", () => {
		test("should get a job by ID", async () => {
			// Use a known job ID from mock data
			const res = await app.request("/jobs/job-001");
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);
			expect(data.data).toMatchObject({
				id: "job-001",
				title: expect.any(String),
				description: expect.any(String),
				location: expect.any(String),
				jobType: expect.any(String),
				status: expect.any(String),
			});
		});

		test("should return 404 for non-existent job ID", async () => {
			const res = await app.request("/jobs/non-existent-id-xyz");
			const data = await res.json();

			expect(res.status).toBe(404);
			expect(data.success).toBe(false);
			expect(data.error).toBe("Job not found");
		});
	});

	describe("PUT /jobs/:id", () => {
		test("should update an existing job", async () => {
			const updates = {
				title: "Updated Test Job Title",
				description: "Updated description for the test job",
			};

			const res = await app.request("/jobs/job-001", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updates),
			});

			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);
			expect(data.data.title).toBe(updates.title);
			expect(data.data.description).toBe(updates.description);
			expect(data.data.updatedAt).toBeDefined();
		});

		test("should return 404 when updating non-existent job", async () => {
			const updates = {
				title: "Updated Title",
			};

			const res = await app.request("/jobs/non-existent-id", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updates),
			});

			const data = await res.json();

			expect(res.status).toBe(404);
			expect(data.success).toBe(false);
			expect(data.error).toBe("Job not found");
		});

		test("should reject update with invalid data", async () => {
			const invalidUpdates = {
				contactEmail: "invalid-email-format",
			};

			const res = await app.request("/jobs/job-001", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invalidUpdates),
			});

			const data = await res.json();

			expect(res.status).toBe(400);
			expect(data.success).toBe(false);
		});
	});

	describe("POST /jobs/:id/publish", () => {
		test("should publish a draft job", async () => {
			// First create a draft job
			const newJob = {
				title: "Job to Publish",
				description: "This job will be published",
				location: "Test Location",
				jobType: JobType.FULL_TIME,
				contactEmail: "publish@test.com",
			};

			const createRes = await app.request("/jobs", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newJob),
			});

			const createData = await createRes.json();
			const jobId = createData.data.id;

			// Now publish it
			const publishRes = await app.request(`/jobs/${jobId}/publish`, {
				method: "POST",
			});

			const publishData = await publishRes.json();

			expect(publishRes.status).toBe(200);
			expect(publishData.success).toBe(true);
			expect(publishData.data.status).toBe("published");
		});

		test("should return 404 when publishing non-existent job", async () => {
			const res = await app.request("/jobs/non-existent-id/publish", {
				method: "POST",
			});

			const data = await res.json();

			expect(res.status).toBe(404);
			expect(data.success).toBe(false);
		});
	});

	describe("POST /jobs/:id/close", () => {
		test("should close a job", async () => {
			const res = await app.request("/jobs/job-001/close", {
				method: "POST",
			});

			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.success).toBe(true);
			expect(data.data.status).toBe("closed");
		});

		test("should return 404 when closing non-existent job", async () => {
			const res = await app.request("/jobs/non-existent-id/close", {
				method: "POST",
			});

			const data = await res.json();

			expect(res.status).toBe(404);
			expect(data.success).toBe(false);
		});
	});

	describe("DELETE /jobs/:id", () => {
		test("should delete an existing job", async () => {
			// First create a job to delete
			const newJob = {
				title: "Job to Delete",
				description: "This job will be deleted",
				location: "Test Location",
				jobType: JobType.CONTRACT,
				contactEmail: "delete@test.com",
			};

			const createRes = await app.request("/jobs", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newJob),
			});

			const createData = await createRes.json();
			const jobId = createData.data.id;

			// Now delete it
			const deleteRes = await app.request(`/jobs/${jobId}`, {
				method: "DELETE",
			});

			const deleteData = await deleteRes.json();

			expect(deleteRes.status).toBe(200);
			expect(deleteData.success).toBe(true);
			expect(deleteData.message).toBe("Job deleted successfully");

			// Verify it's deleted
			const getRes = await app.request(`/jobs/${jobId}`);
			expect(getRes.status).toBe(404);
		});

		test("should return 404 when deleting non-existent job", async () => {
			const res = await app.request("/jobs/non-existent-id", {
				method: "DELETE",
			});

			const data = await res.json();

			expect(res.status).toBe(404);
			expect(data.success).toBe(false);
		});
	});
});
