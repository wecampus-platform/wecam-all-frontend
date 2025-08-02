import { useClickOutside } from "@/app/admin/memberManage/hooks/useOutsideClick";
import { useEffect, useRef } from "react";

export default function MemberActionMenu({
  onClose,
  onAssignDepartment,
  onMoveDepartment,
  onExpel,
}) {
  const menuRef = (useRef < HTMLDivElement) | (null > null);
  useClickOutside(menuRef, onClose);

  return (
    <div
      ref={menuRef}
      className="w-[100px] bg-white rounded-md  overflow-hidden text-center text-sm border border-gray-200 absolute right-0 top-10 z-10"
    >
      <div className="text-gray-300 py-3 border-b border-gray-200 cursor-not-allowed select-none">
        부서 배치
      </div>

      <button
        onClick={onMoveDepartment}
        className="w-full py-3 hover:bg-gray-100 border-b border-gray-200 text-gray-800"
      >
        부서 이동
      </button>

      <button
        onClick={onExpel}
        className="w-full py-3 hover:bg-gray-100 text-gray-800"
      >
        제명하기
      </button>
    </div>
  );
}
