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


export async function getAllTasks(accessToken, councilName, councilId, todoType = '', progressStatus = '') {
  if (!API_BASE) {
    throw new Error("API_BASE is not defined. Check your .env settings.");
  }

  const params = new URLSearchParams();
  if (todoType) params.append('todoType', todoType);
  if (progressStatus) params.append('progressStatus', progressStatus);

  const url = `${API_BASE}/admin/council/${councilName}/todo/list?${params.toString()}`;

  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      'X-Council-Id': councilId,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
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

export async function updateTaskStatus(accessToken, councilName, councilId, todoId, newStatus) {
  const url = `${API_BASE}/admin/council/${councilName}/todo/${todoId}/status`;

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Council-Id': councilId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ progressStatus: newStatus }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`상태 변경 실패 (${res.status}) ${msg}`);
  }

  return true;
}


export async function deleteTask(accessToken,councilName, todoId, councilId) {
  if (!API_BASE) throw new Error('API_BASE is not defined');

  const url = `${API_BASE}/admin/council/${councilName}/todo/${todoId}/delete`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'X-Council-Id': councilId,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`❌ Delete failed (${res.status}) ${msg}`);
  }

  return true;          // 필요하면 res.json() 또는 res.text()
}

// 학생회 조직 멤버 조회
export async function fetchCouncilMembers(accessToken, councilName, councilId) {
  const url = `${API_BASE}/admin/council/${councilName}/member/list`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Council-Id': councilId,
    },
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`멤버 조회 실패 (${res.status}) ${msg}`);
  }

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  return data;
}


export async function updateTask(
  accessToken,
  councilId,
  councilName,
  todoId,
  taskData,           // { title, content, dueAt, managers }
  deleteFileIds = [], // 옵션
  newFiles      = []  // 옵션(새 첨부파일)
) {
  const url = `${API_BASE}/admin/council/${councilName}/todo/${todoId}/edit`;

  // files 가 있으면 multipart, 없으면 JSON 으로 전송
  if (newFiles.length) {
    const form = new FormData();
    form.append(
      'request',
      new Blob([JSON.stringify(taskData)], { type: 'application/json' })
    );
    deleteFileIds.forEach((id) => form.append('deleteFileIds', id));
    newFiles.forEach((f) => form.append('newFiles', f));

    await fetch(url, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'X-Council-Id': councilId },
      body: form,
    });
  } else {
    const payload = { request: taskData, deleteFileIds, newFiles };
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Council-Id' : councilId,
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(payload),
    });
  }

  // 204 No‑Content일 수도 있으므로 별도 데이터는 안 돌려줌
  return true;
}