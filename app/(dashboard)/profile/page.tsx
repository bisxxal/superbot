'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import React from 'react'

const Profile = () => {
  const { data: session, status } = useSession()
  return (
    <div className=' w-full min-h-screen overflow-hidden'>
      <div className="card mt-[50px] mx-auto relative backdrop-blur-lg border border-[#313244]/50 rounded-2xl p-8 max-md:p-4 shadow-2xl max-w-md w-[90%] text-center">
        <div className=' absolute right-10 top-5  max-md:right-5 '>
          <button className="w-full border bg-gradient-to-br from-red-500/70 to-rose-500/40 border-red-500/30  cursor-pointer rounded-full font-bold px-5  p-2" onClick={() => signOut()}> <LogOut /> </button>
        </div>
        <div>
          {status !== 'loading' && session && (
            <div className='flex flex-col items-center justify-center'>
              <Image src={session.user?.image!} alt='profile' width={100} height={100} className='rounded-full w-24 h-24' />
              <h2 className='text-xl font-semibold'>{session.user?.name}</h2>
              <p className='text-gray-600 mt-5'>Signed as {session.user?.email}</p>
            </div>
          )}
        </div>

        
      </div>
      <div className=' w-fit mx-auto mt-20 max-md:mt-32 text-4xl flex items-center justify-center'>🤖
      </div>

    </div>
  )
}

export default Profile