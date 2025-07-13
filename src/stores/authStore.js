import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  accessToken: null,
  email: null,
  role: null,
  auth: false,
  councilList: [],
  ready: false,

  setAuth: (data) => set({
    accessToken: data.accessToken,
    email: data.email,
    role: data.role,
    auth: data.auth,
    councilList: data.councilList,
    ready: true,
  }),

  clearAuth: () => set({
    accessToken: null,
    email: null,
    role: null,
    auth: false,
    councilList: [],
    ready: true,
  }),
}));
