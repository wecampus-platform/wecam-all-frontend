import Link from 'next/link';
import { ContentItem } from '../../types/types';

export default function MyPageBox({ title, contents, blurred = false, onVerifyClick }) {
  return (
    <div className="border border-[#D8DADD] rounded-lg overflow-hidden w-full shadow-sm mb-6 relative">
      <div className="bg-point text-white px-4 py-3 font-bold text-lg">{title}</div>
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
        {Array.isArray(contents) && contents.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="text-gray-700 font-medium whitespace-nowrap">{item.subtitle}</div>
            <div className="text-gray-600 text-right flex-1 break-words">{item.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}