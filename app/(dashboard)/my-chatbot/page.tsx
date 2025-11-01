'use client'
import Loading from '@/components/ui/loading'
import { useGetModels } from '@/hooks/useModel'
import { useQuery } from '@tanstack/react-query'
import { Bot, BotIcon, Dot, RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MyChatBot = () => {
  const { data, isLoading,refetchTimeTable } = useGetModels()
  return (
    <div className=' w-full min-h-screen '>

<div className=' flex justify-between px-5 '>
      <h1 className=' ml-5 text-4xl font-bold my-5 mt-10'>My Chatbots</h1>
      <button className='w-fit h-[50px] buttonbg px-4 center gap-3' onClick={()=>refetchTimeTable()}>Refetch <RefreshCcw size={20} /> </button>
</div>
      {
        isLoading ? (
          <Loading boxes={3} child={' h-[300px]  w-[500px] rounded-2xl '} parent={' !flex-row !flex-warp h-[400px] w-full '} />
        ) : (
          <div>
            {
              data?.status === 200 ? (
                <ul>
                  {
                    data.res.length === 0 ? (
                     <div className=' center flex-col gap-3 '>
                    <p>No ChatBot found</p>
                      <Link href={`/dashboard`} className=' center gap-3 flex-col'>
                        <BotIcon className=' bg-amber-200 p-3 rounded-2xl' size={48} />
                        <p className=' mt-3 '>Create your first chatbot by uploading documents or adding text in the  Dashboard  section.</p>
                      </Link>
                  </div>
                    ) : (
                      <div className=' flex gap-2.5 flex-wrap '>

                        {data.res.map((model: any) => (
                          <div className=' card rounded-2xl p-3 px-4 w-[500px] ' key={model.id}>

                            <div className=' flex items-center justify-between px-5 gap-2'>
                              <div className=' bg-amber-300 mb-3 p-2 w-fit rounded-xl'><Bot /> </div>
                              <div className=' flex items-end gap-2 flex-col'>
                                <div className=' bg-green-500/50 text-green-600 px-2 py-1 rounded-2xl center w-fit'> <Dot color='green' /> Active</div>
                                <p>Contex from : {model?.source?.toUpperCase()}</p>
                                <p>Conversations : {model?.times}</p>
                              </div>
                            </div>

                            <p className=' mt-5 text-zinc-600 text-sm'>Site Id : {model.collection_name}</p>
                            <p className=' mt-3 text-zinc-600 text-sm'>Model id : {model.id}</p>
                            <p className=' mt-3 text-zinc-600 text-sm'>Last active at : {model.updated_at.toLocaleString("en-US")}</p>
                            <p className=' mt-3 text-zinc-600 text-sm'>Created at : {model.created_at.toLocaleString("en-US")}</p>
                          </div>
                        ))}
                      </div>
                    )
                  }
                </ul>
              )
                : (
                  <div className=' center gap-3 '>
                    <p>no data found</p>

                  </div>
                )
            }
          </div>
        )
      }
      {/* <Loading boxes={2} child={' h-[220px]  w-[500px] rounded-2xl '} parent={' !flex-row !flex-wrap !justify-start h-[400px] w-full '} /> */}
    </div>
  )
}

export default MyChatBot