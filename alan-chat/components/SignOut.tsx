'use client'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'


async function signOutUser() {
    await signOut(auth);
}

export default function SignOut() {
    return auth.currentUser && (
        <button className="hover:opacity-70 p-1 font-bold bg-[#ec4444] rounded-lg" onClick={signOutUser}>Sign-out</button>
    )
}
