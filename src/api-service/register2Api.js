import { authapi,publicapi } from '@/lib/fetchClient';

export const getDuplicate = async (type, value) => {
  const res = await authapi(`/check/${type}?${type}=${encodeURIComponent(value)}`, {
    method: 'GET',
  });
  return res;
};

export const registerUser = async (data) => {
  const res = await publicapi('/auth/sign/student', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
};



export const presidentRegisterUser = async (data) => {
  const res = await publicapi('/auth/sign/leader', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
};
