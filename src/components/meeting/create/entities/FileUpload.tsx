"use client";

import AddButton from "@/components/meeting/create/entities/AddButton";
import { useRef } from "react";

interface FileUploadProps {
  onFilesSelected: (files: FileList | null) => void;
}

export default function FileUpload({ onFilesSelected }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      <AddButton onclick={handleClick} />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => onFilesSelected(e.target.files)}
      />
    </div>
  );
}
