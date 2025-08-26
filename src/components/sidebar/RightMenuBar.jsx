'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Chatpage from '@/components/chat';

export default function RightMenuBar() {
    const router = useRouter();
    const pathname = usePathname();

    const role = useAuthStore((state) => state.role);
    const councilList = useAuthStore((state) => state.councilList);

    const isActive = (path) => pathname?.startsWith(path);

    return (
        <div className="w-[250px] flex flex-col items-center border-r border-slate-100 h-[calc(100vh-64px)]">
            <div className="p-5 w-full">
                <div className="justify-start text-neutral-500 text-sm font-normal mb-[16px]">학생회 관리자 페이지</div>
                <div className="self-stretch justify-start text-zinc-800 text-base font-medium mb-[8px]">
                    {/* 소속 수정 필요 */}
                </div>
                <div className="justify-start text-zinc-800 text-base font-bold mb-[16px]">
                    {councilList?.[0]?.name || '학생회 이름'}
                </div>

                {/* 직책 */}
                <div className="w-full h-16 px-5 py-5 bg-blue-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-100 inline-flex flex-col justify-start items-start gap-2">
                    <div className="flex items-center">
                        <div className="justify-start text-blue-500 text-base font-semibold">{role || '직책'}</div>
                        <div className="w-[1px] h-5 bg-blue-300 mx-[16px]" />
                        <div className="justify-start text-black text-xl font-semibold">{/* 이름 수정 필요 */}</div>
                    </div>
                </div>
                
                {/* 메뉴들 */}
                <div className="flex flex-col gap-[8px]">
                    <div
                        className={`mt-[32px] w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${
                            isActive('/admin/main') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                        }`}
                        onClick={() => router.push('/admin/main')}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/main') ? 'text-point' : 'text-gray6'}`}>관리자페이지 홈</div>
                    </div>

                    <div
                        className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${
                            isActive('/admin/todo') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                        }`}
                        onClick={() => router.push('/admin/todo/main')}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/todo') ? 'text-point' : 'text-gray6'}`}>할 일 관리</div>
                    </div>

                    <div
                        className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${
                            isActive('/admin/council-affiliation') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                        }`}
                        onClick={() => router.push('/admin/council-affiliation')}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/council-affiliation') ? 'text-point' : 'text-gray6'}`}>소속 인증 관리</div>
                    </div>

                    <div className="w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2">
                        <div className="text-center justify-start text-gray6 text-xl font-semibold">공지 관리</div>
                    </div>

                    <div
                        className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${
                            isActive('/admin/member-manage') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                        }`}
                        onClick={() => router.push('/admin/member-manage')}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/member-manage') ? 'text-point' : 'text-gray6'}`}>구성원 관리</div>
                    </div>

                    <div
                        className={`w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer ${
                            isActive('/admin/invitation') ? 'bg-gray-100 text-point font-bold' : 'hover:bg-gray-100 text-gray6 font-semibold'
                        }`}
                        onClick={() => router.push('/admin/invitation')}
                    >
                        <div className={`text-center justify-start text-xl font-semibold ${isActive('/admin/invitation') ? 'text-point' : 'text-gray6'}`}>초대코드 생성</div>
                    </div>
                </div>

                <div className="mt-[16px] w-full px-4 inline-flex justify-start items-center gap-1">
                    {/* <div className="text-center justify-start text-neutral-400 text-base font-semibold">더 보기</div> */}
                </div>
            </div>

            <div className="mt-auto mx-[16px] mb-[48px]">
                <div className="outline outline-1 outline-offset-[-0.50px] outline-zinc-300 mb-[24px]" />
                <div className="flex flex-col mx-[8px]">
                    <div className="flex mb-[20px] justify-between items-center">
                        <div className="text-center justify-start text-zinc-800 text-base font-semibold">팀 채팅</div>
                        <div className="text-center justify-start text-neutral-400 text-xs font-medium">새 채팅 생성하기</div>
                    </div>
                    <div className="space-y-2">
                        <Chatpage />
                        <Chatpage />
                    </div>
                </div>
            </div>
        </div>
    );
}
