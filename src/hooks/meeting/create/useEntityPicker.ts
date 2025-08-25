import { Entity } from "@/hooks/meeting/create/useSelectedEntityPicker";

interface UseEntityPickerProps {
  onChange: (next: Entity[]) => void;
  normalizedSelected: Entity[];
  suggestions: Entity[];
  allowCreate?: boolean;
  setQuery: (query: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onRemove?: (entity: Entity) => void;
}

export default function useEntityPicker({
  onChange,
  normalizedSelected,
  suggestions,
  allowCreate = true,
  setQuery,
  inputRef,
  onRemove,
}: UseEntityPickerProps) {
  const tryAdd = (entity: Entity) => {
    if (normalizedSelected.some((v) => v.id === entity.id)) return;

    if (!allowCreate) {
      const existsInSuggestions = suggestions.some((s) => s.id === entity.id);
      if (!existsInSuggestions) return;
    }

    onChange([...normalizedSelected, entity]);
    setQuery("");
    inputRef.current?.focus();
  };

  const remove = (entity: Entity) => {
    onChange(normalizedSelected.filter((v) => v.id !== entity.id));
    onRemove?.(entity);
  };

  return {
    tryAdd,
    remove,
  };
}
