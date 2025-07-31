import { create } from 'zustand';

export const useRegisterStore = create((set) => ({
  registerInfo: {
    school: null,
    college: null,
    department: null,
    studentNumber: null,
  },
  setRegisterInfo: (info) => set({ registerInfo: info }),
}));


export const usePresidentRegisterStore = create((set) => ({
  presidentRegisterInfo: {
    school: '',
    selschool:null,
    college: '',
    selcollege:null,
    department: '',
    seldepartment:null,
    studentNumber: null,
  },
  setPresidentRegisterInfo: (info) => set({ presidentRegisterInfo: info }),
}));
