import "./App.css";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDc7yL3oQ4FGcvoZkIgB-oNHW_Wre88ZtU",
  authDomain: "alanchat-4e479.firebaseapp.com",
  projectId: "alanchat-4e479",
  storageBucket: "alanchat-4e479.firebasestorage.app",
  messagingSenderId: "459092425714",
  appId: "1:459092425714:web:652a7233cd25dba991496b",
  measurementId: "G-L72SE2MLL8",
};

const app = initializeApp(firebaseConfig); //initialize firebase
const auth = getAuth();
const provider = new GoogleAuthProvider(); //create instance of google provider object

function SignInPage() {
  //implement gooogle sign in functionality
  function signIn() {
    signInWithPopup(auth, provider).catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }
  return (
    <div className="Sign-In-Page">
      <h1>Welcome to Alan Chat!</h1>
      <button onClick={signIn}>SIGN IN WITH GOOGLE</button>
    </div>
  );
}

//chat component consists of chat messages and input field for user to send messages
function Chat() {
  const currentUser = auth.currentUser; //get current user
  return (
    <div className="Chat-Page">
      <h1>Start Chatting!</h1>
      <SignOutButton />
      <p>{currentUser.photoURL}</p>
    </div>
  );
}

//component for the sign out button
function SignOutButton() {
  function signOutUser() {
    signOut(auth).catch((error) => {
      console.log(error.message);
    });
  }
  return <button onClick={signOutUser}>SIGN OUT</button>;
}

//Parent component
export default function App() {
  const [user, setUser] = useState(null); //state variable that keeps track of whether user is signed in or not

  //use useEffect and onAuthStateChanged to keep track of whether user is signed in or not
  useEffect(() => {
    //onAuthStateChanged returns unsubscribe function
    const unsubscribeFunction = onAuthStateChanged(auth, (user) => {
      setUser(user); //update state using the observer on auth object
    });

    //for cleanup after App component unmounts, unsubscribe from the listener/observer
    return () => {
      unsubscribeFunction();
    };
  }, []); //empty dependency array means this code is run only once on initial render

  //if user logged in, show chat room. Otherwise, show sign in page
  return user ? <Chat /> : <SignInPage />;
}
