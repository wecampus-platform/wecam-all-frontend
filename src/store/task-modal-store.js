'use client';

import { create } from 'zustand';

export const useTaskModalStore = create((set) => ({
  isOpen: false,
  detail: null,

  /* 모달 열기 (detail 객체를 저장) */
  open: (detail) => set({ isOpen: true, detail }),

  /* 모달 닫기 */
  close: () => set({ isOpen: false, detail: null }),
}));
