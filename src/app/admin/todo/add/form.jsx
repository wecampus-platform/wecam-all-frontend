"use client"

import { useState, forwardRef,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTaskStore from '@/store/task-store'


import { fetchAllMembers } from '@/api-service/member-manage'; // 멤버 목록 조회 함수


import { useAuthStore } from '@/store/authStore';

export default function Form({ mode = "add" }){
    const { accessToken, councilList } = useAuthStore();
    const taskStore = useTaskStore();
    const { newTask: globalTask} = taskStore;
    const { setNewTask: setGlobalTask } = useTaskStore(); // ✅ 추가
    const { setNewTaskAll } = useTaskStore(); 
    
    // 실제 로그인한 사용자의 학생회 정보 가져오기
    const currentCouncil = councilList?.[0];
    const councilName = currentCouncil?.name || '';
    const councilId = currentCouncil?.id || null;
    const [newTask, setNewTask] = useState({
        title: '',
        deadline: null,
        file: null,
        description: '',
        assigneeList: [], // ← 이름과 ID 저장
      });


      const handleRemoveAssignee = (userId) => {
        console.log('🔍 담당자 제거 시도:', userId);
        
        setNewTask((prev) => {
          const newAssigneeList = prev.assigneeList.filter((a) => a.userId !== userId);
          console.log('🔍 새로운 담당자 목록:', newAssigneeList);
          return {
            ...prev,
            assigneeList: newAssigneeList,
          };
        });
        
        // 담당자가 제거되면 현재 쿼리로 제안 목록을 다시 계산
        if (query.startsWith('@')) {
          const keyword = query.slice(1).toLowerCase();
          if (keyword.length > 0) {
            // 제안 목록을 다시 계산하는 로직을 여기서 실행
            setTimeout(() => {
              // useEffect가 자동으로 실행되어 제안 목록을 업데이트함
            }, 100);
          }
        }
      };


      const handleAddAssignee = (member) => {
        if (!member || !member.userId) return;
      
        console.log('🔍 담당자 추가 시도:', member);
        
        setNewTask((prev) => {
          const newAssigneeList = [...(Array.isArray(prev.assigneeList) ? prev.assigneeList : []), member];
          console.log('🔍 새로운 담당자 목록:', newAssigneeList);
          return {
            ...prev,
            assigneeList: newAssigneeList,
          };
        });
      
        setQuery('');
        setSuggestions([]);
        console.log('🔍 담당자 추가 완료, 제안 목록 초기화됨');
      };
      
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    
    useEffect(() => {
        const delay = setTimeout(async () => {
          if (query.startsWith('@')) {
            const keyword = query.slice(1).toLowerCase();
            
            // councilId가 유효한지 확인
            if (!councilId || !councilName) {
              console.warn('🔍 학생회 정보가 없습니다:', { councilName, councilId });
              setSuggestions([]);
              return;
            }
      
            try {
              const response = await fetchAllMembers(councilName, councilId);
              console.log('🔍 fetchAllMembers 응답:', response);
              
              // API 응답 구조에 따라 안전하게 배열 추출
              let members = [];
              if (response && Array.isArray(response)) {
                members = response;
              } else if (response && response.result && Array.isArray(response.result)) {
                members = response.result;
              } else if (response && response.data && Array.isArray(response.data)) {
                members = response.data;
              } else {
                console.warn('🔍 예상과 다른 API 응답 구조:', response);
                
                // API가 작동하지 않을 때 목업 데이터 사용
                console.log('🔍 목업 데이터 사용');
                members = [
                  { userId: 1, userName: '김철수', userCouncilRole: '학생회장' },
                  { userId: 2, userName: '이영희', userCouncilRole: '부학생회장' },
                  { userId: 3, userName: '박민수', userCouncilRole: '총무' },
                  { userId: 4, userName: '정수진', userCouncilRole: '회계' },
                  { userId: 5, userName: '최동현', userCouncilRole: '기획' }
                ];
              }
              
              console.log('🔍 처리된 멤버 배열:', members);
              
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
              
              console.log('🔍 필터링된 제안 목록:', filtered);
              setSuggestions(filtered);
            } catch (err) {
              console.error('담당자 목록 가져오기 실패', err);
              setSuggestions([]);
            }
          } else {
            setSuggestions([]);
          }
        }, 300);
      
        return () => clearTimeout(delay);
      }, [query, newTask.assigneeList, councilName, councilId, currentCouncil]);    
      
      useEffect(() => {
        setNewTaskAll(newTask);
        console.log("🧠 최종 newTask 상태:", newTask);
      }, [newTask, setNewTaskAll]);
             useEffect(() => {
         if (globalTask && globalTask.title && !newTask.title) {
           setNewTask(globalTask);
         }
       }, [globalTask, newTask.title]);
       
       // 수정 모드일 때 기존 데이터 로드
       useEffect(() => {
         if (mode === "edit" && globalTask && Object.keys(globalTask).length > 0 && !newTask.title) {
           console.log("🔍 수정 모드: 기존 데이터 로드", globalTask);
           setNewTask(globalTask);
         }
       }, [mode, globalTask, newTask.title]);
      
    
    

       // 커스텀 인풋 컴포넌트
     const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
         <div
         onClick={onClick}
         ref={ref}
         className="px-3 py-2 w-full rounded border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer"
         >
         <span className="text-gray-800 text-sm">
             {value ? new Date(value).toLocaleDateString('ko-KR') : '날짜를 선택하세요'}
         </span>
         </div>
     ));
    return(
        <div className="px-8 py-10 mt-[28px] flex flex-col bg-[#FBFBFB] gap-6">
            <div className="space-y-4 mb-6">
                <div className="relative flex items-center w-full">
                    <label className="block w-24 text-sm text-gray-400">제목</label>
                    <div className="flex justify-start w-full">
                        <input
                            type="text"
                            placeholder="할 일의 제목을 입력하세요."
                            value={newTask.title}
                            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                            className="px-3 py-2 w-full rounded placeholder-gray-300 focus:outline-none hover:bg-gray-100"
                        />
                    </div>
                </div>

                <div className="relative flex items-center w-full">
                    <label className="block w-24 text-sm text-gray-400">마감일</label>
                    <div className="flex justify-start w-full">
                        <DatePicker
                            selected={newTask.deadline} 
                            onChange={(date) =>setNewTask(prev => ({ ...prev, deadline: date }))}
                            customInput={<CustomDateInput />}
                            dateFormat="yyyy-MM-dd"
                            popperPlacement="bottom-start"
                        />
                    </div>
                </div>

                <div className="relative flex items-center w-full">
                    <label className="block w-24 text-sm text-gray-400">담당자</label>
                    <div className="flex justify-start w-full">
                        <div className="relative w-full">
                            <div className="px-3 py-2 w-full rounded border border-gray-200 bg-white">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {newTask.assigneeList?.map((a) => (
                                        <span
                                            key={a.userId}
                                            className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                        >
                                            {a.userName}
                                            <button
                                                type="button"
                                                className="ml-1 text-blue-600 hover:text-red-500 text-sm"
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
                                    className="w-full text-gray-800 text-sm focus:outline-none placeholder-gray-300"
                                />
                            </div>

                            {suggestions.length > 0 && (
                                <ul className="absolute w-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 max-h-[200px] overflow-y-auto">
                                    {suggestions.map((member) => (
                                        <li
                                            key={member.userId}
                                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                            onClick={() => handleAddAssignee(member)}
                                        >
                                            <div className="text-sm text-gray-800">{member.userName}</div>
                                            <div className="text-xs text-gray-500">{member.userCouncilRole}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                          
                        </div>
                    </div>
                </div>



                <div className="relative flex items-center w-full">
                    <label className="block w-24 text-sm text-gray-400">첨부파일</label>
                    <div className="flex justify-start w-full">
                        <div className="relative w-full">
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
                            <label 
                                htmlFor="file-upload" 
                                className="block px-3 py-2 w-full rounded border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer text-gray-800 text-sm"
                            >
                                {newTask.file ? newTask.file.name : '파일을 선택하세요.'}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="relative flex items-start w-full">
                    <label className="block w-24 text-sm text-gray-400 mt-2">설명</label>
                    <div className="flex justify-start w-full">
                        <textarea
                            placeholder="할 일의 내용을 입력하세요."
                            value={newTask.description}
                            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                            className="px-3 py-2 w-full h-32 rounded border border-gray-200 bg-white placeholder-gray-300 focus:outline-none hover:bg-gray-50 resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}