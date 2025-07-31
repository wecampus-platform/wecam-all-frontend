'use client';
import Link from 'next/link';
import Nav from '@/components/nav';

export default function Page() {

    return (
        <div className="min-h-screen w-full flex flex-col">
            <main className="flex flex-1 flex-col flex justify-center items-center gap-10 overflow-hidden">
                <img src="/logo.svg" alt="Logo" />
                <div>편리한 대학 생활, 위캠퍼스에서 시작하세요!</div>
                <Link href="/workspace">
                    <button className="button-common w-[600px]">WeCampus 워크스페이스 생성하기</button>
                </Link>
                <div className="flex-col flex justify-center items-center gap-5 mt-8">
                    <div className="text-point">현재 공사중입니다...</div>
                    <div className="">더 멋진 페이지로 돌아올게요!</div>
                </div>

            </main>
        </div>
    )
}