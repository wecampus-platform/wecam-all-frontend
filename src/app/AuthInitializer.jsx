'use client';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export default function AuthInitializer() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);


  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
      console.log('[AuthInitializer] refreshToken:', refreshToken);

      if (!refreshToken) {
        clearAuth();
        console.log('[AuthInitializer] refreshToken 없음 → clearAuth 실행');
        return;
      }

      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/client/auth/token/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
          credentials: 'include',
        });

        console.log('[AuthInitializer] fetch 응답 상태:', res.status);

        if (!res.ok) throw new Error('Refresh token 요청 실패');

        const data = await res.json();
        console.log('[AuthInitializer] 받은 데이터:', data);

        setAuth({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken || refreshToken,
        });

        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
          console.log('[AuthInitializer] refreshToken 업데이트');
        }

      } catch (err) {
        console.error('[AuthInitializer] 에러:', err);
        clearAuth();
        localStorage.removeItem('refreshToken');
      }
    };

    refreshAccessToken();
  }, []);

  return null;
}
