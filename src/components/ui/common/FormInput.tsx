// components/common/FormInput.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 🔥 추가
};

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-6">
      <Label className="block mb-2 text-sm font-medium text-gray-700">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-point rounded-md px-4 py-3"
      />
    </div>
  );
}
