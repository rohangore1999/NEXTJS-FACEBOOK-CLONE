import { useSession } from 'next-auth/client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { db, storage } from '../firebase'
import firebase from 'firebase'

function InputBox() {
    const [session] = useSession()

    // useRef() to track the input
    const inputRef = useRef(null)

    // for file to post
    const filepickerRef = useRef(null)


    // state to retain selected image
    const [imageToPost, setImageToPost] = useState(null);


    const sendPost = (e) => {
        e.preventDefault() // as we are using form that's why form will refresh

        // if the input is field the return
        if (!inputRef.current.value) return;

        // else push to db

        // in our db >>> post >>> add our data
        {/* 
            FLOW:
                1) We will store data into posts
                2) if user selected img then upload it in firebase storage, and create a downloadable URL
                3) After getting downloadable URL then update our existed data with that URL.

        */}
        db.collection('posts').add({
            message: inputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(doc => {
            // after posting that data to database it will give up the document as the response
            if (imageToPost) {
                // if user selected the image which posting
                // ref(`posts/${doc.id}`) >> it will store under posts/<with_doc_id>
                // .putString(imageToPost, 'data_url') >> as imageToPost is the base64 string so we are converting to data_url format and storing
                const uploadTask = storage.ref(`posts/${doc.id}`).putString(imageToPost, 'data_url')

                // after uploading we will remove the image
                removeImage();

                // uploadTask (state listener) >> 'state_change' -> when statechange of any reason
                //  null >> progress bar set to null we dont need
                // err >> if any error then console it
                //  () => {}  >> when the upload img successfully
                uploadTask.on('state_change', null, err => console.error(err), () => {
                    // when upload completed
                    // we will get the downloadable url then store that url in our firestore db under posts >> current doc.id
                    // as we are using .set({},{merge:true}) in imp else it will overwrite
                    storage.ref(`posts/${doc.id}`).getDownloadURL().then(url => {
                        // update postImage in existed data
                        db.collection('posts').doc(doc.id).set({
                            postImage: url
                        }, { merge: true })
                    })
                })
            }
        })


        // to clear input field
        inputRef.current.value = '';
    }


    // when file selected 
    const addImageToPost = (e) => {
        // if we select the file we will get in the event

        // to read file
        const reader = new FileReader()

        // if we have file, then we will read that file as an data url
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        // after reading when it comes back, reader.onload >> async func it will wait till data come 
        // and store it in our useState

        // reader.onload >> will return some value and that we are setting 
        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result)
        }
    }


    // helper function to remove the image
    const removeImage = () => {
        setImageToPost(null)
    }

    return (
        <div className='bg-white p-2 rounded-2xl text-gray-500 font-medium mt-6 shadow-md'>
            <div className='flex space-x-4 p-4 items-center'>
                <Image src={session.user.image} className='rounded-full' width={40} height={40} layout='fixed' />

                <form className='flex flex-1'>
                    {/* ref={inputRef} >> referrence to our input field */}
                    <input ref={inputRef} type="text" placeholder={`What's on your mind, ${session.user.name}?`} className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none placeholder:text-xs placeholder:font-semibold' />
                    <button hidden type='submit' onClick={sendPost}>Submit</button>
                </form>

                {/* if we have the image then priview it */}
                {imageToPost && (
                    <div onClick={removeImage} className='flex flex-col filter hover:brightness-110 transition duration-150 transform scale-105 hover:scale-125 cursor-pointer'>
                        {/* if you click on the image it will remove it */}
                        <img src={imageToPost} alt="" className='h-10 object-contain rounded-xl' />
                        <p className='text-xs text-red-500 text-center'>Remove</p>
                    </div>
                )}
            </div>

            <div className='flex justify-evenly p-3 border-t'>
                <div className='inputIcon'>
                    <VideoCameraIcon className='h-7 text-red-500' />
                    <p className='text-xs sm:text-sm xl:text-base whitespace-nowrap'>Live Video</p>
                </div>

                {/* IMPORTANT */}
                {/* as we have used reference filepickerRef for the below input, so check we click on the Photo/Video button with the help of the reference we will call that hidden input field and the window will open without actually click on that hidden input field*/}

                <div onClick={() => filepickerRef.current.click()} className='inputIcon'>
                    <CameraIcon className='h-7 text-green-400' />
                    <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>

                    {/* below input is hidden and also it will accept file, onChange >>> when submit then trigger function and a ref pointer */}
                    <input hidden type="file" onChange={addImageToPost} ref={filepickerRef} />
                </div>

                <div className='inputIcon'>
                    <EmojiHappyIcon className='h-7 text-yellow-300' />
                    <p className='text-xs sm:text-sm xl:text-base'>Feelings</p>
                </div>

            </div>
        </div>
    )
}

export default InputBox
