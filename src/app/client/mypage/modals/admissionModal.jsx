'use client';

import { useRef, useState } from 'react';
import ModalLayout from './modalLayout';
import { MedalIcon } from "@/components/icons/affiliationIcons";
import { requestFreshmanAffiliation } from '@/api-service/studentAffiliationApi';
import { Input } from '@/components/input';

export function AdmissionModal({ onClose, onBack }) {
    const [file, setFile] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setUploadedFileName(selectedFile.name);
    };

    const handleSubmit = async () => {
        try {
            await requestFreshmanAffiliation(file);
            alert('인증 요청이 성공적으로 전송되었습니다.');
            onClose();
        } catch (err) {
            alert(err.message || '요청 중 오류 발생');
            console.error(err);
        }
    };
    return (
        <ModalLayout
            title="합격증명서 인증"
            icon={<MedalIcon />}
            description="입학 시 발급 받은 합격 증명서로 소속을 인증합니다."
            onClose={onClose}
            onBack={onBack}
        >
            {/* 업로드 영역 */}
            <div className="flex flex-row gap-5 w-full">
                <Input
                    placeholder={uploadedFileName || '1개의 파일만 첨부 가능합니다. (PNG, JPG, JPEG, PDF)'}
                    disabled
                    className="flex-1 min-w-0"
                />
                <button
                    onClick={handleFileUploadClick}
                    className="button-common2 w-[140px] whitespace-nowrap"
                >
                    파일 업로드
                </button>
            </div>

            <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {/* 제출 버튼 */}
            <button
                onClick={handleSubmit}
                className="button-common"
                disabled={!file}
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
