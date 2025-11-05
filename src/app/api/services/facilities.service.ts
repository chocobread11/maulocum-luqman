import type { Facility } from "../types/facilities.types";
import { mockFacilities } from "../utils/facilities.mock";

class FacilityService {
	private facilities: Facility[] = [...mockFacilities];

	async getFacilities() {
		return this.facilities;
	}

	async getFacilityById(id: string) {
		return this.facilities.find((facility) => facility.id === id);
	}

	async createFacility(
		facility: Omit<Facility, "id" | "createdAt" | "updatedAt">,
	) {
		const newFacility: Facility = {
			...facility,
			id: crypto.randomUUID(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.facilities.push(newFacility);
		return newFacility;
	}
}

export const facilityService = new FacilityService();
