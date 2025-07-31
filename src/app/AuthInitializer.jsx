'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthInitializer() {
  const setAccessTokenOnly = (accessToken) => {
    useAuthStore.setState({
      accessToken,
      ready: true,
    });
  };

  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = useAuthStore.getState().refreshToken;
      console.log('[AuthInitializer] refreshToken:', refreshToken);

      if (!refreshToken) {
        clearAuth();
        console.log('[AuthInitializer] refreshToken 없음 → clearAuth 실행');
        useAuthStore.setState({ ready: true });
        return;
      }

      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/client/auth/token/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Refresh token 요청 실패');

        const data = await res.json();
        setAccessTokenOnly(data.accessToken);

        if (data.refreshToken) {
          useAuthStore.setState({ refreshToken: data.refreshToken });
        }
      } catch (err) {
        console.error('[AuthInitializer] 에러:', err);
        clearAuth();
        useAuthStore.setState({ refreshToken: null, ready: true });
      }
    };

    refreshAccessToken();
  }, []);

  return null;
}
