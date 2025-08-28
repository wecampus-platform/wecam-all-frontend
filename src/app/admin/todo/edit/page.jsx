"use client";

import { useTaskModalStore } from "@/store/task-modal-store";
import useTaskStore from "@/store/task-store";
import { useEffect } from "react";
import Form from "../add/form";
import Header from "../add/header";

export default function EditPage() {
  const detail = useTaskModalStore();
  const { currentEditTodoId, setNewTask } = useTaskStore();

  useEffect(() => {
    if (!currentEditTodoId) {
      // 예외 처리하거나 redirect
      console.warn("todoId 없음");
      return;
    }

    // 할 일 상세 정보가 있으면 폼에 설정
    if (detail && detail.currentTodo) {
      const todoData = detail.currentTodo;
      console.log("🔍 수정할 할 일 데이터:", todoData);
      
      // 이미 설정된 데이터가 있는지 확인하여 중복 설정 방지
      const newTaskData = {
        title: todoData.title || '',
        deadline: todoData.deadline ? new Date(todoData.deadline) : null,
        file: todoData.file || null,
        description: todoData.description || '',
        assigneeList: todoData.assigneeList || [],
      };
      
      // Form 컴포넌트에서 사용할 수 있도록 전역 상태에 설정
      setNewTask(newTaskData);
    }
  }, [currentEditTodoId, detail, setNewTask]);

  console.log("currentEditTodoId:", currentEditTodoId);
  console.log("detail:", detail);

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
        <Form mode="edit" />
      </div>
    </div>
  );
}
