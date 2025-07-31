"use client"

import { useState } from 'react';
import { GrayCheckIcon, BlueCheckIcon } from '@/components/icons/check-icons';



export default function LoginPage(){
    const [isChecked, setIsChecked] = useState(false);
    
    return(
        <div className="bg-[#F5F7FA] flex flex-col items-center w-full h-screen">
            <div className= "mt-[200px]">
                <div className="text-center justify-start text-zinc-800 text-4xl font-semibold">워크스페이스 생성하기</div>
            </div>
            <div className="mt-2">
                <div className="text-center justify-start text-zinc-400 text-base font-normal">대표자 본인만 워크스페이스 생성이 가능합니다.</div>
            </div>
            <div className="mt-6 flex items-center gap-2">
                <button
                onClick={() => setIsChecked(!isChecked)}
                className="rounded outline outline-1 outline-offset-[-1px] outline-zinc-400 inline-flex justify-center items-center w-6 h-6"
                >
                {isChecked ? <BlueCheckIcon /> : <GrayCheckIcon />}
                </button>
                <div className="text-neutral-500 text-base font-normal">
                대표자 본인이 맞습니다.
                </div>
            </div>
            <div className="mt-[44px] flex space-x-[24px]">
                <div className="flex flex-col">
                    <div className="self-stretch text-center justify-start text-neutral-400 text-base font-semibold leading-none mb-[28px]">워크스페이스 대표자 계정이 있는 경우</div>
                    <div data-available="unavailable" data-hover="unhovered" className="self-stretch h-64 px-12 py-24 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-center items-center gap-2">
                        <div className={`text-center justify-start text-2xl leading-loose ${isChecked ? 'text-[#5A5D61] font-semibold' : 'text-zinc-300 font-normal'}`}>로그인 후 <br/>워크스페이스 생성하기</div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="self-stretch text-center justify-start text-neutral-400 text-base font-semibold leading-none mb-[28px]">워크스페이스 대표자 계정이 없는 경우</div>
                    <div data-available="unavailable" data-hover="unhovered" className="self-stretch h-64 px-12 py-24 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-center items-center gap-2">
                        <div className={`text-center justify-start text-2xl leading-loose ${isChecked ? 'text-[#5A5D61] font-semibold' : 'text-zinc-300 font-normal'}`}> 대표자 회원가입 후 <br/>워크스페이스 생성하기</div>
                    </div>
                </div>

            </div>
            <div className="w-full h-[20%] bg-[#D9D9D9] fixed bottom-0 left-0" />
        </div>
        
    )
}