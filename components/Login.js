import Image from 'next/image'
import React from 'react'
// as we have setup already, so simply setup
import { signIn } from 'next-auth/client'

function Login() {
    return (
        <div className='grid place-items-center items-center'>

            <Image src="https://links.papareact.com/t4i" height={400} width={400} objectFit='contain' />

            {/* onClick={signIn} >> signIn is the inbuilt function for logging in */}
            <h1 onClick={signIn} className='p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer'>
                Login with Facebook</h1>
        </div>
    )
}

export default Login
