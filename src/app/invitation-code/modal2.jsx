'use client';
import { useState } from 'react';

const Modal2 = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-[642px] max-w-2xl mx-auto">
      {/* 탭 바 */}
      <div className="flex mb-6 border-b border-gray-300 text-sm font-medium">
        <div className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">
          일반 학생용
        </div>
        <div className="px-4 py-2 text-gray-400 ml-6">
          학생회 초대용
        </div>
      </div>

      {/* 설명 영역 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">일반 학생용 초대코드 생성하기</h2>
        <p className="text-sm text-gray-500">
          일반 학생이 간편하게 소속 인증을 받을 수 있도록 발급하는 코드입니다.
        </p>
      </div>

      {/* 정보 박스 */}
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

      {/* 체크박스 */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="confirm"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="confirm" className="text-sm text-gray-700 cursor-pointer">
          초대 코드 생성 대상을 확인했습니다.
        </label>
      </div>

      {/* 버튼 */}
      <div className="items-center justify-center flex">
        <button
          className={`p-2 rounded-md w-[200px] text-white text-base font-semibold ${
            checked
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-zinc-400 cursor-not-allowed'
          }`}
          disabled={!checked}
          onClick={() => {
            if (checked) alert('✅ 초대 코드가 생성되었습니다!');
          }}
        >
          초대코드 생성하기
        </button>
      </div>
    </div>
  );
};

export default Modal2;
