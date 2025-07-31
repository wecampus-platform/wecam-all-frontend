import SideBarPage from '@/components/side-bar';
import Header from './header'
import Form from './form'



export default function AddPage() {
    
    return(
        <div className="h-screen w-full bg-[#F5F7FA] flex overflow-hidden">
            <SideBarPage/>
            <div className="h-screen w-full flex flex-col mx-[60px]">
                <Header
                    mode="create"
                    titleComponent={<h2 className="text-4xl font-bold">할 일 등록하기</h2>}
                />
                    <Form/>
            </div>  
            
        </div>
    )
}