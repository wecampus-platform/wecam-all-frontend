// src/app/admin/file/modals/FileUploadModal.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import CloseIcon from '@/components/icons/CloseIcon';
import FileFilters from '@/app/admin/file/fileFilters';

export default function FileUploadModal({
  isOpen,
  onClose,
  onSubmit,
  categories = [],       // 부모가 전달
  defaultCategory = '',
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState({ fileName: '', description: '', isFinal: false });
  const [selectedCategory, setSelectedCategory] = useState(''); // categoryId string

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(defaultCategory || '');
      setFileInfo({ fileName: '', description: '', isFinal: false });
      setSelectedFile(null);
    }
  }, [isOpen, defaultCategory]);

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileInfo((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleInputChange = (field, value) => {
    setFileInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    await onSubmit?.({
      file: selectedFile,
      info: {
        fileName: fileInfo.fileName,
        description: fileInfo.description,
        isFinal: fileInfo.isFinal,
        categoryId: selectedCategory ? Number(selectedCategory) : undefined,
        // sourceType은 페이지에서 FILE_ASSET 고정
      },
    });
    onClose();
  };

  const isFormValid = !!(selectedFile && fileInfo.fileName && selectedCategory);
  if (!isOpen) return null;

  return (
    <section onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-[#F5F7FA] w-3/4 max-h-3/4 h-fit px-[56px] py-[64px] flex flex-col gap-[36px] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-[36px]">
          <div className="w-full text-4xl font-semibold text-gray-900 cursor-default">새 파일 업로드하기</div>

          {/* 파일 업로드 */}
          <div className="space-y-4">
            <div className="text-lg font-semibold text-gray-800">파일을 업로드하세요</div>
            <div className="flex gap-3">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" onClick={() => fileInputRef.current?.click()}>
                파일 선택
              </button>
            </div>
            {selectedFile && (
              <p className="text-sm text-gray-500 mt-2">
                선택된 파일: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* 카테고리 선택 (메뉴 숨김) */}
          <div className="space-y-6">
            <div className="text-lg font-semibold text-gray-800">카테고리 선택</div>
            <FileFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              showMenu={false}
            />
          </div>

          {/* 파일 정보 */}
          <div className="space-y-6">
            <div className="text-lg font-semibold text-gray-800">파일 정보 입력하기</div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">파일명</label>
              <input
                type="text"
                value={fileInfo.fileName}
                onChange={(e) => handleInputChange('fileName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="파일명을 입력하세요"
              />
            </div>

            <div className="flex items-center gap-2">
              <input id="isFinal" type="checkbox" checked={fileInfo.isFinal} onChange={(e) => handleInputChange('isFinal', e.target.checked)} />
              <label htmlFor="isFinal" className="text-sm text-gray-700 select-none">최종본으로 업로드</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={fileInfo.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="3"
                placeholder="파일에 대한 설명을 입력하세요"
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${isFormValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              업로드
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-1/8 right-1/10 cursor-pointer" onClick={onClose}>
        <CloseIcon />
      </div>
    </section>
  );
}
