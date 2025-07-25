
//추후 main side와 공통 component화 필요함
'use client';

import Link from 'next/link';
import { ProfileIcon, NotificationIcon, CallIcon } from '@/app/components/icons/mainpage-icons';
import Chatpage from '@/app/components/chat';

export default function SideBarPage() {
    return (
        <div className="flex h-screen">
            <div className="w-[100px] h-screen bg-white items-center flex flex-col border-r border-slate-100">
                <div className="flex flex-col items-center mt-[48px] gap-[8px]">
                    <Link href="/councilaffiliation" legacyBehavior>
                        <div className="w-16 h-16 bg-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-400 hover:scale-105 transition-transform duration-200" />
                    </Link>
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
        </div>
    )
}