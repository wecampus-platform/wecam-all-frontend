import { create } from 'zustand';

const useTaskStore = create((set) => ({
  newTask: {
    title: '',
    assignee: '',
    description: '',
    deadline: null,
  },
  setNewTask: (key, value) =>
    set((state) => ({
      newTask: { ...state.newTask, [key]: value },
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...(state.tasks || []), task],
    })),
  tasks: [],
}));

export default useTaskStore;
