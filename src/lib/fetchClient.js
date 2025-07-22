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

export const clientapi = async (path, options = {}) => {
  const { accessToken, ready } = useAuthStore.getState();

  if (!ready) throw new Error('Auth 상태가 아직 준비되지 않았습니다.');
  if (!accessToken) throw new Error('AccessToken이 없습니다.');

  return fetchClient('/client', path, options, accessToken);
};


export const publicapi = (path, options = {}) => {
  return fetchClient('/public', path, options);
};

export const authapi = (path, options = {}) => {
  return fetchClient('/auth', path, options);
};


export const adminapi = (path, options = {}) => {
  return fetchClient('/admin', path, options);
};