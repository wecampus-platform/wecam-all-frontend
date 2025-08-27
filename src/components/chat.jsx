

export default function ChatPage(){
    return(
        <div data-click="unclicked" className="self-stretch px-2 py-4 border-b border-zinc-100 inline-flex justify-between items-center">
            <div className="text-center justify-start text-neutral-500 text-xl font-medium">채팅방 이름</div>
            <div className="w-6 h-6 p-2 bg-red-500 rounded-[32px] inline-flex flex-col justify-center items-center gap-2">
                <div className="self-stretch text-center justify-start text-white text-xs font-semibold">1</div>
            </div>
        </div>
    )
}