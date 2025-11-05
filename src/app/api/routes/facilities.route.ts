import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { facilityService } from "../services/facilities.service";
import { facilitySchema } from "../types/facilities.types";

const app = new Hono()
	.get("/", async (c) => {
		const facilities = await facilityService.getFacilities();
		return c.json({
			success: true,
			data: facilities,
		});
	})

	.get(
		"/:id",
		zValidator("param", facilitySchema.pick({ id: true })),
		async (c) => {
			const { id } = c.req.valid("param");
			const facility = await facilityService.getFacilityById(id);
			return c.json({
				success: true,
				data: facility,
			});
		},
	)
	.post(
		"/",
		zValidator(
			"json",
			facilitySchema.omit({ id: true, createdAt: true, updatedAt: true }),
		),
		async (c) => {
			const data = c.req.valid("json");
			const facility = await facilityService.createFacility(data);
			return c.json({
				success: true,
				data: facility,
			});
		},
	);

export default app;
