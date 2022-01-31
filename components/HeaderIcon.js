import React from 'react'

function HeaderIcon({ Icon, active }) {
    return (
        <div className='flex items-center rounded-xl cursor-pointer hover:bg-gray-200 md:px-10 sm:h-14 active:border-b-2 
        border-blue-500 group'>
            {
                /* group >> making parent as group.
                   group-hover:text-blue-500 >> so when we hover Icons container it will give icon color blue
                */
            }
            <Icon className={`h-5 group-hover:text-blue-500 sm:h-7 mx-auto text-gray-500 
            ${active && 'text-blue-500'}`} />
        </div>
    )
}

export default HeaderIcon
