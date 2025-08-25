"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { getMemberList, getCategoryList } from "@/api-service/meetingApi";
import { useAuthStore } from "@/store/authStore";

export interface Member {
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

export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface MeetingFormState {
  title: string;
  date: string;
  location: string;
  participants: number[]; // councilMemberId 배열
  category: number[]; // categoryId 배열
  attachments: File[];
  content: string;
}

export function useMeetingForm() {
  const { councilName } = useAuthStore();
  const [form, setForm] = useState<MeetingFormState>({
    title: "",
    date: "",
    location: "",
    participants: [],
    category: [],
    attachments: [],
    content: "",
  });
  const [members, setMembers] = useState<Member[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // 멤버 목록과 카테고리 목록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (!councilName) return;
      
      setLoading(true);
      try {
        // 멤버와 카테고리를 개별적으로 가져와서 에러가 발생해도 계속 진행
        try {
          const membersData = await getMemberList(councilName);
          setMembers(membersData);
        } catch (memberError) {
          console.error('멤버 목록 조회 실패:', memberError);
          setMembers([]);
        }
        
        try {
          const categoriesData = await getCategoryList(councilName);
          setCategories(categoriesData);
        } catch (categoryError) {
          console.error('카테고리 목록 조회 실패:', categoryError);
          setCategories([]);
        }
      } catch (error) {
        console.error('데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [councilName]);

  const updateField = <K extends keyof MeetingFormState>(
    key: K,
    value: MeetingFormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange =
    (key: keyof MeetingFormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateField(key, e.target.value);
    };

  const addParticipant = (participantIds: number[]) => {
    setForm((prev) => ({
      ...prev,
      participants: [...participantIds],
    }));
  };

  const addCategory = (categoryIds: number[]) => {
    setForm((prev) => ({
      ...prev,
      category: [...categoryIds],
    }));
  };

  const removeCategory = (categoryId: number) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c !== categoryId),
    }));
  };

  const removeParticipant = (participantId: number) => {
    setForm((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p !== participantId),
    }));
  };

  const handleAttachmentsChange = (files: FileList | null) => {
    if (files) {
      updateField("attachments", Array.from(files));
    }
  };

  const resetForm = () =>
    setForm({
      title: "",
      date: "",
      location: "",
      participants: [],
      category: [],
      attachments: [],
      content: "",
    });

  return {
    form,
    updateField,
    handleInputChange,
    addParticipant,
    addCategory,
    removeCategory,
    handleAttachmentsChange,
    resetForm,
    removeParticipant,
    members,
    categories,
    loading,
  };
}
