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
      councilName: null,
      selectedCouncilId: null,
      refreshToken: null,
      ready: false,

      setAuth: (data) => set({
        accessToken: data.accessToken,
        email: data.email,
        role: data.role,
        auth: data.auth,
        councilList: data.councilList,
        councilName: data.councilList?.[0]?.name || null,
        selectedCouncilId: data.selectedCouncilId || data.councilList?.[0]?.id || null,
        refreshToken: data.refreshToken,
        ready: true,
      }),

      clearAuth: () => set({
        accessToken: null,
        email: null,
        role: null,
        auth: false,
        councilList: [],
        councilName: null,
        refreshToken: null,
        ready: true,
      }),

      // 권한 확인 함수들
      isAdmin: () => {
        const state = useAuthStore.getState();
        return state.role === 'COUNCIL' || state.role === 'PRESIDENT';
      },

      isCouncil: () => {
        const state = useAuthStore.getState();
        return state.role === 'COUNCIL';
      },

      isPresident: () => {
        const state = useAuthStore.getState();
        return state.role === 'PRESIDENT';
      },

      hasAdminAccess: () => {
        const state = useAuthStore.getState();
        return state.auth && (state.role === 'COUNCIL' || state.role === 'PRESIDENT');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        role: state.role,
        auth: state.auth,
        councilList: state.councilList,
        councilName: state.councilName,
        selectedCouncilId: state.selectedCouncilId,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
