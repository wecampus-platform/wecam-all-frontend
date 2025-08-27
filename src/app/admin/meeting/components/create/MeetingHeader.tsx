'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { createMeeting } from '@/api-service/meetingApi';

import { MeetingFormState } from '@/hooks/meeting/create/useMeetingForm';

export default function MeetingHeader({ 
  form, 
  resetForm, 
  onSave,
  isEdit = false 
}: { 
  form: MeetingFormState; 
  resetForm: () => void;
  onSave?: () => Promise<void>;
  isEdit?: boolean;
}) {
  const router = useRouter();
  const { councilName } = useAuthStore();

  const handleSave = async () => {
    // onSave가 제공된 경우 (수정 모드) 그것을 사용
    if (onSave) {
      await onSave();
      return;
    }

    // 기본 생성 로직
    try {
      // 필수 필드 유효성 검사
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

      // API 요청을 위한 데이터 변환
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

      const success = await createMeeting(councilName, meetingData);
      if (success) {
        console.log("회의록이 성공적으로 저장되었습니다!");
        resetForm();
        router.push('/admin/meeting/main');
      } else {
        console.error("회의록 저장에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error('회의록 저장 실패:', error);
      alert("회의록 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleExit = () => {
    router.push('/admin/meeting/main');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        {isEdit ? (
          <>
            <h1 className="text-2xl mb-2">회의록 수정</h1>
            <p className="text-sm text-gray-400">
              회의록 내용을 수정한 후 우측의 저장하기 버튼을 눌러주세요.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl mb-2 ">회의록 작성하기</h1>
            <p className="text-sm text-gray-400">
              회의록 작성 이후 반드시 우측의 저장하기 버튼을 눌러주세요.
            </p>
          </>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-sm"
        >
          저장하기
        </button>
        <button 
          onClick={handleExit}
          className="px-4 py-2 bg-white text-gray-400 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          나가기
        </button>
      </div>
    </div>
  );
}
