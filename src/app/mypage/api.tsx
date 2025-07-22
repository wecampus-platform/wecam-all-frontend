import { adminapi } from '@/lib/fetchClient';

export async function getCouncilHome(councilId: number, accessToken: string) {
  const res = await adminapi('/council/home', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Council-Id': councilId.toString(),
    },
  });

  if (!res.ok) {
    const text = await res.text(); // ❗ 일반 텍스트일 수도 있으니 이렇게 받기
    throw new Error(text); // 이후 alert로 출력
  }

  const text = await res.text();

  return await text;
}