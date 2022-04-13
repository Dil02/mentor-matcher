// importing dependencies and stylings
import React, {useState} from "react";
import './Messages.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {collection, getFirestore} from 'firebase/firestore'
import { useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData} from 'react-firebase-hooks/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// initializing the firebase api
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

  const db = getFirestore();
  const colRef = (collection(db, "Mentees"));

// returning the chatroom based on the login status of user
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
  
  /*
  | Sends message to the firestore database
  |
  | @param  event  e
  |
  */
  const sendMessage = async(e) => {

    e.preventDefault();

   const{uid, photoURL, email} = auth.currentUser;

    await messagesRef.add({
      text:formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      email
    })

    setFromValue('');

  }

  // returns the main part of the chatroom
  return (
    <>
    <div className="forumTitle">
      FDM Mentor Matcher Forum
    </div>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
       
      </div>

      <form onSubmit={sendMessage}>

        <input className="textBoxChat" value={formValue} onChange={(e) => setFromValue(e.target.value)}/>
        <button className="enterBtn" type="submit"> Enter </button>
      </form>
    </>
  )

}

function ChatMessage(props){
  const{email,text,uid,photoURL} = props.message;
  const [user] = useAuthState(auth);

  const messageClass = uid === auth.currentUser.uid? 'sent' : 'received';

// returns the messages of each user
  return (
    <div className = {`message ${messageClass}}`}>
      
      <p className="messageBox"><b>{email}</b>: {text}</p>
    </div>
  )
}

export default Messages;