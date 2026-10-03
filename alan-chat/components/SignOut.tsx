'use client'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'


async function signOutUser() {
    await signOut(auth);
}

export default function SignOut() {
    // only logout if user signed-in
    return auth.currentUser && (
        <button onClick={signOutUser}>Sign-out</button>
    )
}
