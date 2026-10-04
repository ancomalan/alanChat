'use client'
import { auth, provider } from '../lib/firebase'
import { signInWithPopup } from 'firebase/auth'

async function signInUser() {
    await signInWithPopup(auth, provider);
}

export default function SignIn() {
    return (

        <main className="flex flex-col gap-8 min-h-screen justify-center items-center">
            <h1 className='bg-[#5865f2] rounded-full p-7 text-center text-9xl font-extrabold'>alanChat</h1>
            <h1 className='text-2xl text-center'>A real-time chat app inspired by Discord. </h1>
            <button className='bg-[#5865f2] p-4 rounded-md hover:opacity-70' onClick={signInUser}>Sign-in</button>
        </main>

    )
}

