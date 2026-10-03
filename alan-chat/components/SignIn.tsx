'use client'
import { auth, provider } from '../lib/firebase'
import { signInWithPopup } from 'firebase/auth'

async function signInUser() {
    await signInWithPopup(auth, provider);
}

export default function SignIn() {
    return (
        <>
            <h1>Please Sign-in to access alanChat!</h1>
            <button onClick={signInUser}>Sign-in</button>
        </>

    )
}

