'use client'
import SignOut from './SignOut'
import ChatMessage from './ChatMessage'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { useState } from 'react'

interface ChatroomProps {
    user: User;
}

export default function Chatroom({ user }: ChatroomProps) {
    const [input, setInput] = useState('')

    // function for adding message (document) to collection in database
    async function addMessage() {
        try {
            const docRef = await addDoc(collection(db, "messages"),
                {
                    uid: user.uid,
                    name: user.displayName,
                    photoUrl: user.photoURL,
                    message: input,
                    createdAt: serverTimestamp()
                })
            setInput('')
            console.log("Document written with ID: ", docRef.id)
        }
        catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    return (
        <>
            <div>Chatroom</div>
            <form onSubmit={(e) => {
                e.preventDefault();
                addMessage();
            }}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button>Send</button>
            </form>
            <SignOut />
        </>
    )
}


