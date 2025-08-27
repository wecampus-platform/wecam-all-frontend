"use client";

import { useTaskModalStore } from "@/store/task-modal-store";
import useTaskStore from "@/store/task-store";
import { useEffect } from "react";
import Form from "../add/form";
import Header from "../add/header";

export default function EditPage() {
  const detail = useTaskModalStore();
  const { currentEditTodoId } = useTaskStore();

  useEffect(() => {
    if (!currentEditTodoId) {
      // 예외 처리하거나 redirect
      console.warn("todoId 없음");
    }
  }, [currentEditTodoId]);
  console.log("currentEditTodoId:", currentEditTodoId);

  return (
    <div className="h-screen w-full bg-[#F5F7FA] flex overflow-hidden">
      <div className="h-screen w-full flex flex-col mx-[60px]">
        <Header
          mode="edit"
          todoId={currentEditTodoId}
          titleComponent={
            <h2 className="text-4xl font-bold">할 일 수정하기</h2>
          }
        />
        <Form />
      </div>
    </div>
  );
}
