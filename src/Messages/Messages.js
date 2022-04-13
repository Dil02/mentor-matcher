//import React from 'react';
import React, {useState} from "react";
import './Messages.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {collection, getFirestore} from 'firebase/firestore'



import { useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData} from 'react-firebase-hooks/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";


firebase.initializeApp({
  apiKey: "AIzaSyBDFQX8ZI5dzA2NAnXj752bcVaoRl6I_Kk",
  authDomain: "mentor-matcher-g14.firebaseapp.com",
  projectId: "mentor-matcher-g14",
  storageBucket: "mentor-matcher-g14.appspot.com",
  messagingSenderId: "236114227145",
  appId: "1:236114227145:web:ef51ed9699906dbc2b8218",
  measurementId: "G-BMFHK0P8JJ"
})

const auth = getAuth();
const firestore = firebase.firestore();
let myEmailAddress="";

onAuthStateChanged(auth,(user) => {
  if(user){
    console.log (user.email);
    myEmailAddress=user.email;
  }
})

function Messages() {

  const [user] = useAuthState(auth);

  const [users, setUsers] = useState([]);
  // const usersCollectionRef = collection(firestore, "Mentees");
  // const ref = collection(firestore, "Mentees");

  const db = getFirestore();
  const colRef = (collection(db, "Mentees"));


  // const [users2, setUsers2] = useState([]);
  // const usersCollectionRef2 = collection(firestore, "Mentors");
  // const ref2 = collection(firestore, "Mentors");

  // const db2 = getFirestore();
  // const colRef2 = (collection(db, "Mentors"));

  return (
    <div>
    
      <div className="Messages">
        <header className="Messages-header">
          </header>
        <section>
          {user? <ChatRoom/>: <ChatRoom/> }
       </section>
      </div>
      </div>
  );
}


export function ChatRoom(){
  
  const messagesRef = firestore.collection('Messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const[messages] = useCollectionData(query, {idField: 'id'});
  const[formValue, setFromValue] = useState('');
  

  const sendMessage = async(e) => {

    e.preventDefault();

   const{uid, photoURL, email} = auth.currentUser;
   console.log("here v")
   console.log(uid);
   console.log(auth.currentUser.email);

    await messagesRef.add({
      text:formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      email
    })

    setFromValue('');

  }

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
       
      </div>

      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFromValue(e.target.value)}/>
        <button type="submit"> Enter </button>
      </form>
    </>
  )

}

function ChatMessage(props){
  const{email,text,uid,photoURL} = props.message;
  const [user] = useAuthState(auth);

  const messageClass = uid === auth.currentUser.uid? 'sent' : 'received';


  return (
    <div className = {`message ${messageClass}}`}>
      
      <p>{email}: {text}</p>
    </div>
  )
}

export default Messages;