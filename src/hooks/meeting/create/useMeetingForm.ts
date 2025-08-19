"use client";

import { useState, ChangeEvent } from "react";

export interface MeetingFormState {
  title: string;
  date: string;
  location: string;
  participants: string[];
  category: string[];
  attachments: File[];
  content: string;
}

export function useMeetingForm() {
  const [form, setForm] = useState<MeetingFormState>({
    title: "",
    date: "",
    location: "",
    participants: [],
    category: [],
    attachments: [],
    content: "",
  });

  const updateField = <K extends keyof MeetingFormState>(
    key: K,
    value: MeetingFormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange =
    (key: keyof MeetingFormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateField(key, e.target.value as any);
    };

  const addParticipant = (name: string[]) => {
    setForm((prev) => ({
      ...prev,
      participants: [...name],
    }));
  };

  const addCategory = (category: string[]) => {
    setForm((prev) => ({
      ...prev,
      category: [...category],
    }));
  };

  const removeCategory = (category: string) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c !== category),
    }));
  };

  const removeParticipant = (name: string) => {
    setForm((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p !== name),
    }));
  };

  const handleAttachmentsChange = (files: FileList | null) => {
    if (files) {
      updateField("attachments", Array.from(files));
    }
  };

  const resetForm = () =>
    setForm({
      title: "",
      date: "",
      location: "",
      participants: [],
      category: [],
      attachments: [],
      content: "",
    });

  return {
    form,
    updateField,
    handleInputChange,
    addParticipant,
    addCategory,
    removeCategory,
    handleAttachmentsChange,
    resetForm,
    removeParticipant,
  };
}
