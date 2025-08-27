'use client';

import { useEffect, useState } from 'react';

import { Search } from '@/components/search';
import AdminLayout from '@/app/admin/AdminLayout';
import { DefaultSection } from './defaultSection';
import CodeMakeModal from './modals/codeMakeModal';
import CodeUseHistoryModal from './modals/codeUseHistoryModal';
import CodeSuccessModal from './modals/codeSuccessModal';

export default function InvitationPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedInvitation, setSelectedInvitation] = useState(null);
    const [successData, setSuccessData] = useState({});
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    return (
        <>
            <AdminLayout
                title="초대코드 생성 및 관리"
                actionButton={
                    <button 
                        className="button-common w-[200px] h-[50px] flex items-center justify-center"
                        onClick={() => setShowCreateModal(true)}
                    >
                        + 초대코드 생성하기
                    </button>
                }
                subtitle="초대코드 내역"
                additionalContent={
                    <div className="text-base text-gray3">
                        최근 일주일 간 생성 및 사용된 초대코드 내역입니다. 생성 후 7일이 지나면 자동으로 코드가 삭제됩니다.
                    </div>
                }
                mainContent={
                    <DefaultSection 
                        onRefresh={refreshTrigger} 
                        onShowHistory={(invitation) => {
                            setSelectedInvitation(invitation);
                            setShowHistoryModal(true);
                        }} 
                    />
                }
            />

            {/* 초대코드 생성 모달 */}
            {showCreateModal && (
                <CodeMakeModal
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
                <CodeSuccessModal 
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
                        <CodeUseHistoryModal
                            onClose={() => setShowHistoryModal(false)} 
                            invitation={selectedInvitation}
                        />
                    </div>
                </div>
            )}
        </>
    );
}