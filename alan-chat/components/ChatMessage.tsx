'use client'
import { QueryDocumentSnapshot, Timestamp } from 'firebase/firestore'

interface ChatMessageProps {
    messageDoc: QueryDocumentSnapshot
}

export default function ChatMessage({ messageDoc }: ChatMessageProps) {
    const timestamp: Timestamp = messageDoc.get("createdAt")
    const date = timestamp.toDate()
    const messageDate = date.toLocaleString("en", { dateStyle: "short", timeStyle: "short" })

    return (<>
        {/*flex alligns img and div into horizontal row*/}
        <div className="flex gap-4 hover:bg-[#2e3035] items-center">
            <img className="rounded-full w-10 h-10" referrerPolicy="no-referrer" src={messageDoc.get("photoUrl")} />
            <div>
                <span className="flex gap-2 items-center">
                    <p className='font-bold'>{messageDoc.get("name")}</p>
                    <p className="text-xs text-[#96979f]"> {messageDate} </p>
                </span>
                <p>{messageDoc.get("message")}</p>
            </div>
        </div>
    </>)
}