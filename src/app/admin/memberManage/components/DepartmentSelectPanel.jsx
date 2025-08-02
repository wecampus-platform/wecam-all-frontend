import { useRef } from "react";
import SelectablePillButton from "./SelectablePillButton";
import { useClickOutside } from "@/app/admin/memberManage/hooks/useOutsideClick";
import { departmentMock } from "@/app/admin/memberManage/mocks/department.mock";

export default function DepartmentSelectPanel({ onClose, selected, onSelect }) {
  const menuRef = (useRef < HTMLDivElement) | (null > null);
  useClickOutside(menuRef, onClose);

  return (
    <div
      ref={menuRef}
      className=" absolute right-0 top-10 w-[300px] z-10 p-5 bg-white rounded-2xl text-center shadow-sm"
    >
      <p className="text-gray-500 text-sm mb-4">
        배치하고 싶은 직책 또는 부서를 선택하세요.
      </p>
      <div className="flex flex-wrap justify-start gap-3">
        {departmentMock.map((option) => (
          <SelectablePillButton
            key={option}
            label={option}
            isSelected={selected === option}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
}
