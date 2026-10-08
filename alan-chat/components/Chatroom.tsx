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
    limitToLast,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { useEffect, useState, useRef } from "react";

interface ChatroomProps {
    user: User;
}

export default function Chatroom({ user }: ChatroomProps) {
    const [input, setInput] = useState("");
    const [messageDocSnapshots, setMessageDocSnapshots] = useState<QueryDocumentSnapshot[]>([]);
    const [userDocSnapshots, setUserDocSnapshots] = useState<QueryDocumentSnapshot[]>([]);
    const [messageLimit, setMessageLimit] = useState(11);

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

    function loadMoreMessages() {
        setMessageLimit((oldValue) => oldValue + 5)
    }

    // start listener with 11 as initial limit; new listener is created after every message limit increase.
    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt"), limitToLast(messageLimit));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messageDocs = querySnapshot.docs;
            setMessageDocSnapshots(messageDocs);
        });
        return () => unsubscribe(); // turn off listener when component unmounts
    }, [messageLimit]);

    // start another listener for users collection 
    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("displayName"));
        // onSnapshot reruns after any changes
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userDocs = querySnapshot.docs; // this is array of all documents in users collection
            setUserDocSnapshots(userDocs);
        });
        return () => unsubscribe(); // turn off listener when component unmounts
    }, []);

    return (
        <>
            {/*container that holds chat room section (middle) and sidebar sections */}
            <main className="flex h-screen">
                {/* Left Sidebar w/ signout button and socials*/}
                <section className="bg-[#2c2d32] w-64 flex flex-col items-center justify-between">
                    <h1 className="text-5xl font-extrabold p-3 m-5 bg-[#5865f2] rounded-full">alanChat</h1>
                    <div className="flex flex-col gap-1">
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
                    <h1 className="text-center text-lg shrink-0 p-3 font-semibold"># general</h1>
                    <button onClick={loadMoreMessages} className="text-sm pl-5 hover:opacity-50 self-start italic font-extralight ">Load More Messages</button>
                    <ul className="p-4 overflow-y-auto flex-1 scrollbar-track-[#323339] scrollbar-thumb-[#7d7e87]">
                        {messageDocSnapshots.map((doc) => (
                            <ChatMessage key={doc.id} messageDoc={doc} />
                        ))}
                    </ul>
                    <form
                        className="shrink-0 p-2"
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
                    <h1 className="text-[#98999f] ">Members-{userDocSnapshots.length}</h1>
                    {/* display profile pic and display name for each active member */}
                    <ul className="overflow-y-auto space-y-3">
                        {userDocSnapshots.map((docSnapshot) => (
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
