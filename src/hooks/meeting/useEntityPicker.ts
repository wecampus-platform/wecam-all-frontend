import { Entity } from "@/hooks/meeting/useSelectedEntityPicker";

export default function useEntityPicker({
  onChange,
  normalizedSelected,
  suggestions,
  allowCreate = true,
  setQuery,
  inputRef,
  onRemove,
}) {
  const setSelected = (next: string[]) => {
    onChange(next);
  };

  const tryAdd = (entity: Entity) => {
    if (normalizedSelected.some((v) => v.id === entity.id)) return;

    if (!allowCreate) {
      const existsInSuggestions = suggestions.some((s) => s.id === entity.id);
      if (!existsInSuggestions) return;
    }

    setSelected([...normalizedSelected, entity]);
    setQuery("");
    inputRef.current?.focus();
  };

  const remove = (entity: Entity) => {
    setSelected(normalizedSelected.filter((v) => v.id !== entity.id));
    onRemove?.(entity);
  };

  return {
    tryAdd,
    remove,
    setSelected,
  };
}
