'use client';

import CloseIcon from '@/components/icons/CloseIcon';

export default function FileDetailModal({ isOpen, onClose, file, onFinalize, onDelete }) {
  if (!isOpen || !file) return null;

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
            파일 상세 정보
          </div>

          {/* 파일 기본 정보 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">파일명</label>
              <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded cursor-default">
                {file.fileName}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메뉴</label>
              <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded cursor-default">
                {file.menu}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
              <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded cursor-default">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {file.category}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
              <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded cursor-default">
                <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                  file.status === '승인됨' 
                    ? 'bg-green-100 text-green-800'
                    : file.status === '검토중'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {file.status}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">파일 업로더</label>
              <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded cursor-default">
                {file.uploader}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">업로드 일자</label>
              <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded cursor-default">
                {formatDate(file.uploadDate)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">파일 크기</label>
              <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded cursor-default">
                {formatFileSize(file.fileSize)}
              </div>
            </div>
          </div>

          {/* 파일 설명 */}
          {file.description && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded cursor-default min-h-[100px] whitespace-pre-wrap">
                {file.description}
              </div>
            </div>
          )}

          {/* 파일 다운로드 링크 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">파일 다운로드</label>
            <a
              href={file.downloadUrl}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              download
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              파일 다운로드
            </a>
          </div>

          {/* 하단 버튼 */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              닫기
            </button>
            <button
              onClick={onDelete}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              삭제하기
            </button>
            <button
              onClick={onFinalize}
              disabled={file.status === '승인됨'}
              className={`px-6 py-2 rounded-lg transition-colors ${
                file.status === '승인됨'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              최종 문서 등록 요청하기
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
