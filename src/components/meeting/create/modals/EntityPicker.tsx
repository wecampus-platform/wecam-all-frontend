import useEntityPicker from "@/hooks/meeting/create/useEntityPicker";
import useSelectedEntityPicker, {
  Entity,
  uniqNormalizeEntities,
} from "@/hooks/meeting/create/useSelectedEntityPicker";
import { useClickOutside } from "@/hooks/useOutsideClick";
import { useMemo, useRef, useState } from "react";

export type EntityPickerProps = {
  suggestions: Entity[];
  value: Entity[];
  onChange: (next: Entity[]) => void;
  placeholder: string;
  allowCreate?: boolean;
  onRemove: (removed: Entity) => void;
  onCloseModal: () => void;
  renderEntity: (
    entity: Entity,
    value: boolean,
    onRemove?: () => void
  ) => React.ReactNode;
};

export default function EntityPicker({
  suggestions,
  value,
  onChange,
  placeholder,
  allowCreate = true,
  onRemove,
  onCloseModal,
  renderEntity,
}: EntityPickerProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, onCloseModal);

  const normalizedSelected = useMemo(
    () => uniqNormalizeEntities(value),
    [value]
  );

  const { filtered } = useSelectedEntityPicker({
    query,
    suggestions,
    normalizedSelected,
  });

  const { tryAdd, remove } = useEntityPicker({
    onChange,
    normalizedSelected,
    suggestions,
    allowCreate,
    setQuery,
    inputRef,
    onRemove,
  });

  return (
    <div
      ref={wrapperRef}
      className={"w-full max-w-xl absolute top-0 left-16 bg-white z-10 "}
    >
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap gap-2 mb-2 min-h-[2rem]">
          {normalizedSelected.map((item) =>
            renderEntity(item, true, () => remove(item))
          )}
        </div>

        <label className="relative block">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                tryAdd({ id: query, name: query });
              }
            }}
            className="w-full rounded-xl px-2 py-2 text-sm text-gray-700 border border-gray-200 
             focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 min-h-[2.25rem]"
            placeholder={placeholder}
          />
        </label>

        <div className="mt-3 flex flex-wrap gap-2">
          {filtered.length === 0 ? (
            <span className="text-sm text-gray-500">추천 항목이 없습니다.</span>
          ) : (
            filtered.map((item) =>
              renderEntity(item, false, () => tryAdd(item as any))
            )
          )}
        </div>
      </div>
    </div>
  );
}
