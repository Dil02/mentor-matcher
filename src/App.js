import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import "./App.css";
import {auth} from "./firebase-config";
import { FirebaseError } from 'firebase/app';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore} from 'firebase/firestore';
import {db} from './firebase-config';

function App() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword]= useState("");
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword]= useState("");

  const [user, setUser] = useState({});
  const usersCollectionRef=collection(db, "Users");


  onAuthStateChanged(auth,(currentUser) => {
    setUser(currentUser)
  })

  //Main Register Function
  const register = async () => {
    try
    {
      const user = await createUserWithEmailAndPassword(auth, registerEmail,registerPassword);

      setDoc(doc(db,"Users",registerEmail),{  //"Users"- specifies the collection
        emailAddress: registerEmail, //First field
        password: registerPassword  //Second field
          //etc...
      });

      console.log(user);
    } 
    catch(error)
    {
      console.log(error.message);
    }
  };

  const login = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail,loginPassword);
      console.log(user);
      } catch(error)
      {
        console.log(error.message);
      }
  };

  const logout = async () => {

    await signOut(auth);
  };


  return (
    <div className='App'>
      <section>
        <h3>Register User</h3>
        <input placeholder='Email..' onChange={(event) =>{setRegisterEmail(event.target.value);}}></input>
        <input placeholder="Password.." onChange={(event) =>{setRegisterPassword(event.target.value);}}></input>
        <button onClick={register}>Create User</button>
      </section>

      <section>
        <h3>Login</h3>
        <input placeholder="Email..." onChange={(event) =>{setLoginEmail(event.target.value);}}></input>
        <input placeholder="Password..." onChange={(event) =>{setLoginPassword(event.target.value);}}></input>
        <button onClick={login}>Login</button>
      </section>

      <section>
        <h4>User Logged In:</h4>
        {user?.uid}
        <button onClick={logout}>Sign Out</button>
      </section>

      <article>
        <h2></h2>
      </article>


    </div>
  );
}

export default App;
