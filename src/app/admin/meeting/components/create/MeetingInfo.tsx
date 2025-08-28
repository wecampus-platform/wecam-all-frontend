import CategoryChips from "@/app/admin/meeting/components/create/entities/CategoryChips";
import FileUpload from "@/app/admin/meeting/components/create/entities/FileUpload";
import MeetingInput from "@/app/admin/meeting/components/create/entities/MeetingInput";
import MeetingInputField from "@/app/admin/meeting/components/create/entities/MeetingInputField";
import ParticipationChips from "@/app/admin/meeting/components/create/entities/ParticipationChips";
import MeetingEntityPickerField from "@/app/admin/meeting/components/create/entities/MeetingEntityPickerField";
import {
  Member,
  Category,
  MeetingFormState,
} from "@/hooks/meeting/create/useMeetingForm";

export default function MeetingInfo({
  form,
  handleInputChange,
  handleAttachmentsChange,
  addParticipant,
  addCategory,
  removeCategory,
  removeParticipant,
  members,
  categories,
  readOnly = false,
}: {
  form: MeetingFormState;
  handleInputChange: (
    key: keyof MeetingFormState
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAttachmentsChange: (files: FileList | null) => void;
  addParticipant: (participantIds: number[]) => void;
  addCategory: (categoryIds: number[]) => void;
  removeCategory: (categoryId: number) => void;
  removeParticipant: (participantId: number) => void;
  members: Member[];
  categories: Category[];
  readOnly?: boolean;
}) {
  // 디버깅을 위한 로그
  console.log('🔍 MeetingInfo props:', { 
    participants: form.participants, 
    members: members.length,
    readOnly 
  });
  return (
    <>
      <div className="space-y-4 mb-6">
        <MeetingInputField label="일시">
          <MeetingInput
            value={form.date}
            onChange={handleInputChange("date")}
            type="date"
            disabled={readOnly}
          />
        </MeetingInputField>

        <MeetingInputField label="장소">
          <MeetingInput
            placeholder="회의 장소를 입력하세요."
            value={form.location}
            onChange={handleInputChange("location")}
            disabled={readOnly}
          />
        </MeetingInputField>

        <MeetingInputField label="참석자">
          {readOnly ? (
            <div className="flex flex-wrap gap-2">
              {form.participants.map((id: number, index: number) => {
                const member = members.find((m) => m.userId === id);
                return (
                  <ParticipationChips key={`participant-${id}-${index}`} avatar="" readOnly={true}>
                    {member?.userName || ""}
                  </ParticipationChips>
                );
              })}
            </div>
          ) : (
                         <MeetingEntityPickerField
               label="참석자 선택"
               value={form.participants.map((id: number) => {
                 const member = members.find((m) => m.userId === id);
                 console.log('🔍 참석자 매핑:', { id, member, members: members.length });
                 
                 // 멤버를 찾을 수 없는 경우에도 기본 정보 제공
                 if (!member) {
                   console.warn(`🔍 멤버 ID ${id}를 찾을 수 없습니다.`);
                   console.warn(`🔍 사용 가능한 멤버 ID들:`, members.map(m => m.userId));
                 }
                 
                 return {
                   id: id.toString(),
                   name: member?.userName || `참석자 ${id}`,
                   avatar: "",
                 };
               }).filter(item => item.name && item.name !== '')}
               suggestions={members.map((member) => ({
                 id: member.userId.toString(),
                 name: member.userName,
                 avatar: "",
               }))}
              onAdd={(entities) => {
                const ids = entities.map((e) => parseInt(e.id));
                addParticipant(ids);
              }}
              onRemove={(entity) => {
                removeParticipant(parseInt(entity.id));
              }}
              placeholder="참석자를 선택하세요"
              allowCreate={false}
              readOnly={false}
              renderEntity={(entity, selected, onClick) => (
                <ParticipationChips
                  key={`participant-picker-${entity.id}`}
                  avatar={entity.avatar || ""}
                  readOnly={false}
                  onClick={onClick}
                >
                  {entity.name}
                </ParticipationChips>
              )}
            />
          )}
        </MeetingInputField>

        <MeetingInputField label="카테고리">
          {readOnly ? (
            <div className="flex flex-wrap gap-2">
              {form.category.map((id: number, index: number) => {
                const category = categories.find((c) => c.categoryId === id);
                return (
                  <CategoryChips key={`category-${id}-${index}`} readOnly={true}>
                    {category?.categoryName || ""}
                  </CategoryChips>
                );
              })}
            </div>
          ) : (
            <MeetingEntityPickerField
              label="카테고리 선택"
              value={form.category.map((id) => {
                const category = categories.find((c) => c.categoryId === id);
                return {
                  id: id.toString(),
                  name: category?.categoryName || "",
                  avatar: "",
                };
              })}
              allowCreate={false}
              suggestions={categories.map((category) => ({
                id: category.categoryId.toString(),
                name: category.categoryName,
                avatar: "",
              }))}
              onAdd={(entities) => {
                const ids = entities.map((e) => parseInt(e.id));
                addCategory(ids);
              }}
              onRemove={(entity) => {
                removeCategory(parseInt(entity.id));
              }}
              placeholder="카테고리를 선택하세요"
              readOnly={false}
              renderEntity={(entity, selected, onClick) => (
                <CategoryChips
                  key={`category-picker-${entity.id}`}
                  readOnly={false}
                  onClick={onClick}
                >
                  {entity.name}
                </CategoryChips>
              )}
            />
          )}
        </MeetingInputField>

        {!readOnly && (
          <MeetingInputField label="첨부파일">
            <FileUpload onFilesSelected={handleAttachmentsChange} />
          </MeetingInputField>
        )}
      </div>
    </>
  );
}
