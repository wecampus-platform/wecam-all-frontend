import { useMemo } from "react";

interface UseSelectedEntityPickerProps {
  query: string;
  suggestions: Entity[];
  normalizedSelected: Entity[];
}

export default function useSelectedEntityPicker({
  query,
  suggestions,
  normalizedSelected,
}: UseSelectedEntityPickerProps) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = uniqNormalizeEntities(suggestions);
    const notChosen = base.filter(
      (s) => !normalizedSelected.some((v) => v.id === s.id)
    );
    if (!q) return notChosen.slice(0, 50);
    return notChosen
      .filter((s) => s.name.toLowerCase().includes(q))
      .slice(0, 50);
  }, [query, suggestions, normalizedSelected]);

  return {
    filtered,
  };
}

export type Entity = { id: string; name: string; avatar?: string };

export function uniqNormalizeEntities(items: Entity[]) {
  const seen = new Set<string>();
  const out: Entity[] = [];
  for (const it of items) {
    if (!seen.has(it.id)) {
      seen.add(it.id);
      out.push(it);
    }
  }
  return out;
}
