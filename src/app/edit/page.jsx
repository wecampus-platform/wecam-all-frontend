'use client';

import SideBarPage from '@/app/main/side-bar';
import Header from '@/app/add/header'
import Form from '@/app/add/form'
import { useTaskModalStore } from '@/app/store/task-modal-store';



export default function EditPage(){

  const detail = useTaskModalStore();
    return(
        <div className="h-screen w-full bg-[#F5F7FA] flex overflow-hidden">
            <SideBarPage/>
            <div className="h-screen w-full flex flex-col mx-[60px]">
                <Header
                    mode="edit"
                    todoId={detail.todoId}               // 모달에서 loadTaskToForm 후 전달
                    titleComponent={<h2 className="text-4xl font-bold">할 일 수정하기</h2>}
                />
                <Form/>
            </div>  
                    
        </div>

    )
            
    
}