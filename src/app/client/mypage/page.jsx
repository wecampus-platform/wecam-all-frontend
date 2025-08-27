'use client';

import { useEffect, useState } from 'react';
import MyPageCard from './mypagecard';
import MyPageBox from './mypagebox';
import { getMyPageBoxes } from '@/utils/getmypagebox';
import { clientapi } from '@/lib/fetchClient';
import { useAuthStore } from '@/store/authStore';
import SideBarPage from '@/components/sidebar/LeftIconBar';
import InputModal from '@/components/modals/Inputmodal';
import { OrganizationModal } from './modals/organizationModal';
import {fetchEditUserOrganizationInfo,fetchEditUserInfo} from '@/api-service/mypageApi'
import { useInvitationCode } from '@/api-service/invitationApi';
import CustomScrollbar from '@/components/CustomScrollbar';


export default function MyPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const { accessToken, ready } = useAuthStore();

  const [modalType, setModalType] = useState(null);
  const [inputValue, setInputValue] = useState('');


  const handleSaveOrganizationInfo = async (updatedContents) => {
    const findValue = (label) =>
      updatedContents.find((item) => item.subtitle === label)?.body || '';
  
      const rawStatus = findValue('학적 상태');
      const academicStatus = rawStatus === '' ? null : rawStatus;
      
      const payload = {
        request: {
          studentNumber: findValue('학번'),
          schoolGrade: parseInt(findValue('학년'), 10),
          academicStatus, // ← 빈 문자열 대신 null
        },
      };
  
    try {
      const response = await fetchEditUserOrganizationInfo(payload);
      if (response.ok) {
        console.log('저장 완료!');
      } else {
        console.error('저장 실패');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveNameInfo = async (updatedContents) => {
    const findValue = (label) =>
      updatedContents.find((item) => item.subtitle === label)?.body || '';
  
    const userName = findValue('이름');
  
    try {
      const response = await fetchEditUserInfo(userName); // ← 이미 만든 API 사용
      if (response.ok) {
        console.log('이름 저장 완료!');
      } else {
        console.error('이름 저장 실패');
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await clientapi('/user/mypage');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('[MyPage] 에러 발생:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);


  const handleModalConfirm = async () => {
    if (modalType === 'organization') {
      console.log('소속 인증 요청:', inputValue);
    } else if (modalType === 'schoolEmail') {
      console.log('학교 이메일 인증 요청:', inputValue);
    } else if (modalType === 'studentCouncil') {
      try {
        console.log('학생회 인증 요청:', inputValue);
        const result = await useInvitationCode('council_member', inputValue);
        console.log('학생회 인증 성공:', result);
        
        // API 응답에서 권한 정보 업데이트
        if (result && result.isSuccess) {
          const currentAuth = useAuthStore.getState();
          useAuthStore.getState().setAuth({
            ...currentAuth,
            role: 'COUNCIL', // 초대코드 사용 성공 시 학생회 권한 부여
            councilList: currentAuth.councilList || []
          });
        }
        
        alert('학생회 인증이 완료되었습니다.');
        // 페이지 새로고침 또는 상태 업데이트
        window.location.reload();
      } catch (err) {
        console.error('학생회 인증 실패:', err);
        alert('학생회 인증 중 오류가 발생했습니다.');
      }
    }
    setModalType(null);
    setInputValue('');
  };

  if (loading) return <div></div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!user) return <div>사용자 정보가 없습니다.</div>;

  const authLinks = getAuthLinks(user.role, user.isAuthentication, setModalType);
  const boxList = getMyPageBoxes(user, authLinks);

  return (
    <div className="flex h-screen">
      {/* Sidebar - 고정 */}
      <SideBarPage />
      
      {/* Main Content - 스크롤 가능 */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* MyPageCard - 고정 */}
        <div className="w-full lg:w-1/3 p-6">
          <MyPageCard user={user} />
        </div>
        
        {/* MyPageBox 영역 */}
        <CustomScrollbar className="w-full lg:w-2/3 px-15 h-full">
          <div className="space-y-6 my-10">
            {boxList.map((box, idx) => (
              <MyPageBox
                key={idx}
                title={box.title}
                contents={box.contents}
                blurred={box.title === '소속 정보' && !user.isAuthentication}
                onVerifyClick={() => setModalType('organization')}
                onSave={
                  box.title === '소속 정보'
                    ? handleSaveOrganizationInfo
                    : box.title === '기본 정보'
                    ? handleSaveNameInfo
                    : undefined
                }
              />
            ))}
          </div>
        </CustomScrollbar>
      </div>


      {/* 모달 타입 분리 */}
      {modalType === 'organization' && (
        <OrganizationModal
          onClose={() => setModalType(null)}
        />
      )}

      {(modalType === 'schoolEmail' || modalType === 'studentCouncil') && (
        <InputModal
          title={modalType === 'schoolEmail' ? '학교 이메일을 등록하세요.' : '발급받은 학생회 코드를 입력하세요.'}
          value={inputValue}
          setValue={setInputValue}
          onConfirm={handleModalConfirm}
          onCancel={() => setModalType(null)}
        />
      )}

    </div>
  );
}

function getAuthLinks(role, isAuth, handleModalOpen) {
  const button = (text, type) => (
    <button onClick={() => handleModalOpen(type)} className="text-point underline">
      {text}
    </button>
  );

  if (role === 'UNAUTH' && !isAuth) {
    return {
      organization: button('인증하기', 'organization'),
      schoolEmail: button('인증하기', 'schoolEmail'),
      studentCouncil: button('인증하기', 'studentCouncil'),
    };
  }
  if (role === 'GUEST_STUDENT' && isAuth) {
    return {
      organization: <span className="text-point font-semibold">임시완료</span>,
      schoolEmail: button('인증하기', 'schoolEmail'),
      studentCouncil: button('인증하기', 'studentCouncil'),
    };
  }
  if (role === 'STUDENT' && isAuth) {
    return {
      organization: <span className="text-point font-semibold">인증완료</span>,
      schoolEmail: <span className="text-point font-semibold">인증완료</span>,
      studentCouncil: <span className="text-point font-semibold">인증완료</span>,
    };
  }
  return {
    organization: <span className="text-gray-400">정보 없음</span>,
    schoolEmail: <span className="text-gray-400">정보 없음</span>,
    studentCouncil: <span className="text-gray-400">정보 없음</span>,
  };
}
