'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Tabs = () => {
    const s = usePathname()
    return (
        <div className=" flex items-center !mt-[100px] gap-3">
           
            <Link href="/my-chatbot">
                <div className={` ${s === '/my-chatbot' ? ' textbg border-b-2 border-amber-500 ' : ' text-gray-400 '} px-4 py-2 inline-block mb-6 `}>
                    My Chatbots
                </div>
            </Link> 
            <Link href="/dashboard">
                <div className={` ${s === '/dashboard' ? ' textbg border-b-2 border-amber-500 ' : ' text-gray-400 '} px-4 py-2 inline-block mb-6 `}>
                    Uplaod Content
                </div>
            </Link>
            <Link href="/scripts">
                <div className={` ${s === '/scripts' ? ' textbg border-b-2 border-amber-500 ' : ' text-gray-400 '} px-4 py-2 inline-block mb-6 `}>
                    Generate Scripts
                </div>
            </Link>

            <Link href="/subscription">
                <div className={` ${s === '/subscription' ? ' textbg border-b-2 border-amber-500 ' : ' text-gray-400 '} px-4 py-2 inline-block mb-6 `}>
                    Subscription
                </div>
            </Link>
            <Link href="/profile">
                <div className={` ${s === '/profile' ? ' textbg border-b-2 border-amber-500 ' : ' text-gray-400 '} px-4 py-2 inline-block mb-6 `}>
                    Profile
                </div>
            </Link>

        </div>
    )
}

export default Tabs