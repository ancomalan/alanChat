'use client'
import { auth, provider, db } from '../lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

function signInUser() {
    // also saves them to users collection if successful sign-in
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user
        setDoc(doc(db, "users", user.uid),
            {
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL
            },
            { merge: true })
    }).catch((error) => console.log(error.message))
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

