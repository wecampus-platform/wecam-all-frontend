import Image from "next/image";
import { PaperIcon, MedalIcon, SharpIcon } from "../../components/icons/affiliationIcons";
import { XIcon } from '@/app/components/icons/check-icons';
import { Input } from '../../components/search'

export function CertificateModal({ onClose }) {
    return (
        <div>
            <div className="flex gap-10 px-20 py-5">
                {/* 1. 재학증명서 인증 */}
                <div className="flex flex-col gap-6 items-center justify-center">
                    <button
                        onClick={() => onSelectStep("certificate")}
                        className="border border-gray3 w-50 h-50 rounded-lg flex flex-col items-center justify-center text-center gap-4 px-[20px] py-[16px] "
                    >
                        <PaperIcon />
                        <div className="text-xl font-medium font-pretendard text-gray4 text-center">재학증명서 인증</div>
                        <div className="text-xs leading-[18px] font-pretendard text-gray4">
                            학교에서 발급 받은 재학증명서로 소속을 인증합니다.
                        </div>
                    </button>
                    <div className="flex flex-row gap-5 w-full max-w-[560px]">
                        <Input
                            placeholder="1개의 파일만 첨부 가능합니다. (PNG, JPG, JPEG, PDF)"
                            disabled={true}
                            className="flex-1 min-w-0"
                        />
                        <button className="button-common2 w-[140px] whitespace-nowrap">파일 업로드</button>
                    </div>
                    <button className="button-common">소속 인증 요청 하기</button>
                    <div className="text-gray3 text-center">
                        명의 도용, 학번, 증명서 위조 등 올바르지 않은 경로를 통해 인증을 시도할 경우, 공문서 위조 등 관련법에 따라 법적 책임이 있을 수 있습니다.
                    </div>
                </div>
            </div>
        </div>
    );
}
