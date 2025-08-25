'use client';

import { useState } from 'react';
import ModalLayout from './modalLayout';
import { SharpIcon } from "../../../../components/icons/affiliationIcons";
import { Input } from '../../../../components/input';
import { useInvitationCode } from '@/api-service/invitationApi';


export function CodeModal({ onClose, onBack }) {
    const [code, setCode] = useState('');

    const handleSubmit = async () => {
        if (!code.trim()) return;

        try {
            const result = await useInvitationCode('student_member', code);
            console.log('초대 코드 사용 성공:', result);
            close();
            window.location.href = '/mypage';
          } catch (err) {
            alert('초대 코드 사용 중 오류 발생');
            console.error(err);
          }
    };

    return (
        <ModalLayout
            title="간편 코드 인증"
            icon={<SharpIcon />}
            description="학교 학생회가 발급한 인증코드로 인증합니다."
            onClose={onClose}
            onBack={onBack}
        >
            {/* 코드 입력 */}
            <Input
                placeholder="발급 받은 인증 코드를 입력해 주세요."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 min-w-0"
            />

            {/* 제출 버튼 */}
            <button
                onClick={handleSubmit}
                className="button-common"
                disabled={!code.trim()}
            >
                소속 인증 요청 하기
            </button>

            <div className="text-gray3 text-xs text-center leading-relaxed">
                명의 도용, 학번, 증명서 위조 등 올바르지 않은 경로를 통해 인증을 시도할 경우,<br />
                공문서 위조 등 관련법에 따라 법적 책임이 있을 수 있습니다.
            </div>
        </ModalLayout>
    );
}
