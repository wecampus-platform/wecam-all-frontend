'use client';

import { useAuthStore } from '../store/authStore';
import { clientapi } from '../../lib/fetchClient';
import { useRouter } from 'next/navigation';

export function LogOut() {
  const { ready, clearAuth, refreshToken } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    if (!ready) return;

    if (!refreshToken) {
      console.error('refreshToken 없음');
      clearAuth();
      router.push('/login');
      return;
    }

    try {
      await clientapi('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        headers: { 'Content-Type': 'application/json' },
      });

      clearAuth();
      router.push('/login');
    } catch (err) {
      console.error('[LogOut] 에러 발생:', err);
      clearAuth();
      router.push('/login');
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="button-common w-full p-10">
        로그아웃
      </button>
    </div>
  );
}
