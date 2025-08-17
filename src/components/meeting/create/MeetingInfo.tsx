import AddButton from "@/components/meeting/create/entities/AddButton";
import CategoryChips from "@/components/meeting/create/entities/CategoryChips";
import FileUpload from "@/components/meeting/create/entities/FileUpload";
import MeetingInput from "@/components/meeting/create/entities/MeetingInput";
import MeetingInputField from "@/components/meeting/create/entities/MeetingInputField";
import ParticipationChips from "@/components/meeting/create/entities/ParticipationChips";
import EntityPicker from "@/components/meeting/create/modals/EntityPicker";
import { Entity } from "@/hooks/meeting/useSelectedEntityPicker";
import { useState } from "react";

export const PARTICIPANT_SUGGESTIONS: Entity[] = [
  { id: "p1", name: "홍길동", avatar: "https://example.com/avatar1.png" },
  { id: "p2", name: "김철수", avatar: "https://example.com/avatar2.png" },
  { id: "p3", name: "이영희", avatar: "https://example.com/avatar3.png" },
  { id: "p4", name: "박지민", avatar: "https://example.com/avatar4.png" },
  { id: "p5", name: "최준호", avatar: "https://example.com/avatar5.png" },
];

export const CATEGORY_SUGGESTIONS: Entity[] = [
  { id: "c1", name: "기획 회의" },
  { id: "c2", name: "개발 회의" },
  { id: "c3", name: "디자인 회의" },
  { id: "c4", name: "마케팅 회의" },
  { id: "c5", name: "운영 회의" },
];

export default function MeetingInfo({
  form,
  handleInputChange,
  handleAttachmentsChange,
  addParticipant,
  addCategory,
  removeCategory,
  removeParticipant,
}) {
  const [openEntityPicker, setOpenEntityPicker] = useState(false);

  const [openParticipantPicker, setOpenParticipantPicker] = useState(false);

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
          <AddButton onclick={() => setOpenParticipantPicker(true)} />
          {openParticipantPicker && (
            <EntityPicker
              suggestions={PARTICIPANT_SUGGESTIONS}
              value={form.participants}
              onChange={addParticipant}
              placeholder="아래에서 참석자를 선택하세요"
              onRemove={removeParticipant}
              onCloseModal={() => setOpenParticipantPicker(false)}
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
          )}
        </MeetingInputField>

        <MeetingInputField label="카테고리">
          <AddButton onclick={() => setOpenEntityPicker(true)} />
          {openEntityPicker && (
            <EntityPicker
              suggestions={CATEGORY_SUGGESTIONS}
              value={form.category}
              onChange={addCategory}
              placeholder="카테고리를 선택하거나, 새 카테고리 이름을 입력하세요."
              onRemove={removeCategory}
              onCloseModal={() => setOpenEntityPicker(false)}
              renderEntity={(item, selected, onClick) => (
                <CategoryChips
                  key={item.id}
                  onClick={onClick}
                  selected={selected}
                >
                  {item.name}
                </CategoryChips>
              )}
            />
          )}
        </MeetingInputField>

        <MeetingInputField label="첨부파일">
          <FileUpload onFilesSelected={handleAttachmentsChange} />
        </MeetingInputField>
      </div>
    </>
  );
}
