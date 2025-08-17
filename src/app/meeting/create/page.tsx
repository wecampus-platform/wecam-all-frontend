// app/meeting-minutes/new/page.tsx
"use client";

import MeetingInput from "@/components/meeting/create/entities/MeetingInput";
import MeetingTextArea from "@/components/meeting/create/entities/MeetingTextArea";
import MeetingHeader from "@/components/meeting/create/MeetingHeader";
import MeetingInfo from "@/components/meeting/create/MeetingInfo";
import { useMeetingForm } from "@/hooks/useMeetingForm";

export default function MeetingCreatePage() {
  const {
    form,
    handleInputChange,
    addParticipant,
    removeParticipant,
    handleAttachmentsChange,
    resetForm,
  } = useMeetingForm();

  return (
    <div className="py-12 px-12 bg-[#F5F7FA] min-h-screen">
      <MeetingHeader form={form} resetForm={resetForm} />

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
          removeParticipant={removeParticipant}
        />
        <MeetingTextArea
          value={form.content}
          onChange={handleInputChange("content")}
        />
      </div>
    </div>
  );
}
