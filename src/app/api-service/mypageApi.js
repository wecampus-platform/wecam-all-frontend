import { adminapi } from '@/lib/fetchClient';

export async function fetchCouncilHome(councilId, accessToken) {
  const res = await adminapi('/council/home', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Council-Id': councilId.toString(),
    },
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || '학생회 홈 정보 불러오기 실패');
  }

  return text;
}