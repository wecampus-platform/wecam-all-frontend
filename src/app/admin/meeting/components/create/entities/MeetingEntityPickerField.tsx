import AddButton from "@/app/admin/meeting/components/create/entities/AddButton";
import MeetingInputField from "@/app/admin/meeting/components/create/entities/MeetingInputField";
import EntityPicker from "@/app/admin/meeting/components/create/modals/EntityPicker";
import { Entity } from "@/hooks/meeting/create/useSelectedEntityPicker";
import { useState } from "react";

type EntityFieldProps = {
  label: string;
  value: Entity[];
  suggestions: Entity[];
  onAdd: (next: Entity[]) => void;
  onRemove: (removed: Entity) => void;
  placeholder: string;
  allowCreate?: boolean;
  renderEntity: (
    entity: Entity,
    value: boolean,
    onClick?: () => void
  ) => React.ReactNode;
};

export default function MeetingEntityPickerField({
  label,
  value,
  suggestions,
  onAdd,
  onRemove,
  placeholder,
  allowCreate = true,
  renderEntity,
}: EntityFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <MeetingInputField label={label}>
      <div className="flex items-center gap-2">
        {value.length > 0 &&
          value.map((item) => renderEntity(item, true, () => onRemove(item)))}
        <AddButton onclick={() => setOpen(true)} />
      </div>

      {open && (
        <EntityPicker
          suggestions={suggestions}
          value={value}
          onChange={onAdd}
          placeholder={placeholder}
          onRemove={onRemove}
          onCloseModal={() => setOpen(false)}
          allowCreate={allowCreate}
          renderEntity={renderEntity}
        />
      )}
    </MeetingInputField>
  );
}
