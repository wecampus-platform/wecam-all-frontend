'use client';

import { useAuthStore } from '../store/authStore';

export const fetchClient = async (basePath, path, options = {}, token = null) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseURL}${basePath}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'API 요청 실패');
  }

  return res;
};

export const clientapi = async (path, options = {}) => {
  while (!useAuthStore.getState().ready) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const { accessToken } = useAuthStore.getState();
  if (!accessToken) throw new Error('AccessToken이 없습니다.');

  return fetchClient('/client', path, options, accessToken);
};

export const publicapi = (path, options = {}) => {
  return fetchClient('/public', path, options);
};

export const authapi = (path, options = {}) => {
  return fetchClient('/auth', path, options);
};

export const adminapi = async (path, options = {}) => {
  while (!useAuthStore.getState().ready) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const { accessToken, councilList } = useAuthStore.getState();
  const councilId = councilList?.[0]?.id;

  if (!accessToken) throw new Error('AccessToken이 없습니다.');
  if (!councilId) throw new Error('Council ID가 없습니다.');

  const mergedOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      'X-Council-Id': councilId.toString(),
    },
  };

  return fetchClient('/admin', path, mergedOptions, accessToken);
};