'use client';

import { useEffect, useState } from 'react';
import MyPageCard from './mypagecard';
import MyPageBox from './mypagebox';
import { getMyPageBoxes } from '../../utils/getmypagebox';
import { clientapi } from '../../lib/fetchClient';
import { useAuthStore } from '../store/authStore';
import SideBarPage from '@/app/mypage/side-bar';
import InputModal from '../components/modals/Inputmodal';
import { OrganizationModal } from './modals/organizationModal';
import { LogOut } from '@/app/components/logout';

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const { accessToken, ready } = useAuthStore();

  const [modalType, setModalType] = useState(null);
  const [inputValue, setInputValue] = useState('');
  
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


  const handleModalConfirm = () => {
    if (modalType === 'organization') {
      console.log('소속 인증 요청:', inputValue);
    } else if (modalType === 'schoolEmail') {
      console.log('학교 이메일 인증 요청:', inputValue);
    } else if (modalType === 'studentCouncil') {
      console.log('학생회 인증 요청:', inputValue);
    }
    setModalType(null);
    setInputValue('');
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!user) return <div>사용자 정보가 없습니다.</div>;

  const authLinks = getAuthLinks(user.role, user.isAuthentication, setModalType);
  const boxList = getMyPageBoxes(user, authLinks);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <SideBarPage />
      <div className="w-full lg:w-1/3">
        <MyPageCard user={user} />
      </div>
      <div className="w-full lg:w-2/3 space-y-6">
        {boxList.map((box, idx) => (
          <MyPageBox
            key={idx}
            title={box.title}
            contents={box.contents}
            blurred={box.title === '소속 정보' && !user.isAuthentication}
          />
        ))}
        <LogOut />
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
