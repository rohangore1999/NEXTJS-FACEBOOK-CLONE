import Image from 'next/image'
import React, { useState } from 'react'

import { ChatAltIcon, ShareIcon } from '@heroicons/react/outline'
import { ThumbUpIcon } from '@heroicons/react/solid'



function Post({ name, email, message, postImage, image, timestamp }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className='flex flex-col'>
            <div className='p-5 bg-white mt-5 rounded-t-2xl shadow-sm'>
                <div className='flex items-center space-x-2'>
                    <img className='rounded-full' src={image} width={40} height={40} alt="" />

                    <div className=''>
                        <p className='font-medium'>{name}</p>

                        {/* checking if the timestamp getting from server and as we are not passing timestamp from the server until the real data get loaded it will show loading... */}
                        {timestamp ? (
                            <p className='text-xs text-gray-400'>
                                {new Date(timestamp?.toDate()).toLocaleString()}
                            </p>
                        ) : (
                            <p className='text-xs text-gray-400'>loading...</p>
                        )}
                    </div>
                </div>

                <p className='pt-4'>{message}</p>
            </div>

            {postImage && (
                <div className='relative h-56 md:h-96 bg-white'>
                    <Image src={postImage} objectFit='contain' layout='fill' />
                </div>
            )}

            {/* Footer of post */}
            <div className='flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t'>

                <div className='inputIcon rounded-none rounded-bl-2xl transform transition duration-150 group' onClick={() => { setLiked(!liked) }}>
                    <ThumbUpIcon className={`h-4 transform transition duration-150 hover:scale-125 active:scale-150 group-active:scale-150 ${liked ? 'text-blue-500' : 'text-gray-500'}`} />
                    <p className='text-xs sm:text-base'>Like</p>
                </div>

                <div className='inputIcon rounded-none'>
                    <ChatAltIcon className='h-4' />
                    <p className='text-xs sm:text-base'>Comment</p>
                </div>

                <div className='inputIcon rounded-none rounded-br-2xl'>
                    <ShareIcon className='h-4' />
                    <p className='text-xs sm:text-base'>Share</p>
                </div>

            </div>
        </div>
    )
}

export default Post
