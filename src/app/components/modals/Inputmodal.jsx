'use client';
import { useState } from 'react';

export default function InputModal({
  title = '제목',
  label = '입력하세요',
  placeholder = '',
  confirmText = '확인',
  cancelText = '취소',
  errorMessage = '',
  value,
  setValue,
  onConfirm,
  onCancel,
  isError = false,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] flex flex-col gap-4">
        <h2 className="text-lg font-bold">{title}</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm">{label}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className={`w-full border rounded-md px-3 py-2 ${isError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {isError && <p className="text-xs text-red-500">{errorMessage}</p>}
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 rounded-md bg-gray-200 text-gray-600"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2 rounded-md bg-point text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
