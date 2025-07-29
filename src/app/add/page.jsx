import SideBarPage from '@/app/main/side-bar';
import Header from '@/app/add/header'
import Form from '@/app/add/form'



export default function AddPage() {
    
    return(
        <div className="h-screen w-full bg-[#F5F7FA] flex overflow-hidden">
            <SideBarPage/>
            <div className="h-screen w-full flex flex-col mx-[60px]">
                <Header
                    submitLabel="등록하기"
                    titleComponent={
                    <h2 className="text-zinc-800 text-4xl font-bold">할 일 등록하기</h2>
                    }
                />
                <Form/>
            </div>  
            
        </div>
    )
}