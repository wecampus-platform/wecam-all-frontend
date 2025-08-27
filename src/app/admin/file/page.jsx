'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import AdminLayout from '../AdminLayout';
import { Search } from '@/components/search';
import CustomDropdown from '@/components/drop-down';
import FileUploadModal from './modals/FileUploadModal';
import FileDetailModal from './modals/FileDetailModal';

// 임시 파일 데이터 (실제로는 API에서 가져올 예정)
const mockFiles = [
  {
    id: 1,
    fileName: '2024년 1학기 학생회 예산서.pdf',
    menu: '할 일 관리',
    category: '예산서',
    status: '검토중',
    uploader: '김학생',
    uploadDate: '2024-03-15',
    fileSize: 2048576, // 2MB
    description: '2024년 1학기 학생회 활동 예산 계획서입니다.',
    downloadUrl: '#'
  },
  {
    id: 2,
    fileName: '3월 정기회의록.docx',
    menu: '공지 관리',
    category: '회의록',
    status: '승인됨',
    uploader: '이학생',
    uploadDate: '2024-03-10',
    fileSize: 1048576, // 1MB
    description: '3월 정기 회의에서 논의된 내용을 정리한 회의록입니다.',
    downloadUrl: '#'
  },
  {
    id: 3,
    fileName: '학생회 활동보고서.pptx',
    menu: '구성원 관리',
    category: '활동보고서',
    status: '검토중',
    uploader: '박학생',
    uploadDate: '2024-03-08',
    fileSize: 5242880, // 5MB
    description: '2024년 1학기 학생회 주요 활동 내용을 정리한 보고서입니다.',
    downloadUrl: '#'
  }
];

export default function FileManagementPage() {
  const { accessToken, councilList } = useAuthStore();
  const [files, setFiles] = useState(mockFiles);
  const [filteredFiles, setFilteredFiles] = useState(mockFiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // 드롭다운 옵션
  const categoryOptions = [
    { id: 1, name: "전체" },
    { id: 2, name: "공지사항" },
    { id: 3, name: "회의록" },
    { id: 4, name: "예산서" },
    { id: 5, name: "활동보고서" },
    { id: 6, name: "기타" },
  ];

  const menuOptions = [
    { id: 1, name: "전체" },
    { id: 2, name: "공지 관리" },
    { id: 3, name: "할 일 관리" },
    { id: 4, name: "소속 인증 관리" },
    { id: 5, name: "구성원 관리" },
    { id: 6, name: "초대코드 생성" },
  ];

  // 검색 및 필터링 적용
  useEffect(() => {
    let result = files;

    // 검색어 필터링
    if (searchTerm) {
      result = result.filter(file => 
        file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.uploader.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 카테고리 필터링
    if (selectedCategory) {
      result = result.filter(file => file.category === selectedCategory);
    }

    // 메뉴 필터링
    if (selectedMenu) {
      result = result.filter(file => file.menu === selectedMenu);
    }

    setFilteredFiles(result);
  }, [files, searchTerm, selectedCategory, selectedMenu]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleMenuChange = (menu) => {
    setSelectedMenu(menu);
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setShowDetailModal(true);
  };

  const handleFileUpload = (fileData) => {
    // TODO: 실제 API 호출
    const newFile = {
      id: Date.now(),
      fileName: fileData.fileName,
      menu: fileData.menu,
      category: fileData.category,
      status: '검토중',
      uploader: '현재 사용자', // TODO: 실제 사용자 정보
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: fileData.file.size,
      description: fileData.description,
      downloadUrl: '#'
    };
    
    setFiles(prev => [newFile, ...prev]);
    setShowUploadModal(false);
  };

  const handleFileDelete = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    setShowDetailModal(false);
    setSelectedFile(null);
  };

  const handleFileFinalize = (fileId) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, status: '승인됨' } : file
    ));
    setShowDetailModal(false);
    setSelectedFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <>
      <AdminLayout
        title="학생회 파일함"
        description="학생회의 파일을 관리합니다"
        actionButton={
          <button
            className="button-common w-[200px] h-[50px] flex items-center justify-center gap-2"
            onClick={() => setShowUploadModal(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            새 파일 업로드하기
          </button>
        }
        additionalContent={
          <div className="flex flex-col gap-8">
            {/* 검색 섹션 */}
            <Search 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearchClick={() => handleSearch(searchTerm)}
              placeholder="파일의 이름이나 파일 업로더를 입력하세요"
            />

            {/* 필터 섹션 */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">카테고리별 필터:</span>
                <CustomDropdown
                  key="category-filter"
                  options={categoryOptions}
                  placeholder="카테고리 선택"
                  onSelect={(option) => handleCategoryChange(option.name === "전체" ? "" : option.name)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">메뉴 필터:</span>
                <CustomDropdown
                  key="menu-filter"
                  options={menuOptions}
                  placeholder="메뉴 선택"
                  onSelect={(option) => handleMenuChange(option.name === "전체" ? "" : option.name)}
                />
              </div>
            </div>
          </div>
        }
        mainContent={
          <div className="bg-white rounded-lg p-6 w-full">
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-6 gap-4 pb-4 border-b border-gray-200 mb-4">
              <div className="col-span-2 font-semibold text-gray-700">메뉴 / 파일명</div>
              <div className="font-semibold text-gray-700">카테고리</div>
              <div className="font-semibold text-gray-700">파일 업로더</div>
              <div className="font-semibold text-gray-700">업로드 일자</div>
              <div className="font-semibold text-gray-700">파일 크기</div>
            </div>

            {/* 파일 행들 */}
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="grid grid-cols-6 gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleFileClick(file)}
                >
                  {/* 메뉴 / 파일명 */}
                  <div className="col-span-2">
                    <div className="text-sm text-gray-500 mb-1">{file.menu}</div>
                    <div className="font-medium text-gray-900">{file.fileName}</div>
                  </div>
                  
                  {/* 카테고리 */}
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {file.category}
                    </span>
                  </div>
                  
                  {/* 파일 업로더 */}
                  <div className="text-gray-700">{file.uploader}</div>
                  
                  {/* 업로드 일자 */}
                  <div className="text-gray-700">{formatDate(file.uploadDate)}</div>
                  
                  {/* 파일 크기 */}
                  <div className="text-gray-700">{formatFileSize(file.fileSize)}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                {searchTerm || selectedCategory || selectedMenu 
                  ? '검색 결과가 없습니다.' 
                  : '등록된 파일이 없습니다.'}
              </div>
            )}
          </div>
        }
      />

      {/* 파일 업로드 모달 */}
      <FileUploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSubmit={handleFileUpload}
      />

      {/* 파일 상세 정보 모달 */}
      <FileDetailModal 
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedFile(null);
        }}
        file={selectedFile}
        onFinalize={() => selectedFile && handleFileFinalize(selectedFile.id)}
        onDelete={() => selectedFile && handleFileDelete(selectedFile.id)}
      />
    </>
  );
}
