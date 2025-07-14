import Image from "next/image";
import { PaperIcon, MedalIcon, SharpIcon } from "../components/icons/affiliationIcons";


const Component1 = () => {
    return (
        <div className="w-full relative rounded-lg bg-whitesmoke h-[553px] text-center text-2xl text-darkslategray font-pretendard">
            <div className="absolute top-[calc(50%_-_212.5px)] left-[calc(50%_-_281px)] w-[562px] flex flex-col items-center justify-start gap-6">
                <div className="self-stretch flex flex-col items-center justify-start gap-6">
                    <div className="self-stretch relative font-semibold">소속 인증 하기</div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-8 text-xl text-dimgray">
                        <div className="w-[166px] flex flex-col items-center justify-start gap-4">
                            <div className="w-[166px] rounded-lg bg-white border-silver border-solid border-[1px] box-border h-[156px] flex flex-col items-center justify-center py-4 px-5 gap-3">
                                <PaperIcon width={40} height={40} sizes="100vw"/>
                                <div className="relative font-medium">재학증명서 인증</div>
                                <div className="w-[126px] relative text-xs leading-[18px] text-left inline-block">학교에서 발급 받은 재학증명서로 소속을 인증합니다.</div>
                            </div>
                            <div className="self-stretch relative text-xs leading-[18px] text-silver text-left">재학증명서 발급이 어려운 개강 전 신입생의 경우, 합격증명서 인증을 통해 인증하실 수 있습니다.</div>
                        </div>
                        <div className="w-[166px] flex flex-col items-center justify-start gap-4">
                            <div className="w-[166px] rounded-lg bg-white border-silver border-solid border-[1px] box-border h-[156px] flex flex-col items-center justify-center py-4 px-5 gap-3">
                                <MedalIcon className="w-10 relative max-h-full" width={40} height={40} sizes="100vw" />
                                <div className="relative font-medium">합격증명서 인증</div>
                                <div className="self-stretch relative text-xs leading-[18px] text-left">입학 시 발급 받은 합격 증명서로 소속을 인증합니다.</div>
                            </div>
                            <div className="self-stretch flex flex-col items-start justify-start gap-2 text-left text-xs text-silver">
                                <div className="self-stretch relative leading-[18px]">합격증명서로 인증을 받더라도 개강 이후 재학증명서 인증이 반드시 필요합니다.</div>
                                <div className="self-stretch relative leading-[18px]">재학증명서 인증 완료까지는 제한된 기능만 사용할 수 있습니다.</div>
                                <div className="self-stretch relative leading-[18px]">개강 이후 매년 4월 5일까지 추가적인 재학증명서 인증이 이루어지지 않으면, 신입생 권한이 박탈됩니다.</div>
                            </div>
                        </div>
                        <div className="w-[166px] flex flex-col items-center justify-start gap-4">
                            <div className="w-[166px] rounded-lg bg-white border-silver border-solid border-[1px] box-border h-[156px] flex flex-col items-center justify-center py-4 px-5 gap-3">
                                <SharpIcon className="w-10 relative max-h-full overflow-hidden" width={40} height={40} sizes="100vw"/>
                                <div className="relative font-medium">간편 코드 인증</div>
                                <div className="w-[114px] relative text-xs leading-[18px] text-left inline-block">학교 학생회가 발급해준 인증코드로 인증합니다.</div>
                            </div>
                            <div className="self-stretch flex flex-col items-start justify-start gap-2 text-left text-xs text-silver">
                                <div className="self-stretch relative leading-[18px]">학교 학생회가 발급해준 인증코드로 인증합니다.</div>
                                <div className="self-stretch relative leading-[18px]">추가적인 인증이 필요없으며, 신입생 OT 등의 장소에서 유용하게 사용할 수 있습니다.</div>
                                <div className="self-stretch relative leading-[18px]">인증코드 유출을 최소화하기 위해 유효시간이 짧으니, 시간 내에 입력 부탁드립니다.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[367px] relative text-xs leading-4 text-gray inline-block">명의 도용, 학번, 증명서 위조 등 올바르지 않은 경로를 통해 인증을 시도할 경우, 공문서 위조 등 관련법에 따라 법적 책임이 있을 수 있습니다.</div>
            </div>
            <Image className="absolute top-[24px] left-[594px] w-6 h-6 overflow-hidden" width={24} height={24} sizes="100vw" alt="" src="icon/x.svg" />
        </div>);
};

export default Component1;
