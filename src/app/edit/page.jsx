import SideBarPage from '@/app/side-bar';
import Header from '@/app/add/header'
import Form from '@/app/add/form'



export default function EditPage(){
    return(
        <div className="h-screen w-full bg-[#F5F7FA] flex overflow-hidden">
            <SideBarPage/>
            <div className="h-screen w-full flex flex-col mx-[60px]">
                <Header submitLabel="수정하기"/>
                <Form/>
            </div>  
                    
        </div>

    )
            
    
}