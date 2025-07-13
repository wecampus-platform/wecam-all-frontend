'use client';

import { useAuthStore } from '../stores/authStore';

export const fetchClient = async (basePath, path, options = {}, token = null) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const headers = {
    'Content-Type': 'application/json',
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

export const clientapi = (path, options = {}) => {
  const accessToken = useAuthStore.getState().accessToken;
  return fetchClient('/client', path, options, accessToken);
};

export const publicapi = (path, options = {}) => {
  return fetchClient('/public', path, options);
};

export const authapi = (path, options = {}) => {
  return fetchClient('/auth', path, options);
};
