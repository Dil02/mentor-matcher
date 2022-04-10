//import React from 'react';
import React, {useState} from "react";
import './Messages.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


import { useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBDFQX8ZI5dzA2NAnXj752bcVaoRl6I_Kk",
  authDomain: "mentor-matcher-g14.firebaseapp.com",
  projectId: "mentor-matcher-g14",
  storageBucket: "mentor-matcher-g14.appspot.com",
  messagingSenderId: "236114227145",
  appId: "1:236114227145:web:ef51ed9699906dbc2b8218",
  measurementId: "G-BMFHK0P8JJ"
})

export const auth = firebase.auth();
export const firestore = firebase.firestore();

function Messages() {

  const [user] = useAuthState(auth);

  return (
    <div className="Messages">
      <header className="Messages-header">
        
      </header>
      <section>
        {user? <ChatRoom/>: <ChatRoom/> }
      </section>
    </div>
  );
}


export function ChatRoom(){
  
  const messagesRef = firestore.collection('messaged');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const[messages] = useCollectionData(query, {idField: 'id'});
  const[formValue, setFromValue] = useState('');

  const sendMessage = async(e) => {

    e.preventDefault();

   const{uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text:formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
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
  const{text,uid,photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid? 'sent' : 'received';


  return (
    <div className = {`message ${messageClass}}`}>
      <img src={photoURL} alt="user"/>
      <p>{text}</p>
    </div>
  )
}

export default Messages;