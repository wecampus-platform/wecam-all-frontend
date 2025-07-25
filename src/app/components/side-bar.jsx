'use client';



import { ProfileIcon, NotificationIcon, CallIcon } from '@/app/components/icons/mainpage-icons';
import { useRouter } from 'next/navigation';
import Chatpage from '@/app/components/chat';

export default function SideBarPage() {
    const router = useRouter();

    return (
        <div className="flex w-[400px] min-h-screen">
            <div className="w-[100px] bg-white items-center flex flex-col border-r border-slate-100">
                <div className="flex flex-col items-center mt-[48px] gap-[8px]">
                    <div className="w-16 h-16 bg-zinc-300 rounded-xl" />
                    <div className="w-16 h-16 bg-zinc-300 rounded-xl" />
                    <div className="w-16 h-16 bg-zinc-300 rounded-xl" />
                </div>
                <div className="w-16 h-0 border border-zinc-400 my-[16px]" />
                <div className="flex flex-col items-center gap-[8px]">
                    <div className="w-16 h-16 bg-gray-200 rounded-full" />
                    <div className="w-16 h-16 bg-gray-200 rounded-full" />
                </div>
                <div className="flex flex-col mt-auto mb-[48px] items-center">
                    <div>
                        <ProfileIcon />
                    </div>
                    <div className="flex flex-col pt-[24px] gap-[16px]">
                        <NotificationIcon />
                        <CallIcon />
                    </div>
                </div>
            </div>
            <div className="w-[300px]  flex flex-col bg-white items-center border-r border-slate-100 overflow-y-auto">
                <div className="w-[244px] mt-[28px]">
                    <div className="  justify-start text-neutral-500 text-sm font-normal mb-[16px]">학생회 관리자 페이지</div>
                    <div className="self-stretch justify-start text-zinc-800 text-base font-medium mb[8px]">부산대학교 정보컴퓨터공학부</div>
                    <div className="justify-start text-zinc-800 text-base font-bold mb-[16px]">학생회 이름</div>
                    <div className="w-full h-16 px-5 py-5 bg-blue-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-100 inline-flex flex-col justify-start items-start gap-2">
                        <div className="flex items-center">
                            <div className="justify-start text-blue-500 text-base font-semibold">직책</div>
                            <div className="w-[1px] h-5 bg-blue-300 mx-[16px]" />
                            <div className="justify-start text-black text-xl font-semibold">김위캠</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div data-hover="hovered" className="mt-[32px] w-full px-4 py-3 bg-gray-100 rounded-lg inline-flex justify-start items-center gap-2">
                            <div className="text-center justify-start text-blue-500 text-xl font-bold">관리자페이지 홈</div>
                        </div>
                        <div data-hover="unhovered" className="w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2">
                            <div className="text-center justify-start text-zinc-600 text-xl font-semibold">할 일 관리</div>
                        </div>
                        <div data-hover="unhovered" className="w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2">
                            <div className="text-center justify-start text-zinc-600 text-xl font-semibold">소속 인증 관리</div>
                        </div>
                        <div data-hover="unhovered" className="w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2">
                            <div className="text-center justify-start text-zinc-600 text-xl font-semibold ">공지 관리</div>
                        </div>
                        <div data-hover="unhovered" className="w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2">
                            <button
                                onClick={() => router.push('/councilaffiliation')}
                                className="text-center justify-start text-zinc-600 text-xl font-semibold"
                            >
                                구성원 관리
                            </button>
                            {/* 나림 수정 - <div className="text-center justify-start text-zinc-600 text-xl font-semibold ">구성원 관리</div> */}
                        </div>
                        <div data-hover="unhovered" className="w-full px-4 py-3 rounded-lg inline-flex justify-start items-center gap-2">
                            <button
                                onClick={() => router.push('/invitation')}
                                className="text-center justify-start text-zinc-600 text-xl font-semibold"
                            >
                                초대코드 생성
                            </button>
                            {/*나림 수정 -  <div className="text-center justify-start text-zinc-600 text-xl font-semibold ">초대코드 생성</div> */}
                        </div>
                    </div>
                    <div className="mt-[16px] w-full px-4 inline-flex justify-start items-center gap-1">
                        <div className="text-center justify-start text-neutral-400 text-base font-semibold ">더 보기</div>
                    </div>
                </div>
                <div className="mt-[60px] mx-[16px]">
                    <div className="w-64 h-0 outline outline-1 outline-offset-[-0.50px] outline-zinc-300 mb-[24px]" />
                    <div className="flex flex-col mx-[8px] overflow-y-auto">
                        <div className="flex mb-[20px] justify-between items-center">
                            <div className="text-center justify-start text-zinc-800 text-base font-semibold">팀 채팅</div>
                            <div className="text-center justify-start text-neutral-400 text-xs font-medium">새 채팅 생성하기</div>
                        </div>
                        <Chatpage />
                        <Chatpage />
                        <Chatpage />
                        <Chatpage />
                        <Chatpage />
                    </div>
                </div>
            </div>

        </div>
    )
}