"use client";
import SignOut from "./SignOut";
import ChatMessage from "./ChatMessage";
import { db } from "../lib/firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { useEffect, useState, useRef } from "react";

interface ChatroomProps {
    user: User;
}

export default function Chatroom({ user }: ChatroomProps) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<QueryDocumentSnapshot[]>([]);
    const [userDocs, setUserDocs] = useState<QueryDocumentSnapshot[]>([]);
    const scrollBarRef = useRef<HTMLLIElement | null>(null);

    // function for adding message (document) to collection in database
    async function addMessage() {
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                uid: user.uid,
                name: user.displayName,
                photoUrl: user.photoURL,
                message: input,
                createdAt: serverTimestamp(),
            });
            setInput("");
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // start listener once after initial render to get messages
    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messageDocs = querySnapshot.docs; // this is array of all documents in messages collection
            setMessages(messageDocs);
        });
        return () => unsubscribe(); // turn off listener when component unmounts
    }, []);

    // start another listener for users collection 
    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("displayName"));
        // onSnapshot reruns after any changes
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userDocs = querySnapshot.docs; // this is array of all documents in users collection
            setUserDocs(userDocs);
        });
        return () => unsubscribe(); // turn off listener when component unmounts
    }, []);

    // trigger scroll everytime messages get updated
    useEffect(() => {
        scrollBarRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    return (
        <>
            {/*container that holds chat room section (middle) and sidebar sections */}
            <main className="flex h-screen">
                {/* Left Sidebar w/ signout button and socials*/}
                <section className="bg-[#2c2d32] w-64 flex flex-col justify-between items-center">
                    <div className=" p-4 ">
                        <h1 className="text-3xl font-semibold">alanChat</h1>
                        <img
                            className="rounded-full"
                            src="https://lh3.googleusercontent.com/a/ACg8ocLSe0ioMYQrWXCE7ECqii5nD3WKS1sZzEq6gfJ6UZYHYSR9GSB-=s96-c"
                        />
                        <div className="flex gap-4">
                            <a href="https://github.com/ancomalan" target="_blank" className="hover:opacity-70" rel="noopener noreferrer">
                                <img src="/github-logo.png" className="w-10 h-10" />
                            </a>
                            <a
                                className="hover:opacity-70 " href="https://www.linkedin.com/in/alan-vo-16b00231b/" target="_blank" rel="noopener noreferrer"
                            >
                                <img src="/LI-In-Bug.png" className="w-10 h-10" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <SignOut />
                    </div>
                </section>

                {/* chat room  */}
                <section className="bg-background flex flex-col flex-1 ">
                    <h1 className="text-center text-lg shrink-0">Welcome! Please be respectful.</h1>
                    <h3 className="text-center text-xs shrink-0">{messages.length} messages </h3>
                    <ul className="p-4 overflow-y-auto flex-1 scrollbar-track-[#323339] scrollbar-thumb-[#7d7e87]">
                        {messages.map((doc) => (
                            <ChatMessage key={doc.id} messageDoc={doc} />
                        ))}
                        {/* for scrolling to newest message */}
                        <li ref={scrollBarRef} className="list-none" />
                    </ul>
                    <form
                        className="shrink-0"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!input.trim()) {
                                return;
                            }
                            addMessage();
                        }}
                    >
                        <input
                            className="bg-[#393a41] w-full p-4 rounded-lg outline-none"
                            placeholder="Say something"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </form>
                </section>

                {/* Right Sidebar displaying all members stored in db*/}
                <section className="bg-[#323339] w-64 flex flex-col border border-[#3e3f45] gap-3 p-4 shrink-0">
                    <h1 className="text-[#98999f] ">Members-{userDocs.length}</h1>
                    {/* display profile pic and display name for each active member */}
                    <ul className="overflow-y-auto space-y-3">
                        {userDocs.map((docSnapshot) => (
                            <li key={docSnapshot.get("uid")} className="flex text-[#98999f] gap-3 items-center">
                                <img
                                    className="rounded-full h-8 w-8"
                                    src={docSnapshot.get("photoUrl")}
                                    referrerPolicy="no-referrer"
                                />
                                <p>{docSnapshot.get("displayName")}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </main >
        </>
    );
}
