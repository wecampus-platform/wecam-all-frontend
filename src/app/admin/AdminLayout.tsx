'use client';

interface AdminLayoutProps {
    title: string;
    description?: string;
    actionButton?: React.ReactNode;
    subtitle?: React.ReactNode;
    additionalContent?: React.ReactNode;
    mainContent: React.ReactNode;
}

export default function AdminLayout({ 
    title, 
    description,
    actionButton, 
    subtitle, 
    additionalContent, 
    mainContent 
}: AdminLayoutProps) {
    return (
        <div className="h-full w-full bg-gray1 flex flex-col">
            {/* 가장 오른쪽 공간 */}
            <div className="px-[76px] pt-6 w-full flex flex-col gap-8 flex-1">
                {/* 1번째 줄: 제목 + 버튼 영역 */}
                <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-row justify-center items-center">
                        <div className="flex-1">
                            <b className="relative text-[35px] font-pretendard text-darkslategray text-left">
                                {title}
                            </b>
                            {description && (
                                <div className="mt-2 text-gray6 text-base font-normal">
                                    {description}
                                </div>
                            )}
                        </div>
                        {actionButton && (
                            <div className="ml-auto">
                                {actionButton}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* 2번째 줄: 부가 영역 (부제목, 설명, 검색 등) */}
                {(subtitle || additionalContent) && (
                    <div className="w-full">
                        {subtitle && (
                            <div className="relative font-pretendard font-semibold text-left">
                                {subtitle}
                            </div>
                        )}
                        {additionalContent && (
                            <div>
                                {additionalContent}
                            </div>
                        )}
                    </div>
                )}
                
                {/* 3번째 줄: 메인 영역 */}
                <div className="flex rounded min-h-[500px]">
                    {mainContent}
                </div>
            </div>
        </div>
    );
}
