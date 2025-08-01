'use client';

import { useState } from 'react';

const REJECT_REASONS = [
  '증명서의 발급일자가 유효하지 않습니다. 올해 내 발급된 증명서여야 합니다.',
  '증명서에 직인이 존재하지 않습니다.',
  '올바른 증명서가 아닙니다.',
  '입력 정보와 증명서 상의 학교명이 일치하지 않습니다.',
  '입력 정보와 증명서 상의 소속이 일치하지 않습니다.',
];

export default function RejectReasonModal({ isOpen, onClose, onConfirm }) {
  const [checked, setChecked] = useState(Array(REJECT_REASONS.length).fill(false));
  const [etcChecked, setEtcChecked] = useState(false);
  const [etcReason, setEtcReason] = useState('');

  if (!isOpen) return null;

  const handleCheckboxToggle = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const handleConfirm = () => {
    let selectedReasons = REJECT_REASONS.filter((_, i) => checked[i]);
    if (etcChecked && etcReason.trim()) selectedReasons.push(etcReason.trim());
    const reason = selectedReasons.join(', ');
    onConfirm(reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[642px] h-[533px] bg-white rounded-lg relative p-6 flex flex-col gap-4">
        {/* 안내 문구 */}
        <div className="w-full py-4 bg-rose-100 rounded-xl flex justify-center items-center">
          <span className="text-red-500 text-xs font-semibold">
            다른 항목 이름: 입력값과 증명서 상 표기가 다릅니다.
          </span>
        </div>

        {/* 타이틀 */}
        <div className="text-xs text-neutral-500 font-semibold text-center">
          아래에서 학생에게 보낼 거절 사유를 선택하세요 (중복 선택 가능)
        </div>

        {/* 체크박스 리스트 */}
        <div className="flex flex-col gap-4 px-4 overflow-y-auto max-h-[300px]">
          {REJECT_REASONS.map((text, idx) => (
            <label key={idx} className="flex gap-3 items-center">
              <input
                type="checkbox"
                checked={checked[idx]}
                onChange={() => handleCheckboxToggle(idx)}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-base font-semibold text-zinc-800">{text}</span>
            </label>
          ))}

          {/* 기타 */}
          <div className="flex flex-col gap-2">
            <label className="flex gap-3 items-center">
              <input
                type="checkbox"
                checked={etcChecked}
                onChange={() => setEtcChecked(!etcChecked)}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-base font-semibold text-zinc-800">기타</span>
            </label>
            {etcChecked && (
              <input
                type="text"
                className="w-full p-3 bg-white rounded-lg border border-zinc-300 text-sm"
                placeholder="사유를 직접 입력해주세요."
                value={etcReason}
                onChange={(e) => setEtcReason(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* 버튼 */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          <button
            onClick={handleConfirm}
            className="px-3 py-2 bg-red-500 text-white rounded text-base font-bold"
          >
            거절 확정하기
          </button>
          <button
            onClick={onClose}
            className="px-3 py-2 bg-white text-zinc-400 border border-zinc-400 rounded text-base font-bold"
          >
            이전
          </button>
        </div>
      </div>
    </div>
  );
}