import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider(); //create instance of google provider object
const auth = getAuth();
const user = auth.currentUser;

//google sign in
function signIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

function signOutUser() {
  signOut(auth)
    .then(() => {
      console.log("User signed out.");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export default function App() {
  return (
    <div className="App">
      <h1 className="App-header">Alan Chat</h1>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
  //return sign in page component if user not signed in
  //return chat page component if user signed in
  //return user ? <signIn /> : <chat />
}
