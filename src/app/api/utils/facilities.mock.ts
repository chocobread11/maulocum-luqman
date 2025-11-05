import type { Facility } from "../types/facilities.types";

export const mockFacilities: Facility[] = [
	{
		id: "facility-001",
		name: "Kuala Lumpur General Hospital",
		address: "123 Hospital Street, Kuala Lumpur, Malaysia",
		contactEmail: "hr@klgh.gov.my",
		contactPhone: "+60123456789",
		createdAt: new Date("2025-10-15T08:30:00.000Z"),
		updatedAt: new Date("2025-10-20T14:22:00.000Z"),
		profileImage: "https://example.com/klgh.jpg",
		contactInfo: [
			{
				name: "Dr. Ahmad Hassan",
				position: "HR Manager",
				contact: "+60123456789",
			},
			{
				name: "Nurse Siti Aminah",
				position: "Recruitment Officer",
				contact: "+60123456790",
			},
		],
		reviews: [
			{
				name: "Dr. John Tan",
				star: 5,
				comment: "Excellent facility with great support staff",
				date: new Date("2025-10-18T10:00:00.000Z"),
			},
			{
				name: "Dr. Sarah Lee",
				star: 4,
				comment: "Good working environment",
				date: new Date("2025-10-19T14:30:00.000Z"),
			},
		],
		openJobs: [],
	},
	{
		id: "facility-002",
		name: "Klinik Kesihatan Ampang",
		address: "Jalan Ampang, 50450 Kuala Lumpur, Malaysia",
		contactEmail: "info@klinikampang.com.my",
		contactPhone: "+60342567890",
		createdAt: new Date("2025-10-18T10:15:00.000Z"),
		updatedAt: new Date("2025-10-18T10:15:00.000Z"),
		profileImage: "https://example.com/klinikampang.jpg",
		contactInfo: [
			{
				name: "Dr. Lim Wei Ming",
				position: "Clinic Director",
				contact: "+60342567890",
			},
		],
		reviews: [
			{
				name: "Dr. Fatimah Zahra",
				star: 4,
				comment: "Nice small clinic, good for locum work",
				date: new Date("2025-10-20T09:00:00.000Z"),
			},
		],
		openJobs: [],
	},
	{
		id: "facility-003",
		name: "Penang Medical Centre",
		address: "Penang Island, 10450 Penang, Malaysia",
		contactEmail: "recruitment@penangmedical.com",
		contactPhone: "+60164445555",
		createdAt: new Date("2025-10-10T09:00:00.000Z"),
		updatedAt: new Date("2025-10-22T16:45:00.000Z"),
		profileImage: "https://example.com/penangmedical.jpg",
		contactInfo: [
			{
				name: "Ms. Chong Mei Ling",
				position: "HR Coordinator",
				contact: "+60164445555",
			},
			{
				name: "Dr. Rajesh Kumar",
				position: "Medical Director",
				contact: "+60164445556",
			},
		],
		reviews: [
			{
				name: "Dr. Emily Wong",
				star: 5,
				comment: "Top-notch private hospital",
				date: new Date("2025-10-21T11:00:00.000Z"),
			},
		],
		openJobs: [],
	},
	{
		id: "facility-004",
		name: "Ipoh Private Hospital",
		address: "Ipoh, Perak, Malaysia",
		contactEmail: "anaesthesia@ipohhospital.com",
		contactPhone: "+60175556666",
		createdAt: new Date("2025-10-20T13:00:00.000Z"),
		updatedAt: new Date("2025-10-20T13:00:00.000Z"),
		profileImage: "https://example.com/ipohprivate.jpg",
		contactInfo: [
			{
				name: "Dr. Anwar Ibrahim",
				position: "Anaesthesia Head",
				contact: "+60175556666",
			},
		],
		reviews: [],
		openJobs: [],
	},
	{
		id: "facility-005",
		name: "Bukit Jalil Sports Medicine Centre",
		address: "Bukit Jalil, Kuala Lumpur, Malaysia",
		contactEmail: "sports@bukitjalilmed.com",
		contactPhone: "+60123456700",
		createdAt: new Date("2025-10-22T10:00:00.000Z"),
		updatedAt: new Date("2025-10-24T15:30:00.000Z"),
		profileImage: "https://example.com/bukitjalil.jpg",
		contactInfo: [
			{
				name: "Dr. Marcus Tan",
				position: "Sports Medicine Specialist",
				contact: "+60123456700",
			},
		],
		reviews: [
			{
				name: "Dr. Aisha Rahman",
				star: 5,
				comment: "Specialized facility, great experience",
				date: new Date("2025-10-23T16:00:00.000Z"),
			},
		],
		openJobs: [],
	},
	{
		id: "facility-006",
		name: "Kuching Health Centre",
		address: "Kuching, Sarawak, Malaysia",
		contactEmail: "specialist@kuchinghealth.com",
		contactPhone: "+60188889999",
		createdAt: new Date("2025-10-23T15:00:00.000Z"),
		updatedAt: new Date("2025-10-24T10:00:00.000Z"),
		profileImage: "https://example.com/kuchinghealth.jpg",
		contactInfo: [
			{
				name: "Dr. David Ling",
				position: "Chief Specialist",
				contact: "+60188889999",
			},
		],
		reviews: [
			{
				name: "Dr. Nurul Huda",
				star: 4,
				comment: "Good facility in East Malaysia",
				date: new Date("2025-10-24T08:00:00.000Z"),
			},
		],
		openJobs: [],
	},
];
