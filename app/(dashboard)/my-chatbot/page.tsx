'use client'
import { userModels } from '@/action/user.action'
import Loading from '@/components/ui/loading'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const MyChatBot = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['my-chatbot'],
    queryFn: async () => {
      return await userModels()
    }
  })

  console.log(data)
  return (
    <div className=' w-full min-h-screen '>

      <h1 className=' ml-5 text-4xl font-bold my-5 mt-10'>My Chatbots</h1>

      {
        isLoading ? (
         <Loading boxes={3} child={' h-32 rounded-2xl '} parent={' h-[400px] '} />
        ) : (
          <div>
            {
              data?.status === 200 ? (
                <ul>
                  {
                    data.res.length === 0 ? (
                      <p>No models found</p>
                    ) : (
                      <div className=' flex gap-2.5 flex-wrap '>

                        {data.res.map((model: any) => (
                          <div className=' card rounded-2xl p-3 px-4 w-[500px] ' key={model.id}>
                            <p>Collection Name :{model.collection_name}</p>
                            <p>Model id : {model.id}</p>
                            <p>Created at : {model.created_at.toLocaleString("en-US")}</p>
                            <p>Contex from : {model.typeOf}</p>
                          </div>
                        ))}
                      </div>
                    )
                  }
                </ul>
              )
                : (
                  <p>no data found</p>
                )
            }
          </div>
        )
      }
       <Loading boxes={3} child={' h-32  w-[500px] rounded-2xl '} parent={' !flex-row !flex-warp h-[400px] w-full '} />
    </div>
  )
}

export default MyChatBot