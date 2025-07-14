import { authapi } from '@/lib/fetchClient';

export const getDuplicate = async (type, value) => {
  const res = await authapi(`/check/${type}?${type}=${encodeURIComponent(value)}`, {
    method: 'GET',
  });
  return res;
};

export const registerUser = async (data) => {
  const res = await authapi('/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
};
