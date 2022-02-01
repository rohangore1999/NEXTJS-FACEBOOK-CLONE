import Image from 'next/image'
import React from 'react'
import { BellIcon, ChatIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ViewGridIcon } from '@heroicons/react/solid'
import { FlagIcon, PlayIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import HeaderIcon from './HeaderIcon'
import { signOut, useSession } from 'next-auth/client'



function Header() {
    // to get the authenticated user details
    const [session] = useSession()
    return (
        <div className='flex items-center sticky top-0 z-50 shadow-md bg-white lg:px-5 h-16 px-2'>
            {/* left */}
            <div className='flex items-center '>
                <Image src={'https://links.papareact.com/5me'} width={40} height={40} layout='fixed' />

                <div className='flex items-center bg-gray-100 rounded-full ml-2 p-2'>
                    <SearchIcon className='h-6 text-gray-600' />
                    <input className='hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink' type="text" placeholder='Search Facebook' />
                </div>
            </div>

            {/* center */}
            <div className='flex justify-center flex-grow'>
                <div className='flex space-x-6 md:space-x-2'>
                    <HeaderIcon Icon={HomeIcon} active />
                    <HeaderIcon Icon={FlagIcon} />
                    <HeaderIcon Icon={PlayIcon} />
                    <HeaderIcon Icon={ShoppingCartIcon} />
                    <HeaderIcon Icon={UserGroupIcon} />

                </div>
            </div>

            {/* right */}
            <div className='flex items-center sm:space-x-2 justify-end'>
                {/* Profile Pic */}
                <Image onClick={signOut} src={session.user.image} className='rounded-full cursor-pointer' width={'40'} height={'40'} layout='fixed' />
                
                <p className='hidden sm:flex font-semibold pr-3 whitespace-nowrap'>{session?.user?.name}</p>
                <ViewGridIcon className='icon' />
                <ChatIcon className='icon' />
                <BellIcon className='icon' />
                <ChevronDownIcon className='icon' />
            </div>
        </div>
    )
}

export default Header
