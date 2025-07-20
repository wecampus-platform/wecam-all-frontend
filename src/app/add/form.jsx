"use client"

import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTaskStore from '@/app/store/task-store'


export default function Form(){
    const { newTask, setNewTask } = useTaskStore();


    

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
                    onChange={(e) => setNewTask('title', e.target.value)}
                    className="w-full text-zinc-800 text-xl font-normal focus:outline-none"
                />
            </div>

            <div className="self-stretch justify-start text-zinc-600 text-2xl font-semibold ">마감일 선택하기</div>

            <DatePicker
                selected={newTask.deadline} 
                onChange={(date) => setNewTask('deadline', date)}
                customInput={<CustomDateInput />}
                dateFormat="yyyy-MM-dd"
                popperPlacement="bottom-start"
            />

            <div className="self-stretch justify-start text-zinc-600 text-2xl font-semibold ">담당자 입력하기</div>

            <div
            data-click="unclicked"
            data-input="O"
            className="w-[1000px] p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-500 inline-flex justify-start items-start gap-1"
            >
                <input
                    type="text"
                    placeholder="@를 입력하고 담당자 이름을 입력하세요."
                    value={newTask.assignee}
                    onChange={(e) => setNewTask('assignee', e.target.value)}
                    className="w-full text-zinc-800 text-xl font-normal focus:outline-none"
                />
            </div>

            <div className="self-stretch justify-start text-zinc-600 text-2xl font-semibold ">첨부파일 등록하기</div>

            <div
            data-click="unclicked"
            data-input="O"
            className="w-[1000px] p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-500 inline-flex justify-start items-start gap-1"
            >
                <input
                    type="text"
                    placeholder="@를 입력하고 담당자 이름을 입력하세요."
                    value={newTask.file}
                    onChange={(e) => setNewTask('file', e.target.value)}
                    className="w-full text-zinc-800 text-xl font-normal focus:outline-none"
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
                    onChange={(e) => setNewTask('description', e.target.value)}
                    className="w-full h-full resize-none text-zinc-800 text-xl font-normal focus:outline-none"
                />
                </div>
        </div>
    )
}