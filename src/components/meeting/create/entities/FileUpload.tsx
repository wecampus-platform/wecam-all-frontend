"use client";

import AddButton from "@/components/meeting/create/entities/AddButton";
import { useRef, useState } from "react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

export default function FileUpload({ onFilesSelected }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList);
    const updated = [...files, ...newFiles];
    setFiles(updated);
    onFilesSelected(updated);
  };

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesSelected(updated);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* 파일 칩들 */}
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center rounded-full border border-blue-500 px-3 py-1 text-sm text-blue-600"
        >
          <span className="truncate max-w-[120px]">{file.name}</span>
          <button
            onClick={() => handleRemove(index)}
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            ✕
          </button>
        </div>
      ))}

      {/* 추가 버튼 */}
      <AddButton onclick={handleClick} />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleChange(e.target.files)}
      />
    </div>
  );
}
