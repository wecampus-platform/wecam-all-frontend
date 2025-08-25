"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MeetingInfo from "@/app/admin/meeting/components/create/MeetingInfo";
import MeetingTextArea from "@/app/admin/meeting/components/create/entities/MeetingTextArea";
import MeetingInput from "@/app/admin/meeting/components/create/entities/MeetingInput";
import MeetingHeader from "@/app/admin/meeting/components/create/MeetingHeader";
import { getMeetingDetail, updateMeeting } from "@/api-service/meetingApi";
import { useAuthStore } from "@/store/authStore";
import { getMemberList, getCategoryList } from "@/api-service/meetingApi";
import SideBarPage from '@/components/side-bar';

interface MeetingDetail {
    meetingId: number;
    title: string;
    meetingDateTime: string;
    location: string;
    content: string;
    createdById: number;
    createdByName: string;
    categoryIds: number[];
    categoryNames: string[];
    attendees: {
        attendeeId: number;
        memberName: string;
        attendanceStatus: string;
        role: string;
    }[];
    files: {
        fildId: number;
        fileName: string;
        fileUrl: string;
        fileSize: number;
        fileType: string;
    }[];
    createdAt: string;
    updatedAt: string;
}

interface Member {
    userName: string;
    userCouncilRole: string;
    userId: number;
    exitType: string;
    expulsionReason: string | null;
    departmentRoleId: number | null;
    departmentId: number | null;
    departmentRole: string | null;
    departmentName: string | null;
}

interface Category {
    categoryId: number;
    categoryName: string;
}

