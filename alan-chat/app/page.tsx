"use client"
import SignIn from '../components/SignIn'
import Chatroom from '../components/Chatroom'
import { auth } from '../lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useState, useEffect } from 'react'

export default function Home() {
  // if user signed-in, show chat room. Else, show Sign-In page
  const [user, setUser] = useState<User | null>(null)

  // create listener once using useEffect to prevent infinite loop
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])


  return (
    user ? <Chatroom user={user} /> : <SignIn />
  );
}
