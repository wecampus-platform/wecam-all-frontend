import CategoryChips from "@/components/meeting/create/entities/CategoryChips";
import FileUpload from "@/components/meeting/create/entities/FileUpload";
import MeetingEntityPickerField from "@/components/meeting/create/entities/MeetingEntityPickerField";
import MeetingInput from "@/components/meeting/create/entities/MeetingInput";
import MeetingInputField from "@/components/meeting/create/entities/MeetingInputField";
import ParticipationChips from "@/components/meeting/create/entities/ParticipationChips";
import {
  CATEGORY_SUGGESTIONS,
  PARTICIPANT_SUGGESTIONS,
} from "@/mocks/meeting/create/meetingInfo";

export default function MeetingInfo({
  form,
  handleInputChange,
  handleAttachmentsChange,
  addParticipant,
  addCategory,
  removeCategory,
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

        <MeetingEntityPickerField
          label="참석자"
          value={form.participants}
          suggestions={PARTICIPANT_SUGGESTIONS}
          onAdd={addParticipant}
          onRemove={removeParticipant}
          placeholder="아래에서 참석자를 선택하세요"
          allowCreate={false}
          renderEntity={(item, selected, onClick) => (
            <ParticipationChips
              key={item.id}
              onClick={onClick}
              selected={selected}
              avatar={item.avatar || ""}
            >
              {item.name}
            </ParticipationChips>
          )}
        />

        <MeetingEntityPickerField
          label="카테고리"
          value={form.category}
          suggestions={CATEGORY_SUGGESTIONS}
          onAdd={addCategory}
          onRemove={removeCategory}
          placeholder="카테고리를 선택하거나, 새 카테고리 이름을 입력하세요."
          renderEntity={(item, selected, onClick) => (
            <CategoryChips key={item.id} onClick={onClick} selected={selected}>
              {item.name}
            </CategoryChips>
          )}
        />

        <MeetingInputField label="첨부파일">
          <FileUpload onFilesSelected={handleAttachmentsChange} />
        </MeetingInputField>
      </div>
    </>
  );
}
