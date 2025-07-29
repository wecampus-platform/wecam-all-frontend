// stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      email: null,
      role: null,
      auth: false,
      councilList: [],
      refreshToken: null,
      ready: false,

      setAuth: (data) => set({
        accessToken: data.accessToken,
        email: data.email,
        role: data.role,
        auth: data.auth,
        councilList: data.councilList,
        refreshToken: data.refreshToken,
        ready: true,
      }),

      clearAuth: () => set({
        accessToken: null,
        email: null,
        role: null,
        auth: false,
        councilList: [],
        refreshToken: null,
        ready: true,
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        role: state.role,
        auth: state.auth,
        councilList: state.councilList,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
