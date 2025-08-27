'use client';

import { adminapi } from '@/lib/fetchClient';

export const categoryApi = {
  // 카테고리 대시보드 조회
  getCategoryDashboard: async (councilName) => {
    try {
      const response = await adminapi(`/council/${encodeURIComponent(councilName)}/category/dashboard`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '카테고리 대시보드 조회에 실패했습니다.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('카테고리 대시보드 조회 API 오류:', error);
      throw error;
    }
  },

  // 카테고리 생성
  createCategory: async (councilName, categoryName) => {
    try {
      const response = await adminapi(`/council/${encodeURIComponent(councilName)}/category/create?categoryName=${encodeURIComponent(categoryName)}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '카테고리 생성에 실패했습니다.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('카테고리 생성 API 오류:', error);
      throw error;
    }
  },

  // 카테고리 목록 조회
  getCategories: async (councilName) => {
    try {
      const response = await adminapi(`/council/${encodeURIComponent(councilName)}/categories`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '카테고리 목록 조회에 실패했습니다.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('카테고리 목록 조회 API 오류:', error);
      throw error;
    }
  },

  // 카테고리 삭제
  deleteCategory: async (councilName, categoryId) => {
    try {
      const response = await adminapi(`/council/${encodeURIComponent(councilName)}/category/${categoryId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '카테고리 삭제에 실패했습니다.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('카테고리 삭제 API 오류:', error);
      throw error;
    }
  },

  // 카테고리 수정
  updateCategory: async (councilName, categoryId, categoryName) => {
    try {
      const response = await adminapi(`/council/${encodeURIComponent(councilName)}/category/${categoryId}`, {
        method: 'PUT',
        body: JSON.stringify({ categoryName }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '카테고리 수정에 실패했습니다.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('카테고리 수정 API 오류:', error);
      throw error;
    }
  },
};
