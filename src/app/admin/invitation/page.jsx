'use client';

import { useEffect, useState } from 'react';

import SideBarPage from '@/app/components/side-bar';
import { Search } from '@/app/components/search';
import { DefaultSection } from './defaultSection';
import codeMakeModal from './modals/codeMakeModal';
import codeUseHistoryModal from './modals/codeUseHistoryModal';
import SuccessModal from './modals/codeSuccessModal';

export default function InvitationPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedInvitation, setSelectedInvitation] = useState(null);
    const [successData, setSuccessData] = useState({});
    const [refreshTrigger, setRefreshTrigger] = useState(0);

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
                    <DefaultSection 
                        onRefresh={refreshTrigger} 
                        onShowHistory={(invitation) => {
                            setSelectedInvitation(invitation);
                            setShowHistoryModal(true);
                        }} 
                    />
                </div>
            </div>

            {/* 초대코드 생성 모달 */}
            {showCreateModal && (
                <codeMakeModal
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
                    onClose={() => {
                        setShowSuccessModal(false);
                        // 성공 모달 닫을 때 초대코드 목록 새로고침
                        setRefreshTrigger(prev => prev + 1);
                    }}
                    {...successData}
                />
            )}

            {/* 사용 내역 모달 */}
            {showHistoryModal && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black-90 bg-opacity-80 backdrop-blur-sm"
                    onClick={() => setShowHistoryModal(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <codeUseHistoryModal
                            onClose={() => setShowHistoryModal(false)} 
                            invitation={selectedInvitation}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}