import Link from 'next/link';
import { ContentItem } from '@/types/types';
import { useState } from 'react';

const academicStatusOptions = [
  { label: '재학 중', value: 'ENROLLED' },
  { label: '휴학', value: 'ON_LEAVE' },
];

const gradeOptions = [
  { label: '#학년', value: '0' },
  { label: '1학년', value: 1 },
  { label: '2학년', value: 2 },
  { label: '3학년', value: 3 },
  { label: '4학년', value: 4 },
  { label: '5학년', value: 5 },
];



export default function MyPageBox({ title, contents, blurred = false, onVerifyClick , onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [localData, setLocalData] = useState(contents);
  
    const handleChange = (index, value) => {
      const newData = [...localData];
      newData[index] = { ...newData[index], body: value };
      setLocalData(newData);
    };
    
    const handleSave = () => {
      if (onSave) onSave(localData); // 부모로 먼저 저장 요청
      setTimeout(() => {
        setIsEditing(false);
      }, 0); // 상태 업데이트 완료 직후에 렌더링 반영
    };

    return (
      <div className="border border-[#D8DADD] rounded-lg overflow-hidden w-full shadow-sm mb-6 relative">
        <div className="bg-point text-white px-4 py-3 font-bold text-lg flex justify-between items-center">
          <span>{title}</span>
          {onVerifyClick && (
            <button
              onClick={() => {
                if (isEditing) handleSave();
                else setIsEditing(true);
              }}
              className="bg-white text-point text-sm px-3 py-1 rounded font-medium"
            >
              {isEditing ? '수정완료' : '수정하기'}
            </button>
          )}
        </div>
  
        {blurred && (
          <>
            <div className="absolute top-[48px] bottom-0 left-0 right-0 backdrop-blur-sm bg-white/50 z-0" />
            <div className="absolute top-[48px] bottom-0 left-0 right-0 flex flex-col items-center justify-center z-10 space-y-2">
              <p className="text-sm text-center font-medium">소속 인증이 필요합니다.</p>
              <button
                onClick={onVerifyClick}
                className="bg-point text-white text-sm px-4 py-1.5 rounded transition"
              >
                소속 인증하러 가기
              </button>
            </div>
          </>
        )}
  
        <div className={blurred ? 'pointer-events-none select-none' : ''}>
          {Array.isArray(localData) &&
            localData.map((item, idx) => {
              const isEditable =
                item.subtitle === '학번' ||
                item.subtitle === '학년' ||
                item.subtitle === '학적 상태' ||
                item.subtitle === '이름';
  
              const commonStyle =
                'bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 w-full';
  
              return (
                <div
                  key={idx}
                  className="flex justify-between items-center px-4 py-3 border-t border-gray-200 bg-gray-50"
                >
                  <div className="text-gray-700 font-medium whitespace-nowrap w-[110px]">{item.subtitle}</div>
  
                  <div className="text-gray-600 flex-1 text-right break-words">
                    {isEditing && isEditable ? (
                      item.subtitle === '학년' ? (
                        <select
                          value={item.body}
                          onChange={(e) => handleChange(idx, e.target.value)}
                          className={commonStyle}
                        >
                          {gradeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : item.subtitle === '학적 상태' ? (
                        <select
                          value={item.body}
                          onChange={(e) => handleChange(idx, e.target.value)}
                          className={commonStyle}
                        >
                          {academicStatusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={item.body}
                          onChange={(e) => handleChange(idx, e.target.value)}
                          className={commonStyle}
                        />
                      )
                    ) : (
                      item.subtitle === '학적 상태'
                      ? academicStatusOptions.find((opt) => opt.value === item.body)?.label || item.body
                      : item.subtitle === '학년'
                        ? gradeOptions.find((opt) => opt.value === item.body)?.label || item.body
                        : item.body
                      )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }