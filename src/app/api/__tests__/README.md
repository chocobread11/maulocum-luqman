# API Tests

Comprehensive test suite for the Jobs API endpoints using Bun's built-in test runner.

## Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test src/app/api/v2/[...route]/__tests__/jobs.test.ts
```

## Test Coverage

### GET /jobs
- ✅ Returns paginated jobs with default params
- ✅ Returns paginated jobs with custom limit
- ✅ Returns second page of results
- ✅ Filters jobs by status
- ✅ Filters jobs by jobType
- ✅ Searches jobs by keyword
- ✅ Combines multiple filters
- ✅ Returns 404 when page exceeds total pages
- ✅ Returns 404 with clear message when no jobs found and page > 1
- ✅ Returns empty array for page 1 when no results
- ✅ Validates query parameters
- ✅ Enforces max limit of 100

### POST /jobs
- ✅ Creates a new job with valid data
- ✅ Rejects job creation with missing required fields
- ✅ Rejects job with invalid email
- ✅ Rejects job with title too short

### GET /jobs/:id
- ✅ Gets a job by ID
- ✅ Returns 404 for non-existent job ID

### PUT /jobs/:id
- ✅ Updates an existing job
- ✅ Returns 404 when updating non-existent job
- ✅ Rejects update with invalid data

### POST /jobs/:id/publish
- ✅ Publishes a draft job
- ✅ Returns 404 when publishing non-existent job

### POST /jobs/:id/close
- ✅ Closes a job
- ✅ Returns 404 when closing non-existent job

### DELETE /jobs/:id
- ✅ Deletes an existing job
- ✅ Returns 404 when deleting non-existent job

## Test Structure

```typescript
describe("Jobs API", () => {
  describe("GET /jobs", () => {
    test("should return paginated jobs", async () => {
      // Test implementation
    });
  });
});
```

## Example Test

```typescript
test("should create a new job with valid data", async () => {
  const newJob = {
    title: "Test Locum Doctor Position",
    description: "This is a test job posting",
    location: "Test City Hospital",
    jobType: JobType.LOCUM,
    contactEmail: "test@example.com",
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
  expect(data.data.title).toBe(newJob.title);
});
```

## Assertions Used

- `expect(value).toBe(expected)` - Strict equality
- `expect(value).toEqual(expected)` - Deep equality
- `expect(value).toBeArray()` - Check if array
- `expect(value).toBeDefined()` - Check if defined
- `expect(value).toMatchObject(obj)` - Partial object match
- `expect(value).toBeLessThanOrEqual(n)` - Numeric comparison
- `expect(value).toContain(str)` - String contains

## Notes

- Tests use mock data from `../mock.ts`
- Each test is isolated and doesn't affect others
- Tests cover both success and error cases
- Validation errors are properly tested
- Edge cases (empty results, pagination limits) are covered