export default function MeetingEditPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { councilName } = useAuthStore();
    const meetingId = searchParams.get('meetingId');

    const [meetingDetail, setMeetingDetail] = useState<MeetingDetail | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: "",
        date: "",
        location: "",
        content: "",
        participants: [] as number[],
        category: [] as number[],
        attachments: [] as File[],
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!councilName || !meetingId) {
                alert("회의록 ID가 필요합니다.");
                router.push('/admin/meeting/main');
                return;
            }

            try {
                setLoading(true);
                console.log('현재 councilName:', councilName);
                console.log('현재 meetingId:', meetingId);
                
                // 회의록 상세 정보는 필수이므로 먼저 가져옴
                const meetingData = await getMeetingDetail(councilName, meetingId);
                const meeting = meetingData.result;
                setMeetingDetail(meeting);
                
                // 폼 데이터 설정
                setForm({
                    title: meeting.title,
                    date: meeting.meetingDateTime.split('T')[0],
                    location: meeting.location,
                    content: meeting.content,
                    participants: meeting.attendees.map((attendee: { attendeeId: number }) => attendee.attendeeId),
                    category: meeting.categoryIds,
                    attachments: [],
                });
                
                // 멤버와 카테고리는 개별적으로 가져와서 에러가 발생해도 계속 진행
                try {
                    const membersData = await getMemberList(councilName);
                    console.log('멤버 데이터:', membersData);
                    setMembers(membersData);
                } catch (memberError) {
                    console.error('멤버 목록 조회 실패:', memberError);
                    setMembers([]);
                }
                
                try {
                    const categoriesData = await getCategoryList(councilName);
                    console.log('카테고리 데이터:', categoriesData);
                    setCategories(categoriesData);
                } catch (categoryError) {
                    console.error('카테고리 목록 조회 실패:', categoryError);
                    setCategories([]);
                }
                
            } catch (error) {
                console.error('데이터 로딩 실패:', error);
                alert("회의록 데이터를 불러오는데 실패했습니다.");
                router.push('/admin/meeting/main');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [councilName, meetingId, router]);

    const handleInputChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({
            ...prev,
            [key]: e.target.value
        }));
    };

    const handleAttachmentsChange = (files: File[]) => {
        setForm(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...files]
        }));
    };

    const addParticipant = (participantIds: number[]) => {
        setForm(prev => ({
            ...prev,
            participants: [...prev.participants, ...participantIds]
        }));
    };

    const removeParticipant = (participantId: number) => {
        setForm(prev => ({
            ...prev,
            participants: prev.participants.filter(id => id !== participantId)
        }));
    };

    const addCategory = (categoryIds: number[]) => {
        setForm(prev => ({
            ...prev,
            category: [...prev.category, ...categoryIds]
        }));
    };

    const removeCategory = (categoryId: number) => {
        setForm(prev => ({
            ...prev,
            category: prev.category.filter(id => id !== categoryId)
        }));
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex">
                <SideBarPage />
                <div className="px-[76px] w-full flex flex-col gap-8 bg-cream">
                    <div className="py-12">
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-600">로딩 중...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!meetingDetail) {
        return (
            <div className="h-screen w-full flex">
                <SideBarPage />
                <div className="px-[76px] w-full flex flex-col gap-8 bg-cream">
                    <div className="py-12">
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-600">회의록을 찾을 수 없습니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex">
            <SideBarPage />
            <div className="px-[76px] w-full flex flex-col gap-8 bg-cream">
                <div className="py-12">
                    <MeetingHeader
                        form={form}
                        resetForm={() => {
                            if (meetingDetail) {
                                setForm({
                                    title: meetingDetail.title,
                                    date: meetingDetail.meetingDateTime.split('T')[0],
                                    location: meetingDetail.location,
                                    content: meetingDetail.content,
                                    participants: meetingDetail.attendees.map(attendee => attendee.attendeeId),
                                    category: meetingDetail.categoryIds,
                                    attachments: [],
                                });
                            }
                        }}
                        onSave={async () => {
                            if (!councilName || !meetingDetail) return;

                            try {
                                // 클라이언트 측 유효성 검사
                                if (!form.title.trim()) { alert("회의록 제목을 입력해주세요."); return; }
                                if (!form.date) { alert("회의 일시를 선택해주세요."); return; }
                                if (!form.location.trim()) { alert("회의 장소를 입력해주세요."); return; }
                                if (form.participants.length === 0) { alert("참석자를 최소 1명 이상 선택해주세요."); return; }
                                if (form.category.length === 0) { alert("카테고리를 최소 1개 이상 선택해주세요."); return; }

                                const meetingData = {
                                    title: form.title.trim(),
                                    meetingDateTime: new Date(form.date).toISOString(),
                                    location: form.location.trim(),
                                    content: form.content.trim(),
                                    categoryIds: form.category,
                                    attendees: form.participants.map((participantId: number) => ({
                                        councilMemberId: participantId,
                                        attendanceStatus: "PRESENT",
                                        role: "ATTENDEE"
                                    }))
                                };

                                console.log('수정 요청 데이터:', meetingData);
                                const response = await updateMeeting(councilName, meetingDetail.meetingId, meetingData);
                                console.log('수정 응답:', response);
                                
                                alert("회의록이 성공적으로 수정되었습니다!");
                                // 페이지 새로고침을 위해 window.location 사용
                                window.location.href = '/admin/meeting/main';
                            } catch (error) {
                                console.error('회의록 수정 실패:', error);
                                alert("회의록 수정에 실패했습니다. 다시 시도해주세요.");
                            }
                        }}
                        isEdit={true}
                    />

                    <div className="bg-white p-10 rounded-lg shadow-sm">
                        <MeetingInput
                            placeholder="제목을 입력하세요."
                            value={form.title}
                            onChange={handleInputChange("title")}
                            customCSS="w-full text-4xl font-semibold mb-6 outline-none placeholder-gray-200"
                        />
                        <MeetingInfo
                            form={form}
                            handleInputChange={handleInputChange}
                            handleAttachmentsChange={handleAttachmentsChange}
                            addParticipant={addParticipant}
                            addCategory={addCategory}
                            removeCategory={removeCategory}
                            removeParticipant={removeParticipant}
                            members={members}
                            categories={categories}
                            readOnly={false}
                        />

                        <MeetingTextArea
                            value={form.content}
                            onChange={handleInputChange("content")}
                            readOnly={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
