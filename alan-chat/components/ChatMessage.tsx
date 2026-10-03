'use client'
import { QueryDocumentSnapshot } from 'firebase/firestore'

interface ChatMessageProps {
    messageDoc: QueryDocumentSnapshot
}

export default function ChatMessage({ messageDoc }: ChatMessageProps) {
    return (<>
        <div>
            <p>{messageDoc.get("message")}</p>
            <img referrerPolicy="no-referrer" src={messageDoc.get("photoUrl")} />
        </div>
    </>)
}