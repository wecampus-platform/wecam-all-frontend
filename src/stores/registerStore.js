import { create } from 'zustand';

export const useRegisterStore = create((set) => ({
  registerInfo: {
    school: null,
    college: null,
    department: null,
  },
  setRegisterInfo: (info) => set({ registerInfo: info }),
}));
