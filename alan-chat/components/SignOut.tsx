'use client'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'


async function signOutUser() {
    await signOut(auth);
}

export default function SignOut() {
    return (
        <button onClick={signOutUser}>Sign-out</button>
    )
}
