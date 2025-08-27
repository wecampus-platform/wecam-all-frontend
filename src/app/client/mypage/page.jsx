'use client';

import { useEffect, useState } from 'react';
import MyPageCard from './mypagecard';
import MyPageBox from './mypagebox';
import { getMyPageBoxes } from '@/utils/getmypagebox';
import { clientapi } from '@/lib/fetchClient';
import { useAuthStore } from '@/store/authStore';
import SideBarPage from './side-bar';
import InputModal from '@/components/modals/Inputmodal';
import { OrganizationModal } from './modals/organizationModal';
import {fetchEditUserOrganizationInfo,fetchEditUserInfo} from '@/app/api-service/mypageApi'
import { useInvitationCode } from '@/app/api-service/invitationApi';

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
      await fetchEditUserOrganizationInfo(payload);
      alert('저장 완료!');
    } catch (e) {
      alert('저장 실패');
      console.error(e);
    }
  };

  const handleSaveNameInfo = async (updatedContents) => {
    const findValue = (label) =>
      updatedContents.find((item) => item.subtitle === label)?.body || '';
  
    const userName = findValue('이름');
  
    try {
      await fetchEditUserInfo(userName); // ← 이미 만든 API 사용
      alert('이름 저장 완료!');
    } catch (e) {
      alert('이름 저장 실패');
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


// 상단: state 하나 추가 (중복 제출 방지용)
const [submitting, setSubmitting] = useState(false);

// 기존 handleModalConfirm 교체
const handleModalConfirm = async () => {
  if (submitting) return;

  // 입력값 공통 체크
  if (!inputValue || !inputValue.trim()) {
    alert('코드를 입력하세요.');
    return;
  }

  if (modalType === 'studentCouncil') {
    try {
      setSubmitting(true);
      const result = await useInvitationCode('council_member', inputValue.trim());
      console.log('초대 코드 사용 성공:', result);

      // 모달 닫고 마이페이지로
      setModalType(null);
      setInputValue('');
      window.location.href = 'client/mypage';
    } catch (err) {
      alert('초대 코드 사용 중 오류 발생');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
    return;
  }

  // 다른 모달 타입(예: schoolEmail)은 필요 시 여기에 추가
  if (modalType === 'schoolEmail') {
    // TODO: 학교 이메일 인증 API 연결
    setModalType(null);
    setInputValue('');
    return;
  }

  // 기본: 닫기
  setModalType(null);
  setInputValue('');
};


  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!user) return <div>사용자 정보가 없습니다.</div>;

  const authLinks = getAuthLinks(user.role, user.isAuthentication, setModalType);
  const boxList = getMyPageBoxes(user, authLinks);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
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
