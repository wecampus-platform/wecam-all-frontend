'use client';

import { ProfileIcon, NotificationIcon, CallIcon, HomeIcon } from '@/components/icons/mainpage-icons';
import { useAuthStore } from '@/store/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { adminapi } from '@/lib/fetchClient';

export default function LeftIconBar() {
    const { councilList, councilName, setAuth, hasAdminAccess } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();

    // 권한이 없는 경우 컴포넌트를 렌더링하지 않음
    if (!hasAdminAccess()) {
        return null;
    }

    const handleCouncilClick = async (council) => {
        try {
            // 선택된 학생회 정보로 authStore 업데이트
            setAuth({
                accessToken: useAuthStore.getState().accessToken,
                email: useAuthStore.getState().email,
                role: useAuthStore.getState().role,
                auth: useAuthStore.getState().auth,
                councilList: councilList,
                councilName: council.name,
                selectedCouncilId: council.id,
                refreshToken: useAuthStore.getState().refreshToken,
            });
            
            // admin/council/home API 호출
            const response = await adminapi('/council/home', {
                method: 'GET',
            });
            
            if (response.ok) {
                // API 호출 성공 시 admin/main 페이지로 이동
                router.push('/admin/main');
            } else {
                console.error('API 호출 실패:', response.status);
            }
        } catch (error) {
            console.error('학생회 홈 API 호출 오류:', error);
        }
    };

    return (
        <div className="w-[80px] bg-white items-center flex flex-col border-r border-slate-100 h-screen">
            <div className="flex flex-col items-center mt-[10px] mb-4">
            </div>
            
            <div className="flex flex-col items-center gap-[8px]">
                {councilList && councilList.length > 0 ? (
                    councilList.map((council, index) => (
                        <div
                            key={council.id || index}
                            className={`w-14 h-14 bg-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-400 transition-colors ${
                                pathname === '/admin/main' ? 'ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => handleCouncilClick(council)}
                            title={council.name}
                        />
                    ))
                ) : (
                    <div className="w-14 h-14 bg-zinc-300 rounded-xl" />
                )}
            </div>
            <div className="w-14 h-0 border border-gray2 my-[16px]" />
            <div className="flex flex-col items-center gap-[8px]">
                <div className="w-14 h-14 bg-gray-200 rounded-full" />
            </div>
            <div className="flex flex-col mt-auto mb-4 items-center">
                <div 
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => router.push('/client/mypage')}
                >
                    <ProfileIcon />
                </div>
                <div className="flex flex-col pt-[24px] gap-[16px]">
                    <div 
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => router.push('/')}
                    >
                        <HomeIcon />
                    </div>
                    <NotificationIcon />
                    <CallIcon />
                </div>
            </div>
        </div>
    );
}
