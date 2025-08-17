import AddButton from "@/components/meeting/create/entities/AddButton";
import FileUpload from "@/components/meeting/create/entities/FileUpload";
import MeetingInput from "@/components/meeting/create/entities/MeetingInput";
import MeetingInputField from "@/components/meeting/create/entities/MeetingInputField";
import { ChangeEvent } from "react";

export default function MeetingInfo({
  form,
  handleInputChange,
  handleAttachmentsChange,
  addParticipant,
  removeParticipant,
}) {
  return (
    <>
      <div className="space-y-4 mb-6">
        <MeetingInputField label="일시">
          <MeetingInput
            value={form.date}
            onChange={handleInputChange("date")}
            type="date"
          />
        </MeetingInputField>

        <MeetingInputField label="장소">
          <MeetingInput
            placeholder="회의 장소를 입력하세요."
            value={form.location}
            onChange={handleInputChange("location")}
          />
        </MeetingInputField>

        <MeetingInputField label="참석자">
          <AddButton onclick={() => addParticipant("홍길동")} />
        </MeetingInputField>

        <MeetingInputField label="카테고리">
          <AddButton onclick={() => console.log("카테고리 추가")} />
        </MeetingInputField>

        <MeetingInputField label="첨부파일">
          <FileUpload onFilesSelected={handleAttachmentsChange} />
        </MeetingInputField>
      </div>
    </>
  );
}
