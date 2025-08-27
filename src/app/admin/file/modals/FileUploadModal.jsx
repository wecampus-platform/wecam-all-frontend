'use client';

import { useState } from 'react';
import CloseIcon from '@/components/icons/CloseIcon';

export default function FileUploadModal({ isOpen, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState({
    fileName: '',
    category: '',
    menu: '',
    description: ''
  });

  const categories = ['공지사항', '회의록', '예산서', '활동보고서', '기타'];
  const menus = ['공지 관리', '할 일 관리', '소속 인증 관리', '구성원 관리', '초대코드 생성'];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileInfo(prev => ({ ...prev, fileName: file.name }));
    }
  };

  const handleInputChange = (field, value) => {
    setFileInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // TODO: 파일 업로드 API 호출
    console.log('File upload:', { file: selectedFile, info: fileInfo });
    onClose();
  };

  const isFormValid = selectedFile && fileInfo.fileName && fileInfo.category && fileInfo.menu;

  if (!isOpen) return null;

  return (
    <section
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        className="relative bg-[#F5F7FA] w-3/4 max-h-3/4 h-fit px-[56px] py-[64px] flex flex-col gap-[36px] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 내용 */}
        <div className="flex flex-col gap-[36px]">
          {/* 제목 */}
          <div className="w-full text-4xl font-semibold text-gray-900 cursor-default">
            새 파일 업로드하기
          </div>

                    {/* 파일 업로드 섹션 */}
          <div className="space-y-4">
            <div className="text-lg font-semibold text-gray-800">파일을 업로드하세요</div>
            <div className="flex gap-3">
              <input
                type="file"
                onChange={handleFileSelect}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => document.querySelector('input[type="file"]').click()}
              >
                파일 선택
              </button>
            </div>
            {selectedFile && (
              <p className="text-sm text-gray-500 mt-2">
                선택된 파일: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* 파일 정보 입력 */}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
              <select
                value={fileInfo.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">카테고리를 선택하세요</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메뉴</label>
              <select
                value={fileInfo.menu}
                onChange={(e) => handleInputChange('menu', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">메뉴를 선택하세요</option>
                {menus.map((menu) => (
                  <option key={menu} value={menu}>{menu}</option>
                ))}
              </select>
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
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isFormValid
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              업로드
            </button>
          </div>
        </div>
      </div>
      
      {/* CloseIcon - MeetingDetailModal과 동일한 위치 */}
      <div
        className="absolute top-1/8 right-1/10 cursor-pointer"
        onClick={onClose}
      >
        <CloseIcon />
      </div>
    </section>
  );
}
