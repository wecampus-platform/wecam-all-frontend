import DepartmentSelectPanel from "@/app/admin/memberManage/components/DepartmentSelectPanel";
import MemberActionMenu from "@/app/admin/memberManage/components/MemberActionMenu";
import OptionsIcon from "@/app/admin/memberManage/icon/OptionsIcon";
import useToggleMenu from "@/app/admin/memberManage/hooks/useToggleMenu";
import { useState } from "react";

export default function AffiliationList({
  imgSrc,
  name,
  studentId,
  major,
  department,
  joinDate,
}) {
  const {
    toggleMemberActionMenu,
    openMemberActionMenu,
    closeMemberActionMenu,

    toggleMoveDepartment,
    openMoveDepartment,
    closeMoveDepartment,
  } = useToggleMenu();

  const [selectedDept, setSelectedDept] = useState(department);

  const handleSelectDepartment = (value) => {
    setSelectedDept(value);
    closeMoveDepartment();
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition">
      <div className="flex gap-8">
        <div className="flex items-center gap-4">
          <img
            src={imgSrc}
            alt={name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="font-semibold">{name}</div>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-800">
          <div className="text-gray-500">{studentId}</div>
          <div className="text-gray-700">{major}</div>
        </div>

        {department.length !== 0 && (
          <div className="flex justify-center items-center px-2 bg-blue-100 text-blue-600 rounded-2xl text-xs">
            {selectedDept} {/* 선택된 부서 표시 (임시) */}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        <div>{joinDate}</div>
        <div className="relative w-full h-full">
          <button
            className="text-[#ABAEB4] hover:text-gray-600 "
            onClick={openMemberActionMenu}
          >
            <OptionsIcon />
          </button>

          {toggleMemberActionMenu && (
            <MemberActionMenu
              onClose={closeMemberActionMenu}
              onAssignDepartment={() => console.log("Assign Department")} // 이후 기능 구현 필요
              onMoveDepartment={openMoveDepartment}
              onExpel={() => console.log("Expel Member")} // 이후 기능 구현 필요
            />
          )}

          {toggleMoveDepartment && (
            <DepartmentSelectPanel
              onClose={closeMoveDepartment}
              selected={selectedDept}
              onSelect={handleSelectDepartment}
            />
          )}
        </div>
      </div>
    </div>
  );
}
