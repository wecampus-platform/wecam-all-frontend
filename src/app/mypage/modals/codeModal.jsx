import Image from "next/image";
import { PaperIcon, MedalIcon, SharpIcon } from "../../components/icons/affiliationIcons";
import { XIcon } from '@/app/components/icons/check-icons';
import { Input } from '../../components/search'

export function CodeModal({ onClose }) {
    return (
        <div>
                <div className="flex flex-col gap-6 items-center justify-center">
                    <button
                        onClick={() => onSelectStep("code")}
                        className="border border-gray3 rounded-lg flex flex-col items-center justify-center text-center gap-4 px-[20px] py-[16px]"
                    >
                        <SharpIcon />
                        <div className="text-xl font-medium font-pretendard text-gray4 text-center">간편 코드 인증</div>
                        <div className="w-[126px] relative text-xs leading-[18px] font-pretendard text-gray4">
                            학교 학생회가 발급한 인증코드로 인증합니다.
                        </div>
                    </button>
                    <div className="flex flex-row gap-5 w-full max-w-[560px]">
                        <Input
                            placeholder="간편 코드를 입력하세요."
                            className="flex-1 min-w-0"
                        />
                    </div>
                    <button className="button-common">소속 인증 요청 하기</button>
                    <div className="text-gray3 text-center">
                        명의 도용, 학번, 증명서 위조 등 올바르지 않은 경로를 통해 인증을 시도할 경우, 공문서 위조 등 관련법에 따라 법적 책임이 있을 수 있습니다.
                    </div>
                </div>
            </div>
    );
}
