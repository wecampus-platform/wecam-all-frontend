// src/app/admin/file/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/app/admin/AdminLayout';
import { Search } from '@/components/search';
import FileFilters from '@/app/admin/file/fileFilters';
import FileUploadModal from './modals/FileUploadModal';
import FileDetailModal from './modals/FileDetailModal';
import {getCategoryList } from '@/api-service/meetingApi';
import { useAuthStore } from '@/store/authStore';
import { fetchFileAssets, uploadFileAsset } from '@/api-service/adminFileApi';

// sourceType → 라벨
const SOURCE_LABEL = { TODO: '할일', MEETING: '회의록', FILE_ASSET: '파일운영함' };
const toMenuLabel = (s) => SOURCE_LABEL[s] ?? '파일운영함';

// 서버 아이템 → UI 아이템
function mapFileItem(it = {}) {
  const raw = it.raw ?? it; // raw가 없으면 it 자체를 백업처럼 사용

  // sourceType 우선순위
  const sourceType = it.sourceType ?? raw.sourceType ?? null;
  console.log("raw",raw)
  // 카테고리명: raw.categoryNames[0] → raw.categoryName → it.category
  const categoryName =
    (Array.isArray(raw?.categoryNames) && raw.categoryNames.length ? raw.categoryNames[0] : null) ??
    raw?.categoryNames ??
    it.category ??
    '—';

  // 업로더: it.uploader(1차 매핑) → raw.uploaderName → raw.createdByName → it.createdBy
  const uploader =
    it.uploader ??
    raw?.uploaderName ??
    raw?.createdByName ??
    it.createdBy ??
    '—';

  // 날짜: it.uploadDate(1차 매핑) → raw.uploadedAt → it.createdAt → raw.createdAt
  const uploadDate =
    it.uploadDate ??
    raw?.uploadedAt ??
    it.createdAt ??
    raw?.createdAt ??
    new Date().toISOString();

  // 파일 크기
  const fileSize = it.fileSize ?? it.size ?? raw?.size ?? 0;

  return {
    id: it.id ?? it.fileAssetId ?? it.assetId ?? raw?.fileId ?? Math.random().toString(36).slice(2),
    fileName: it.fileName ?? it.title ?? raw?.fileName ?? raw?.originalName ?? '—',
    sourceType,
    menuLabel: toMenuLabel(sourceType),
    categoryName,                // ← 렌더에서 이 키를 사용
    uploader,                    // ← 렌더에서 이 키를 사용
    uploadDate,
    fileSize,
    description: it.description ?? raw?.sourceTitle ?? '',
    downloadUrl: it.downloadUrl ?? raw?.downloadUrl ?? raw?.url ?? '#',
    raw,                         // 원본 보관
  };
}


