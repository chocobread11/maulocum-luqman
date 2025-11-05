import { create } from "zustand";

interface EditVerificationState {
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
	toggleEdit: () => void;
}

export const useEditVerificationStore = create<EditVerificationState>()(
	(set) => ({
		isEditing: false,
		setIsEditing: (isEditing: boolean) => set({ isEditing }),
		toggleEdit: () => set((state) => ({ isEditing: !state.isEditing })),
	}),
);
