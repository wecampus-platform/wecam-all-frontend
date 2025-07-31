import { adminapi, clientapi } from '@/lib/fetchClient';

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

// 사용자 정보 조회
export async function fetchUserInfo() {
  const res = await clientapi('/user/mypage', {
    method: 'GET',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '사용자 정보 불러오기 실패');
  }

  return data;
}