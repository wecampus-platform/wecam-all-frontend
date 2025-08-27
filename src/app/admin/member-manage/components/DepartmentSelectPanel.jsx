import { useRef } from "react";
import SelectablePillButton from "./SelectablePillButton";
import { useClickOutside } from "@/hooks/useOutsideClick";

export default function DepartmentSelectPanel({ onClose, selected, onSelect, departments = [], isLoading = false, error = null }) {
  const menuRef = useRef(null);
  useClickOutside(menuRef, onClose);

  if (isLoading) {
    return (
      <div
        ref={menuRef}
        className="absolute right-0 top-10 w-[300px] z-10 p-5 bg-white rounded-2xl text-center shadow-sm"
      >
        <div className="text-gray-500 text-sm">부서 목록을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        ref={menuRef}
        className="absolute right-0 top-10 w-[300px] z-10 p-5 bg-white rounded-2xl text-center shadow-sm"
      >
        <div className="text-red-500 text-sm mb-4">{error}</div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          닫기
        </button>
      </div>
    );
  }

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-10 w-[300px] z-10 p-5 bg-white rounded-2xl text-center shadow-sm"
    >
      <p className="text-gray-500 text-sm mb-4">
        배치하고 싶은 직책 또는 부서를 선택하세요.
      </p>
      {departments.length > 0 ? (
        <div className="flex flex-wrap justify-start gap-3">
          {departments.map((option, index) => (
            <SelectablePillButton
              key={`${option}-${index}`}
              label={option}
              isSelected={selected === option}
              onClick={() => onSelect(option)}
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-sm">사용 가능한 부서가 없습니다.</div>
      )}
    </div>
  );
}
