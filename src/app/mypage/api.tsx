import { adminapi } from '@/lib/fetchClient';
import { useAuthStore } from '@/stores/authStore';

export async function getCouncilHome(councilId: number, accessToken: string) {
  const res = await adminapi('/council/home', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Council-Id': councilId.toString(),
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(text); // 이후 alert로 출력
  }  
  return text;
}