'use client';

import { adminapi } from '@/lib/fetchClient';

function buildQuery(params = {}) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    sp.append(k, String(v));
  });
  const s = sp.toString();
  return s ? `?${s}` : '';
}

function parsePage(body) {
  if (body && typeof body === 'object' && Array.isArray(body.content)) {
    return {
      items: body.content,
      page: body.number ?? 0,
      size: body.size ?? body.pageable?.pageSize ?? 0,
      totalElements: body.totalElements ?? 0,
      totalPages: body.totalPages ?? 0,
      first: !!body.first,
      last: !!body.last,
      numberOfElements: body.numberOfElements ?? body.content.length,
    };
  }
  if (Array.isArray(body)) {
    return {
      items: body,
      page: 0,
      size: body.length,
      totalElements: body.length,
      totalPages: 1,
      first: true,
      last: true,
      numberOfElements: body.length,
    };
  }
  return {
    items: [],
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    numberOfElements: 0,
  };
}

/** 서버 아이템 → 1차 매핑(원본 raw 보관) */
function mapFileAssetItem(it = {}) {
  return {
    id: it.fileId ?? it.id ?? it.assetId,
    fileName: it.fileName ?? it.title ?? it.originalName ?? '—',
    sourceType: it.sourceType ?? null, // 'TODO'|'MEETING'|'FILE_ASSET'|null
    category: Array.isArray(it.categoryNames) && it.categoryNames.length
      ? it.categoryNames[0]
      : (it.categoryName ?? '—'),
    uploader: it.uploaderName ?? it.createdByName ?? '—',
    uploadDate: it.uploadedAt ?? it.createdAt ?? new Date().toISOString(),
    fileSize: it.size ?? it.fileSize ?? 0,
    description: it.description ?? it.sourceTitle ?? '',
    downloadUrl: it.downloadUrl ?? it.url ?? '#',
    raw: it,
  };
}

/** 업로드 (파일 + form(JSON)) */
export async function uploadFileAsset({ councilName, file, form = {} }) {
  if (!councilName) throw new Error('councilName이 없습니다.');
  if (!file) throw new Error('파일이 선택되지 않았습니다.');

  const fd = new FormData();
  if (Array.isArray(file)) file.filter(Boolean).forEach((f) => fd.append('file', f));
  else fd.append('file', file);
    console.log("upload API categoryIds:",form.categoryIds)
  const safeForm = {
    categoryIds: Array.isArray(form.categoryIds) ? form.categoryIds : [],
    isFinal: !!form.isFinal,
    // isFinal: !!form.isFinal, -> 나중에 requestFinal로 바꿔야 됨. 
    description: form.description || '',
  };
  fd.append('form', new Blob([JSON.stringify(safeForm)], { type: 'application/json' })); // ← filename 제거
  console.log("safeform: ",safeForm)
  const res = await adminapi(`/council/${encodeURIComponent(councilName)}/fileAsset/create`, {
    method: 'POST',
    body: fd, // Content-Type 자동 설정
  });

  const ct = res.headers.get('content-type') || '';
  const body = ct.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) throw new Error(typeof body === 'string' ? body : (body?.message || '파일 업로드 실패'));
  return { ok: true, status: res.status, body };
}

/** 리스트 조회 (페이지 파싱 + 1차 매핑) */
export async function fetchFileAssets({ councilName, params = {} }) {
  if (!councilName) throw new Error('councilName이 없습니다.');
  const url = `/council/${encodeURIComponent(councilName)}/fileAsset${buildQuery(params)}`;

  const res = await adminapi(url, { method: 'GET' });
  let body;
  try { body = await res.json(); } catch { body = []; }

  const page = parsePage(body);
  const items = page.items.map(mapFileAssetItem);
  console.log(items)
  return { ok: res.ok, status: res.status, page: { ...page, items } };
}

/** 삭제 */
export async function deleteFileAsset({ councilName, fileAssetId }) {
  const res = await adminapi(`/council/${encodeURIComponent(councilName)}/fileAsset/${fileAssetId}/delete`, {
    method: 'DELETE',
  });
  const ct = res.headers.get('content-type') || '';
  const body = ct.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) throw new Error(typeof body === 'string' ? body : (body?.message || '삭제 실패'));
  return { ok: true, status: res.status, body };
}

/** 최종본 처리 */
export async function finalizeFileAsset({ councilName, fileAssetId }) {
  const res = await adminapi(`/council/${encodeURIComponent(councilName)}/fileAsset/${fileAssetId}/finalize`, {
    method: 'PATCH',
  });
  const ct = res.headers.get('content-type') || '';
  const body = ct.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) throw new Error(typeof body === 'string' ? body : (body?.message || '최종본 처리 실패'));
  return { ok: true, status: res.status, body };
}
