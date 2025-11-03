'use client'
import NotebookChatbot from '@/components/chatbotForNote'
import { Plus, X } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import SourcesPage from '../_components/souces'
import { useNotebookModels } from '@/hooks/useModel'
import Loading from '@/components/ui/loading'

const NoteDashboard = () => {
        const [chat, setChat] = useState({collections:'',id:''})
    return (
        <div className='min-h-[90vh]  overflow-hidden p-2 w-full flex justify-between gap-3'>
            <Source setChat={setChat}/>
            <ChatCom chat={chat}/>
        </div>
    )
}

const Source = ({setChat} :{setChat:Dispatch< SetStateAction<{
    collections: string;
    id: string;
}>>}) => {
    const [show, setShow] = useState(false)
    const { data, isLoading } = useNotebookModels();
 
    return (
        <div className='border card bordercolor rounded-2xl w-[25%] mt-10'>
            <p className='rounded-t-2xl card p-2.5 text-gray-700'>Sources</p>

            <div className=' p-2'>
                <button onClick={() => setShow(true)} className='w-full my-4 py-2 gap-3 center border border-gray-600 rounded-full'> <Plus /> Sources</button>


                {show && <div className={` absolute  bottom-10 !h-[85vh] backdrop-blur-2xl rounded-3xl z-[100] left-20 w-[90%] bg-[#00000077] backdrop-blur-xl p-4 transition-all duration-300 ${show ? 'h-auto py-4' : 'h-0 py-0 overflow-hidden'}`}>
                    <button onClick={() => setShow(false)} className=' absolute top-4 right-6 text-gray-100 text-2xl hover:text-white' ><X /></button>
                    <SourcesPage />
                </div>}
                {
                    data && !isLoading ? <div className='p-2'>
                        <div className='flex flex-col gap-2'>
                            <h2>Select a note to chat</h2>
                            {
                                data?.res?.map((model: any, index: number) => (
                                    <div key={index} onClick={()=>setChat({collections:model.collection_name,id:model.id})} className='border p-2 cursor-pointer rounded-2xl text-cemter center bg-red-500/30 text-sm text-'>
                                        <p>{model.name ? model.name : model.source}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div> : isLoading ? <Loading boxes={7} child={' h-[30px]  w-full  rounded-2xl '} parent={' flex !flex-col h-[430px] w-full  '} /> :
                        <p className='mt-52 text-center  text-xs text-gray-500'>Saved sources will appear here Click Add source above to add PDFs, websites, text, videos or audio files. Or import a file directly from Google Drive.</p>
                }
            </div>


        </div>


    )
}
const ChatCom = ({chat}:{chat: { collections: string ;id: string}}) => {
    return (
        <div className='border bordercolor relative card rounded-2xl w-[75%] overflow-hi mt-10'>
            <p className=' card p-2.5 rounded-t-2xl text-gray-700'>Chat</p>

            <div className=' !pb-2 h-full'>
                <NotebookChatbot collections={chat.collections} id={chat.id} />
            </div>
        </div>
    )
}

export default NoteDashboard