export default function FileManagementPage() {
  const { councilName } = useAuthStore();

  // 검색어
  const [inputValue, setInputValue] = useState('');

  // 필터 (회의록 패턴과 동일: value 문자열)
  const [selectedCategory, setSelectedCategory] = useState(''); // '' | categoryId string
  const [selectedMenu, setSelectedMenu] = useState('');         // '' | 'TODO'|'MEETING'|'FILE_ASSET'

  // 데이터
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // 페이지네이션
  const [pageMeta, setPageMeta] = useState({ page: 0, size: 24, totalPages: 0, totalElements: 0 });

  // 모달
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // 카테고리 로드
  const fetchCategories = async () => {
    if (!councilName) return;
    try {
      const data = await getCategoryList(councilName);
      setCategories(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('카테고리 목록 조회 실패:', e);
      setCategories([]);
    }
  };

  // 파일 목록 로드
  const fetchFiles = async (page = 0) => {
    if (!councilName) return;
    setLoading(true);
    try {
      const { ok, page: p } = await fetchFileAssets({
        councilName,
        params: {
          page,
          size: pageMeta.size,
          q: inputValue || undefined,
          categoryId: selectedCategory || undefined,
          sourceType: selectedMenu || undefined,
        },
      });

      if (!ok) {
        setFiles([]);
        setPageMeta((m) => ({ ...m, page: 0, totalPages: 0, totalElements: 0 }));
        return;
      }

      const mapped = (p.items || []).map(mapFileItem);
      setFiles(mapped);
      setPageMeta((m) => ({
        ...m,
        page: p.page ?? 0,
        totalPages: p.totalPages ?? 0,
        totalElements: p.totalElements ?? mapped.length,
      }));
    } catch (e) {
      console.error('파일 목록 조회 실패:', e);
      setFiles([]);
      setPageMeta((m) => ({ ...m, page: 0, totalPages: 0, totalElements: 0 }));
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    if (councilName) {
      fetchCategories();
      fetchFiles(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [councilName]);

  // 필터 변경 시 재조회
  useEffect(() => {
    fetchFiles(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedMenu]);

  // 검색
  const handleSearchClick = () => fetchFiles(0);

  // 업로드 완료 시 새로고침
  const handleFileUpload = async ({ file, info }) => {
    // modal의 카테고리명 → ID 매핑
    const nameFromModal = info?.category || '';
    const found = categories.find((c) => c.categoryName === nameFromModal);
      const categoryIds = info?.categoryId
      ? [Number(info.categoryId)]
      : selectedCategory
      ? [Number(selectedCategory)]
      : [];

    const form = {
      categoryIds,
      isFinal: !!info?.isFinal,
      title: info?.fileName || (Array.isArray(file) ? file[0]?.name : file?.name),
      description: info?.description || '',
    };

    const { ok } = await uploadFileAsset({ councilName, file, form });
    if (ok) {
      setShowUploadModal(false);
      fetchFiles(0);
    } else {
      alert('업로드에 실패했습니다.');
    }
  };

  // 유틸
  const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return '—';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };
  const formatDate = (d) =>
    new Date(d).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <AdminLayout
      title="학생회 파일함"
      actionButton={
        <button
          className="button-common w-[200px] h-[50px] flex items-center justify-center"
          onClick={() => setShowUploadModal(true)}
        >
          + 새 파일 업로드하기
        </button>
      }
      additionalContent={
        <div className="flex gap-2">
          <Search
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSearchClick={handleSearchClick}
            placeholder="파일명, 업로더 등으로 검색하세요."
          />
        </div>
      }
      mainContent={
        <div className="w-full">
          {/* 필터 바 (회의록과 동일 UX) */}
          <div className="flex items-center justify-between mb-6">
            <FileFilters
              selectedCategory={selectedCategory}
              selectedMenu={selectedMenu}
              onCategoryChange={setSelectedCategory}
              onMenuChange={setSelectedMenu}
              categories={categories}
            />
          </div>

          {/* 리스트 */}
          <div className="bg-white rounded-lg p-6 w-full">
            {/* 헤더 */}
            <div className="grid grid-cols-6 gap-4 pb-4 border-b border-gray-200 mb-4">
              <div className="col-span-2 font-semibold text-gray-700">메뉴 / 파일명</div>
              <div className="font-semibold text-gray-700">카테고리</div>
              <div className="font-semibold text-gray-700">파일 업로더</div>
              <div className="font-semibold text-gray-700">업로드 일자</div>
              <div className="font-semibold text-gray-700">파일 크기</div>
            </div>

            {/* 바디 */}
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-600">로딩 중...</div>
              </div>
            ) : files.length > 0 ? (
              <>
                {files.map((f) => (
                  <div
                    key={f.id}
                    className="grid grid-cols-6 gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedFile(f);
                      setShowDetailModal(true);
                    }}
                  >
                    <div className="col-span-2">
                      <div className="text-sm text-gray-500 mb-1">{f.menuLabel}</div>
                      <div className="font-medium text-gray-900">{f.fileName}</div>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {f.categoryName}
                      </span>
                    </div>
                    <div className="text-gray-700">{f.uploader}</div>
                    <div className="text-gray-700">{formatDate(f.uploadDate)}</div>
                    <div className="text-gray-700">{formatFileSize(f.fileSize)}</div>
                  </div>
                ))}

                {/* 페이지네이션 */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    {pageMeta.totalElements}개 중 {pageMeta.page + 1} / {Math.max(pageMeta.totalPages, 1)} 페이지
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 border rounded disabled:opacity-50"
                      onClick={() => fetchFiles(Math.max(0, pageMeta.page - 1))}
                      disabled={pageMeta.page <= 0}
                    >
                      이전
                    </button>
                    <button
                      className="px-3 py-1 border rounded disabled:opacity-50"
                      onClick={() => fetchFiles(pageMeta.page + 1)}
                      disabled={pageMeta.page + 1 >= pageMeta.totalPages}
                    >
                      다음
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">등록된 파일이 없습니다.</div>
            )}
          </div>

          {/* 업로드 모달 */}
          <FileUploadModal
            isOpen={showUploadModal}
            onClose={() => setShowUploadModal(false)}
            categories = {categories}
            onSubmit={handleFileUpload}
          />

          {/* 상세 모달 */}
          <FileDetailModal
            isOpen={showDetailModal}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedFile(null);
            }}
            file={selectedFile}
          />
        </div>
      }
    />
  );
}
