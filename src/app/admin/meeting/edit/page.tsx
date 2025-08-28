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
                console.error("회의록 ID가 필요합니다.");
                router.push('/admin/meeting/main');
                return;
            }

            try {
                setLoading(true);
                console.log('현재 councilName:', councilName);
                console.log('현재 meetingId:', meetingId);
                
                                 // 멤버와 카테고리를 먼저 가져와서 참석자 이름을 제대로 표시할 수 있도록 함
                 let membersData: Member[] = [];
                 let categoriesData: Category[] = [];
                 
                 try {
                   membersData = await getMemberList(councilName);
                   console.log('🔍 멤버 데이터:', membersData);
                   console.log('🔍 멤버 데이터 타입:', typeof membersData);
                   console.log('🔍 멤버 데이터 길이:', Array.isArray(membersData) ? membersData.length : '배열 아님');
                   setMembers(membersData);
                 } catch (memberError) {
                   console.error('멤버 목록 조회 실패:', memberError);
                   setMembers([]);
                 }
                 
                 try {
                   categoriesData = await getCategoryList(councilName);
                   console.log('카테고리 데이터:', categoriesData);
                   setCategories(categoriesData);
                 } catch (categoryError) {
                   console.error('카테고리 목록 조회 실패:', categoryError);
                   setCategories([]);
                 }
                 
                 // 회의록 상세 정보 가져오기
                 const meetingData = await getMeetingDetail(councilName, meetingId);
                 const meeting = meetingData.result;
                 setMeetingDetail(meeting);
                 
                 // 폼 데이터 설정 (멤버 데이터가 로드된 후에 설정)
                 console.log('🔍 회의록 데이터:', meeting);
                 console.log('🔍 참석자 데이터:', meeting.attendees);
                 
                 const participantIds = meeting.attendees.map((attendee: { attendeeId: number }) => attendee.attendeeId);
                 console.log('🔍 추출된 참석자 ID:', participantIds);
                 
                                    // 멤버 데이터가 있는지 확인하고 참석자 이름 검증
                   if (Array.isArray(membersData) && membersData.length > 0) {
                     console.log('🔍 참석자 ID 검증:');
                     participantIds.forEach((id: number) => {
                       const member = membersData.find(m => m.userId === id);
                       console.log(`  - ID ${id}: ${member ? member.userName : '찾을 수 없음'}`);
                     });
                   }
                 
                 setForm({
                   title: meeting.title,
                   date: meeting.meetingDateTime.split('T')[0],
                   location: meeting.location,
                   content: meeting.content,
                   participants: participantIds,
                   category: meeting.categoryIds,
                   attachments: [],
                 });
                
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
                console.error("회의록 데이터를 불러오는데 실패했습니다.");
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

    // form 상태 변경 시 참석자 데이터 확인
    useEffect(() => {
        console.log('🔍 form 상태 변경:', form);
        console.log('🔍 현재 참석자:', form.participants);
        console.log('🔍 현재 멤버:', members);
    }, [form, members]);

    const handleAttachmentsChange = (files: FileList | null) => {
        if (!files) return;
        const fileArray = Array.from(files);
        setForm(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...fileArray]
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
                                if (!form.title.trim()) { 
                                    console.error("회의록 제목을 입력해주세요."); 
                                    return; 
                                }
                                if (!form.date) { 
                                    console.error("회의 일시를 선택해주세요."); 
                                    return; 
                                }
                                if (!form.location.trim()) { 
                                    console.error("회의 장소를 입력해주세요."); 
                                    return; 
                                }
                                if (form.participants.length === 0) { 
                                    console.error("참석자를 최소 1명 이상 선택해주세요."); 
                                    return; 
                                }
                                if (form.category.length === 0) { 
                                    console.error("카테고리를 최소 1개 이상 선택해주세요."); 
                                    return; 
                                }

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
                                
                                console.log("회의록이 성공적으로 수정되었습니다!");
                                // 수정 완료 후 메인 페이지로 이동하고 데이터 새로고침
                                router.push('/admin/meeting/main?refresh=true');
                            } catch (error) {
                                console.error('회의록 수정 실패:', error);
                                console.error("회의록 수정에 실패했습니다. 다시 시도해주세요.");
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
