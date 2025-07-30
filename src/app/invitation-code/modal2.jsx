'use client';
import { useState } from 'react';

const Modal2 = ({ onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [checked, setChecked] = useState(false);

  const TabBtn = (key, label) => (
    <button
      onClick={() => setActiveTab(key)}
      className={`px-4 py-2 transition
        ${activeTab === key
          ? 'text-[rgba(59,130,246,1)] border-b-2 border-[rgba(59,130,246,1)]' 
          : 'text-gray-400 hover:text-gray-600'}
      `}
    >
      {label}
    </button>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-90 bg-opacity-80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white p-8 rounded-xl shadow-md w-[642px] max-w-2xl mx-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>
        
        {/* ── 탭 바 ─────────────────────── */}
        <div className="flex mb-6 border-b border-gray-300 text-sm font-medium gap-6">
          {TabBtn('general', '일반 학생용')}
          {TabBtn('council', '학생회 초대용')}
        </div>

        {/* ── 설명 영역 ────────────────── */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            {activeTab === 'general'
              ? '일반 학생용 초대코드 생성하기'
              : '학생회 초대용 초대코드 생성하기'}
          </h2>
          <p className="text-sm text-gray-500">
            {activeTab === 'general'
              ? '일반 학생이 간편하게 소속 인증을 받을 수 있도록 발급하는 코드입니다.'
              : '학생회 권한을 부여하기 위한 인증용 코드입니다.'}
          </p>
        </div>

        {/* ── 정보 박스 ─────────────────── */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-sm space-y-4">
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-sm space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">대학</span>
              <span className="text-gray-800 font-medium">위캠대학교</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">단과대학</span>
              <span className="text-gray-800 font-medium">정보의생명공학대학</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">학과/학부</span>
              <span className="text-gray-800 font-medium">정보컴퓨터공학부</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">전공</span>
              <span className="text-gray-800 font-medium">인공지능전공</span>
            </div>
          </div>
        </div>

        {/* ── 체크박스 ─────────────────── */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="confirm"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="w-4 h-4 rounded border-gray-300 text-[rgba(59,130,246,1)] focus:ring-[rgba(59,130,246,1)]"
          />
          <label htmlFor="confirm" className="text-sm text-gray-700 cursor-pointer">
            초대 코드 생성 대상을 확인했습니다.
          </label>
        </div>

        {/* ── 버튼 ─────────────────────── */}
        <div className="flex justify-center">
          <button
            className={`p-2 rounded-md w-[200px] text-white text-base font-semibold ${
              checked
                ? 'bg-[rgba(59,130,246,1)] hover:bg-[rgba(59,130,246,0.8)]'
                : 'bg-zinc-400 cursor-not-allowed'
            }`}
            disabled={!checked}
            onClick={() => {
              if (checked && onSuccess) {
                onSuccess({
                  codeType: activeTab === 'general' ? '일반 학생용' : '학생회 초대용',
                  invitationCode: 'A3a1bb', // 실제로는 API에서 받은 코드
                  expiryDate: '2025.07.15',
                  expiryTime: '23:59:00'
                });
              }
            }}
          >
            초대코드 생성하기
          </button>
        </div>
      </div>


    </div>
  );
};

export default Modal2;
