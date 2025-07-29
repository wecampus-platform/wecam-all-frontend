import { useAuthStore } from '@/app/store/authStore';
import { ProfileIcon, NotificationIcon, CallIcon } from '@/app/components/icons/mainpage-icons';
import { useRouter } from 'next/navigation';
import { getCouncilHome } from '@/app/mypage/api';  
import Chatpage from '@/app/components/chat';

export default function SideBarPage(){
    const { accessToken, role, councilList } = useAuthStore();
    const router = useRouter();
  
    console.log("현재 role 값:", role);

    const handleCouncilClick = async () => {
      if (role !== 'COUNCIL') {
        alert('학생회 권한이 있는 사용자만 접근할 수 있습니다.');
        return;
      }
  
      if (!accessToken || councilList.length === 0) {
        alert('인증 정보가 올바르지 않습니다.');
        return;
      }
  
      try {
        const councilId = councilList[0].id;
        console.log(councilId);
        const resText = await getCouncilHome(councilId, accessToken);
        console.log('학생회 홈 호출 성공:', resText);
        useAuthStore.getState().setCurrentCouncil(councilId);
        console.log('useAuthStore:', resText);
        // 성공 시 관리자 페이지로 이동
        router.push('/adminmain');
      } catch (err) {
        console.error('학생회 홈 정보 불러오기 실패:', err);
        alert('학생회 홈 정보를 불러오지 못했습니다.');
      }
    };
  
    return(
        <div className="flex h-screen">
            <div className="w-[100px] h-screen bg-white items-center flex flex-col border-r border-slate-100">
                <div className="flex flex-col items-center mt-[48px] gap-[8px]">
                    <div className="w-16 h-16 bg-zinc-300 rounded-xl"/>
                    <button onClick={handleCouncilClick}>
                        <div className="w-16 h-16 bg-zinc-300 rounded-xl" />
                    </button>
                <div className="w-16 h-16 bg-zinc-300 rounded-xl"/>
                </div>
                <div className="w-16 h-0 border border-zinc-400 my-[16px]" />
                <div className="flex flex-col items-center gap-[8px]">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"/>
                    <div className="w-16 h-16 bg-gray-200 rounded-full"/>
                </div>
                <div className="flex flex-col mt-auto mb-[48px] items-center">
                    <div>
                        <ProfileIcon/>
                    </div>
                    <div className="flex flex-col pt-[24px] gap-[16px]">
                        <NotificationIcon/>
                        <CallIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}