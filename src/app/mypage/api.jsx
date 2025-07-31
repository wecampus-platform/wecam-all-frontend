'use client';

import { useEffect, useState } from 'react';
import { adminapi } from '@/lib/fetchClient';
import { useAuthStore } from '@/app/store/authStore';

export default function CouncilHome({ councilId }) {
  const { accessToken } = useAuthStore();
  const [homeText, setHomeText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCouncilHome() {
      try {
        const res = await adminapi('/council/home', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Council-Id': councilId.toString(),
          },
        });
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert('알 수 없는 오류가 발생했습니다.');
        }
      }
    }
  
    if (accessToken) {
      fetchCouncilHome();
    }
  }, [accessToken, councilId]);
  

  if (loading) return <div>로딩 중...</div>;
  if (!homeText) return <div>데이터가 없습니다.</div>;

  return (
    <div>
      <h1>학생회 홈</h1>
      <pre>{homeText}</pre>
    </div>
  );
}
