"use client"

import { useState, forwardRef,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTaskStore from '@/store/task-store'


import { fetchCouncilMembers } from '@/api-service/adminTodoApi'; // 네가 만든 함수 경로에 맞게 import


import { useAuthStore } from '@/store/authStore';

export default function Form(){
    const { accessToken } = useAuthStore();
    const taskStore = useTaskStore();
    const { newTask: globalTask} = taskStore;
    const { setNewTask: setGlobalTask } = useTaskStore(); // ✅ 추가
    const { setNewTaskAll } = useTaskStore(); 
    const councilName = "위캠퍼스";
    const councilId = 4;
    const [newTask, setNewTask] = useState({
        title: '',
        deadline: null,
        file: null,
        description: '',
        assigneeList: [], // ← 이름과 ID 저장
      });


      const handleRemoveAssignee = (userId) => {
        setNewTask((prev) => ({
          ...prev,
          assigneeList: prev.assigneeList.filter((a) => a.userId !== userId),
        }));
      };


      const handleAddAssignee = (member) => {
        if (!member || !member.userId) return;
      
        setNewTask((prev) => ({
          ...prev,
          assigneeList: [...(Array.isArray(prev.assigneeList) ? prev.assigneeList : []), member],
        }));
        console.log("newTask",newTask)
      
        setQuery('');
        setSuggestions([]);
        console.log(newTask.assigneeList);
      };
      
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    
    useEffect(() => {
        const delay = setTimeout(async () => {
          if (query.startsWith('@')) {
            const keyword = query.slice(1).toLowerCase();
      
            try {
              const members = await fetchCouncilMembers(accessToken, councilName, councilId);
              const filtered = members
              .filter((member) => {
                const name = (member.userName || '').toLowerCase();
                const role = (member.userCouncilRole || '').toLowerCase();
                return name.includes(keyword) || role.includes(keyword);
              })
              .filter((member) => {
                // 이미 선택된 사람은 제외
                return !newTask.assigneeList.some((a) => a.userId === member.userId);
              });
              
              setSuggestions(filtered);
            } catch (err) {
              console.error('담당자 목록 가져오기 실패', err);
            }
          } else {
            setSuggestions([]);
          }
        }, 300);
      
        return () => clearTimeout(delay);
      }, [query]);    
      
      useEffect(() => {
        setNewTaskAll(newTask);
        console.log("🧠 최종 newTask 상태:", newTask);
      }, [newTask, setGlobalTask]);
      useEffect(() => {
        if (globalTask && globalTask.title && !newTask.title) {
          setNewTask(globalTask);
        }
      }, [globalTask]);
      
    
    

   // 커스텀 인풋 컴포넌트
    const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
        <div
        onClick={onClick}
        ref={ref}
        className="w-[1000px] p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-500 inline-flex justify-start items-start gap-1 cursor-pointer"
        >
        <span className="text-zinc-800 text-xl font-normal">
            {value || '이곳을 눌러 달력에서 날짜를 선택하세요.'}
        </span>
        </div>
    ));
    return(
        <div className="px-8 py-10 mt-[28px] flex flex-col bg-[#FBFBFB] gap-3">
            <div className="self-stretch justify-start text-zinc-600 text-2xl font-semibold ">제목 입력하기</div>
            
            <div
            data-click="unclicked"
            data-input="O"
            className="w-[1000px] p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-500 inline-flex justify-start items-start gap-1"
            >
                <input
                    type="text"
                    placeholder="할 일의 제목을 입력하세요."
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full text-zinc-800 text-xl font-normal focus:outline-none"
                />
            </div>

            <div className="self-stretch justify-start text-zinc-600 text-2xl font-semibold ">마감일 선택하기</div>

            <DatePicker
                selected={newTask.deadline} 
                onChange={(date) =>setNewTask(prev => ({ ...prev, deadline: date }))}
                customInput={<CustomDateInput />}
                dateFormat="yyyy-MM-dd"
                popperPlacement="bottom-start"
            />

            <div className="self-stretch justify-start text-zinc-600 text-2xl font-semibold ">담당자 입력하기</div>



            <div className="relative w-[1000px]">
  <div className="p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-500">
<div className="flex flex-wrap gap-2 mb-2">
  {newTask.assigneeList?.map((a) => (
    <span
      key={a.userId}
      className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
    >
      {a.userName}
      <button
        type="button"
        className="ml-1 text-gray-500 hover:text-red-500 text-sm"
        onClick={() => handleRemoveAssignee(a.userId)}
      >
        ✕
      </button>
    </span>
  ))}
</div>
    <input
      type="text"
      placeholder="@를 입력하고 담당자 이름을 입력하세요."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === ' ' && suggestions.length > 0 && suggestions[0]) {
          e.preventDefault();
          handleAddAssignee(suggestions[0]);
        }
      }}
      className="w-full text-zinc-800 text-xl font-normal focus:outline-none"
    />
  </div>

  {suggestions.length > 0 && (
    <ul className="absolute w-full mt-1 bg-white border rounded shadow z-10 max-h-[200px] overflow-y-auto">
      {suggestions.map((member) => (
        <li
          key={member.userId}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleAddAssignee(member)}
        >
          <div className="text-sm text-black">{member.userName}</div>
          <div className="text-xs text-gray-500">{member.userCouncilRole}</div>
        </li>
      ))}
    </ul>
  )}
</div>



            <div className="self-stretch justify-start text-zinc-600 text-2xl font-semibold">첨부파일 등록하기</div>

            <div className="w-[1000px] p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-500 inline-flex justify-between items-center">
              <label htmlFor="file-upload" className="text-zinc-800 text-xl font-normal cursor-pointer">
                {newTask.file ? newTask.file.name : '파일을 선택하세요.'}
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setNewTask((prev) => ({ ...prev, file }));
                  }
                }}
              />
            </div>

            <div className="self-stretch justify-start text-zinc-600 text-2xl font-semibold ">설명 입력하기</div>
            <div
                data-click="unclicked"
                data-input="X"
                className="w-[1000px] h-[170px] p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-500 inline-flex justify-start items-start"
                >
                <textarea
                    placeholder="할 일의 내용을 입력하세요."
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full h-full resize-none text-zinc-800 text-xl font-normal focus:outline-none"
                />
                </div>
        </div>
    )
}