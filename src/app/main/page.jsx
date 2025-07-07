

import SideBarPage from '@/app/main/side-bar';

export default function MainPage(){
    return(
       <div className="h-screen w-full bg-[#F5F7FA] flex">
            <SideBarPage/>
            <div className="mt-[60px] px-[60px] flex flex-col">
                <div className="w-full flex justify-between items-center bg-red-50">
                    <div className="w-40 h-14 justify-start text-zinc-800 text-4xl font-bold">할 일 관리</div>
                    <div data-hover="unhovered" className="pl-4 pr-5 py-3 bg-blue-500 rounded-lg inline-flex justify-start items-center gap-1">
                        <div className="w-6 h-6 relative overflow-hidden">
                            <div className="w-3 h-3 left-[5.50px] top-[5.50px] absolute bg-white" />
                        </div>
                        <div className="text-center justify-start text-white text-xl font-semibold">할 일 등록하기</div>
                    </div>
                </div>
            </div>
       </div>
    )
}