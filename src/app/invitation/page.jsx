'use client';

import { useEffect, useState } from 'react';

import SideBarPage from '@/app/components/side-bar';
import { Search } from '@/app/components/search';
import { DefaultSection } from './defaultSection';
import Modal2 from '../invitation-code/modal2';
import SuccessModal from '../invitation-code/successModal';

export default function InvitationPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successData, setSuccessData] = useState({});

    return (
        <div className="h-screen w-full flex">
            <SideBarPage />
            {/* 가장 오른쪽 공간 */}
            <div className="px-[76px] w-full flex flex-col gap-8">
                <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-row justify-center items-center">
                        <b className="relative text-[40px] font-pretendard text-darkslategray text-left">초대코드 생성 및 관리</b>
                        <button 
                            className="button-common ml-auto w-[200px] h-[50px] flex items-center justify-center"
                            onClick={() => setShowCreateModal(true)}
                        >
                            + 초대코드 생성하기
                        </button>
                    </div>
                    <div className="relative text-[30px] font-pretendard font-semibold text-left mt-8">초대코드 내역</div>
                    <div className="text-base text-gray3">최근 일주일 간 생성 및 사용된 초대코드 내역입니다. 생성 후 7일이 지나면 자동으로 코드가 삭제됩니다.</div>

                </div>
                {/* 주요 공간 */}
                <div className="flex bg-white rounded h-screen">
                    <DefaultSection />
                </div>
            </div>

            {/* 초대코드 생성 모달 */}
            {showCreateModal && (
                <Modal2 
                    onClose={() => setShowCreateModal(false)} 
                    onSuccess={(data) => {
                        setShowCreateModal(false);
                        setSuccessData(data);
                        setShowSuccessModal(true);
                    }}
                />
            )}

            {/* 성공 모달 */}
            {showSuccessModal && (
                <SuccessModal 
                    onClose={() => setShowSuccessModal(false)}
                    {...successData}
                />
            )}
        </div>
    )
}