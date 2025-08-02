"use client";
import {
  leaderMockAffiliation,
  membersMockAffiliation,
  UnassignedMockAffiliation,
} from "@/app/admin/memberManage/mocks/departmentMember.mock";
import OrgMemberManageModal from "@/app/admin/memberManage/OrgMemberManageModal/OrgMemberManageModal";
import OrgMemberSection from "@/app/admin/memberManage/OrgMemberManageModal/OrgMemberSection";
import { ModifyIcon } from "@/app/admin/memberManage/icon/ModifyIcon";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [open, isOpen] = useState(false);
  const handleClose = () => {
    isOpen(false);
  };

  const handleOpen = () => {
    isOpen(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex flex-1 flex-col flex justify-center items-center gap-10 overflow-hidden">
        <img src="/logo.svg" alt="Logo" />
        <div>편리한 대학 생활, 위캠퍼스에서 시작하세요!</div>
        <Link href={accessToken ? "/workspace/make" : "/workspace"}>
          <button className="button-common w-[600px]">
            WeCampus 워크스페이스 생성하기
          </button>
        </Link>
        <button onClick={handleOpen}>모달 오픈</button>
        {open && (
          <OrgMemberManageModal
            onClose={handleClose}
            title="미배치 명단"
            icon={<ModifyIcon />}
          >
            {/* <OrgMemberSection
              label="부장"
              membersList={leaderMockAffiliation}
            />
            <OrgMemberSection
              label="부원(#)"
              membersList={membersMockAffiliation}
            /> */}
            <OrgMemberSection
              label="#명"
              membersList={UnassignedMockAffiliation}
            />
          </OrgMemberManageModal>
        )}
        <div className="flex-col flex justify-center items-center gap-5 mt-8">
          <div className="text-point">현재 공사중입니다...</div>
          <div className="">더 멋진 페이지로 돌아올게요!</div>
        </div>
      </main>
    </div>
  );
}
