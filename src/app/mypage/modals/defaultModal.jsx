import Image from "next/image";
import { PaperIcon, MedalIcon, SharpIcon } from "../../components/icons/affiliationIcons";
import { XIcon } from '@/app/components/icons/check-icons';


export function DefaultModal({ onClose }) {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-5">
            <button onClick={onClose} className="flex ml-auto">
                <XIcon />
            </button>
            <div className="w-full relative text-2xl font-semibold font-pretendard text-darkslategray text-center mt-12">소속 인증 하기</div>
            <div className="flex flex-row gap-10 px-20 py-5">
                <div className="flex flex-col flex-1 gap-6">
                    <button className="border border-gray3 rounded-lg flex flex-col items-center justify-center text-center gap-4 px-[20px] py-[16px] ">
                        <PaperIcon />
                        <div className="text-xl font-medium font-pretendard text-gray4 text-center">재학증명서 인증</div>
                        <div className="text-xs leading-[18px] font-pretendard text-gray4">학교에서 발급 받은 재학증명서로 <br /> 소속을 인증합니다.</div>
                    </button>
                    <div className="text-gray3 text-left">
                        재학증명서 발급이 어려운 개강 전 신입생의 경우, 합격증명서 인증을 통해 인증하실 수 있습니다.
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-6">
                    <button className="border border-gray3 rounded-lg flex flex-col items-center justify-center text-center gap-4 px-[20px] py-[16px] ">
                        <MedalIcon />
                        <div className="text-xl font-medium font-pretendard text-gray4 text-center">합격증명서 인증</div>
                        <div className="text-xs leading-[18px] font-pretendard text-gray4">입학 시 발급 받은 합격 증명서로 <br /> 소속을 인증합니다.</div>
                    </button>
                    <div className="flex flex-col gap-2 text-gray3 text-left">
                        <div>
                            합격증명서로 인증을 받더라도 개강 이후 재학증명서 인증이 반드시 필요합니다.
                        </div>
                        <div>
                            재학증명서 인증 완료까지는 제한된 기능만 사용할 수 있습니다.
                        </div>
                        <div>
                            개강 이후 매년 4월 5일까지 추가적인 재학증명서 인증이 이루어지지 않으면, 신입생 권한이 박탈됩니다.
                        </div>
                    </div>

                </div>

                <div className="flex flex-col flex-1 gap-6">
                    <button className="border border-gray3 rounded-lg flex flex-col items-center justify-center text-center gap-4 px-[20px] py-[16px]">
                        <SharpIcon />
                        <div className="text-xl font-medium font-pretendard text-gray4 text-center">간편 코드 인증</div>
                        <div className="w-[126px] relative text-xs leading-[18px] font-pretendard text-gray4">학교 학생회가 발급한 인증코드로 인증합니다.</div>
                    </button>
                    <div className="flex flex-col gap-2 text-gray3 text-left">
                        <div>
                            학교 학생회가 발급해준 인증코드로 인증합니다.
                        </div>
                        <div>
                            추가적인 인증이 필요없으며, 신입생 OT 등의 장소에서 유용하게 사용할 수 있습니다.
                        </div>
                        <div>
                            인증코드 유출을 최소화하기 위해 유효시간이 짧으니, 시간 내에 입력 부탁드립니다.
                        </div>
                    </div>

                </div>

            </div>
            <div className="text-gray3 mb-12">
                명의 도용, 학번, 증명서 위조 등 올바르지 않은 경로를 통해 인증을 시도할 경우, <br /> 공문서 위조 등 관련법에 따라 법적 책임이 있을 수 있습니다.</div>
        </div>
    );
};

