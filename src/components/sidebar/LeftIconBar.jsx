'use client';

import { ProfileIcon, NotificationIcon, CallIcon } from '@/components/icons/mainpage-icons';
import { useAuthStore } from '@/store/authStore';

export default function LeftIconBar() {
    const { councilList, councilName, setAuth } = useAuthStore();

    const handleCouncilClick = (council) => {
        // 선택된 council의 정보로 auth store 업데이트
        setAuth({
            accessToken: useAuthStore.getState().accessToken,
            email: useAuthStore.getState().email,
            role: useAuthStore.getState().role,
            auth: useAuthStore.getState().auth,
            councilList: councilList,
            councilName: council.name,
            refreshToken: useAuthStore.getState().refreshToken,
        });
    };

    return (
        <div className="w-[80px] bg-white items-center flex flex-col border-r border-slate-100 h-[calc(100vh-64px)]">
            <div className="flex flex-col items-center mt-[48px] gap-[8px]">
                {councilList && councilList.length > 0 ? (
                    councilList.map((council, index) => (
                        <div
                            key={council.id || index}
                            className={`w-14 h-14 bg-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-400 transition-colors ${
                                councilName === council.name ? 'ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => handleCouncilClick(council)}
                            title={council.name}
                        />ㄹ
                    ))
                ) : (
                    <div className="w-14 h-14 bg-zinc-300 rounded-xl" />
                )}
            </div>
            <div className="w-14 h-0 border border-gray2 my-[16px]" />
            <div className="flex flex-col items-center gap-[8px]">
                <div className="w-14 h-14 bg-gray-200 rounded-full" />
            </div>
            <div className="flex flex-col mt-auto mb-[48px] items-center">
                <div><ProfileIcon /></div>
                <div className="flex flex-col pt-[24px] gap-[16px]">
                    <NotificationIcon />
                    <CallIcon />
                </div>
            </div>
        </div>
    );
}
