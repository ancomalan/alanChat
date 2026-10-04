'use client'
import { QueryDocumentSnapshot } from 'firebase/firestore'

interface ChatMessageProps {
    messageDoc: QueryDocumentSnapshot
}

export default function ChatMessage({ messageDoc }: ChatMessageProps) {
    return (<>
        {/*flex alligns img and div into horizontal row*/}
        <div className="flex gap-4 hover:bg-[#2e3035]">
            <img className="rounded-full w-10 h-10" referrerPolicy="no-referrer" src={messageDoc.get("photoUrl")} />
            <div>
                <p className='font-bold'>{messageDoc.get("name")}</p>
                <p>{messageDoc.get("message")}</p>
            </div>
        </div>
    </>)
}