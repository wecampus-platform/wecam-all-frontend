const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createTask(accessToken,councilId, councilName, taskData, file) {
  const url = `${API_BASE}/admin/council/${councilName}/todo/${councilId}/create`;

  const formData = new FormData();

  // JSON → Blob
  const jsonBlob = new Blob([JSON.stringify(taskData)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);

  // 파일 있으면 추가
  if (file) {
    formData.append("files", file); // name="files"는 백엔드가 요구한 그대로
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Council-Id': councilId,
      // ❌ 'Content-Type': multipart 직접 설정하지 말기!
    },
    body: formData,
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const body = isJson ? await res.json() : await res.text();

  console.log("📬 응답 코드:", res.status);
  console.log("📋 응답 내용:", body);

  return { status: res.status, body };
}


export async function getAllTasks(accessToken,councilName, councilId) {
  if (!API_BASE) {
    throw new Error("API_BASE is not defined. Check your .env settings.");
  }
  console.log("API_BASE:", API_BASE);
  const url =`${API_BASE}/admin/council/${councilName}/todo/list`
  
  const res = await fetch(url, {
    cache: 'no-store', // 항상 fresh data
    headers: {
      'X-Council-Id': councilId,
      'Authorization': `Bearer ${accessToken}`
    },
  });
  
  const data = await res.json(); // ✅ 여기서만 한 번만 호출
  console.log("📦 받은 데이터:", data);
  return data;
  
}

export async function getTaskDetail(accessToken,councilName, todoId,councilId) {

  const url =`${API_BASE}/admin/council/${councilName}/todo/${todoId}`

  const res = await fetch(url,{
    headers: {
      'X-Council-Id': councilId,
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  if (!res.ok) throw new Error('Task detail fetch failed');
  return res.json();
}