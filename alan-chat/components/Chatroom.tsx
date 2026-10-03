'use client'
import SignOut from './SignOut'
import ChatMessage from './ChatMessage'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, QueryDocumentSnapshot } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

interface ChatroomProps {
    user: User;
}

export default function Chatroom({ user }: ChatroomProps) {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<QueryDocumentSnapshot[]>([]);
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

    // start listener once after initial render
    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messageDocs = querySnapshot.docs // this is array of all documents in Messages collection
            setMessages(messageDocs)
        })
        return () => unsubscribe()// turn off listener when component unmounts
    }, [])


    return (
        <>
            <section>
                <h1>Chatroom</h1>
                <ul>
                    {messages.map((doc) => (<ChatMessage key={doc.id} messageDoc={doc} />))}
                </ul>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addMessage();
                }}>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button>Send</button>
                </form>

            </section>

            <SignOut />
        </>
    )
}


