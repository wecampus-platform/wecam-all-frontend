'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Chatpage from '@/components/chat';
import { useState, useEffect } from 'react';
import CustomScrollbar from '@/components/CustomScrollbar';

export default function RightMenuBar({ onToggleSidebar, isSidebarVisible }) {
    const router = useRouter();
    const pathname = usePathname();

    const role = useAuthStore((state) => state.role);
    const councilList = useAuthStore((state) => state.councilList);

    const [showMoreMenu, setShowMoreMenu] = useState(false);

    const isActive = (path) => pathname?.startsWith(path);

    // showMoreMenu 상태가 변경될 때마다 스크롤바 강제 업데이트
    useEffect(() => {
        // 강제로 리렌더링을 위한 짧은 지연
        const timer = setTimeout(() => {
            // 스크롤바 업데이트를 위한 강제 리렌더링
        }, 100);
        return () => clearTimeout(timer);
    }, [showMoreMenu]);

    return (
        <CustomScrollbar
            key={showMoreMenu ? 'expanded' : 'collapsed'}
            className="w-[250px] flex flex-col items-center border-r border-slate-100 h-screen"
            forceUpdate={showMoreMenu}
        >
            <div className="p-5 w-full">
                <div className="flex items-center justify-between mb-[16px]">
                    <div className="justify-start text-neutral-500 text-sm font-normal">학생회 관리자 페이지</div>
                    <button
                        onClick={onToggleSidebar}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
                <div className="self-stretch justify-start text-zinc-800 text-base font-medium mb-[8px]">
                    {/* 소속 수정 필요 */}
                </div>
                <div className="justify-start text-zinc-800 text-base font-bold mb-[16px]">
                    {councilList?.[0]?.name || '학생회 이름'}
                </div>

                {/* 직책 */}
                <div className="w-full h-16 px-5 py-5 bg-blue-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-100 inline-flex flex-col justify-start items-start gap-2">
                    <div className="flex items-center">
                        <div className="justify-start text-blue-500 text-base font-semibold">직책</div>
                        <div className="w-[1px] h-5 bg-blue-300 mx-[16px]" />
                        <div className="justify-start text-black text-base font-semibold ml-auto">
                            {role === 'COUNCIL' ? '학생회' :
                                role === 'PRESIDENT' ? '학생회장' :
                                    role || '직책'}
                        </div>
                    </div>
                </div>

                {/* 메뉴들 */}
                <div className="flex flex-col gap-2">
                    <div
                        className={`mt-6 w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${isActive('/admin/main') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                            }`}
                        onClick={() => {
                            router.push('/admin/main');
                            if (onToggleSidebar) onToggleSidebar();
                        }}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/main') ? 'text-point' : 'text-gray6'}`}>관리자페이지 홈</div>
                    </div>

                    <div
                        className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${isActive('/admin/todo') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                            }`}
                        onClick={() => {
                            router.push('/admin/todo/main');
                            if (onToggleSidebar) onToggleSidebar();
                        }}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/todo') ? 'text-point' : 'text-gray6'}`}>할 일 관리</div>
                    </div>

                    <div
                        className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${isActive('/admin/council-affiliation') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                            }`}
                        onClick={() => {
                            router.push('/admin/council-affiliation');
                            if (onToggleSidebar) onToggleSidebar();
                        }}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/council-affiliation') ? 'text-point' : 'text-gray6'}`}>소속 인증 관리</div>
                    </div>

                    <div className="w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2">
                        <div className="text-center justify-start text-gray6 text-xl font-semibold">공지 관리</div>
                    </div>

                    <div
                        className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${isActive('/admin/meeting') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                            }`}
                        onClick={() => {
                            router.push('/admin/meeting/main');
                            if (onToggleSidebar) onToggleSidebar();
                        }}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/meeting/main') ? 'text-point' : 'text-gray6'}`}>회의록 작성 및 관리</div>
                    </div>

                    <div
                        className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${isActive('/admin/member-manage') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                            }`}
                        onClick={() => {
                            router.push('/admin/member-manage');
                            if (onToggleSidebar) onToggleSidebar();
                        }}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/member-manage') ? 'text-point' : 'text-gray6'}`}>구성원 관리</div>
                    </div>

                    <div
                        className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${isActive('/admin/invitation') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                            }`}
                        onClick={() => {
                            router.push('/admin/invitation');
                            if (onToggleSidebar) onToggleSidebar();
                        }}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/invitation') ? 'text-point' : 'text-gray6'}`}>초대코드 생성</div>
                    </div>
                </div>

                {/* 더 보기 버튼 - 확장되지 않았을 때만 표시 */}
                {!showMoreMenu && (
                    <div
                        className="w-full px-4 py-2 inline-flex justify-start items-center gap-1 cursor-pointer hover:text-point transition-colors"
                        onClick={() => setShowMoreMenu(true)}
                    >
                        <div className="text-center justify-start text-gray-500 text-base font-semibold">더 보기</div>
                    </div>
                )}

                {/* 확장된 메뉴 */}
                {showMoreMenu && (
                    <div className="w-full flex flex-col gap-2 mt-2">
                        <div
                            className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${isActive('/admin/category') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                                }`}
                            onClick={() => router.push('/admin/category')}
                        >
                            <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/category') ? 'text-point' : 'text-gray6'}`}>카테고리 관리</div>
                        </div>

                        <div
                            className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${isActive('/admin/file') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'}`}
                            onClick={() => router.push('/admin/file')}
                        >
                            <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/file') ? 'text-point' : 'text-gray6'}`}>학생회 파일함</div>
                        </div>

                        <div className="w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2">
                            <div className="text-center justify-start text-gray6 text-xl font-semibold">권한 관리</div>
                        </div>

                        {/* 메뉴닫기 버튼 */}
                        <div
                            className="w-full px-4 py-2 inline-flex justify-start items-center gap-1 cursor-pointer hover:text-point transition-colors"
                            onClick={() => setShowMoreMenu(false)}
                        >
                            <div className="text-center justify-start text-gray-500 text-base font-semibold">더 보기 메뉴 닫기</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-auto mx-[16px] mb-4">
                <div className="outline outline-1 outline-offset-[-0.50px] outline-zinc-300 mb-[24px]" />
                <div className="flex flex-col mx-[8px]">
                    <div className="flex mb-[20px] justify-between items-center mt-4">
                        <div className="text-center justify-start text-zinc-800 text-base font-semibold">팀 채팅</div>
                        <div className="text-center justify-start text-neutral-400 text-xs font-medium">새 채팅 생성하기</div>
                    </div>
                    <div className="space-y-2">
                        <Chatpage />
                        <Chatpage />
                    </div>
                </div>
            </div>
        </CustomScrollbar>
    );
}
