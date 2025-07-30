'use client';
import { create } from 'zustand';

const useTaskStore = create((set) => ({
  /* ====== 새 할 일 / 수정 할 일 폼 ====== */
  newTask: {
    title: '',
    description: '',
    deadline: null,
    file: '',
    assigneeList: [],
  },


  currentEditTodoId: null, // 수정할 todoId 저장용

  setCurrentEditTodoId: (id) => set({ currentEditTodoId: id }),


  setNewTaskAll: (task) => set(() => ({ newTask: task })),

  /* ① 단일 필드 변경 */
  setNewTask: (key, value) =>
    set((s) => ({ newTask: { ...s.newTask, [key]: value } })),

  /* ② 상세 객체로 한 번에 채우기 */
  loadTaskToForm: (detail) =>
    set(() => ({
      newTask: {
        title: detail.title,
        assigneeList: detail.managers || [],
        description: detail.content,
        // 문자 → Date 객체 변환 (DatePicker용)
        deadline: detail.dueAt ? new Date(detail.dueAt) : null,
        file: detail.files?.[0]?.originalFileName || null,
      },
    })),

  /* ====== 목록 액션 예시 ====== */
  tasks: [],
  addTask: (task) => set((s) => ({ tasks: [...s.tasks, task] })),
}));

export default useTaskStore;
