// importing dependencies
import { useState } from 'react';
import {  onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth} from ".././firebase/firebase-config";
import { FirebaseError } from 'firebase/app';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import {db} from ".././firebase/firebase-config";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword]= useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth,(currentUser) => {
        setUser(currentUser)
      })

 /*
  | logs the user in with the given credentials
  |
  | @param event e
  */
    const login = async (e) => {
        e.preventDefault();
        try{
          const user = await signInWithEmailAndPassword(auth, loginEmail,loginPassword);
          
          } catch(error)
          {
            alert("Invalid Login Details");
            console.log(error.message);
            document.getElementById('Login').reset();
            
          }
      };
    
    // returning the html for login page
    return (
<div>
.      
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="signup-form">
                        <form action="" className="mt-5 border p-4 bg-light shadow">
                            
                            <h4 className="text-secondary text-center float-lg-none">  Login </h4>
                            <hr/>
                            <div className="row">
                                
                            <div className="mb-3 col-md-12">
                                    <label>Username:<span className="text-danger">*</span></label>
                                    <input type="text" name="text" className="form-control" placeholder="Enter Email Address" onChange={(event) =>{setLoginEmail(event.target.value);}} required />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Password:<span className="text-danger">*</span></label>
                                    <input type="password" name="password" className="form-control" placeholder="Enter Password" onChange={(event) =>{setLoginPassword(event.target.value);}} required />
                                </div>
                                
                                <div className="col-md-4 offset-md-3">
                                    <button onClick={login} className="btn btn-primary float-end" id="Login">Login</button>
                                </div>
                            
                            </div>
                        </form>
                        <div class="text-center mt-3 text-secondary">Don't have an account? <Link  to="/Registration" className="">Click here to Register</Link> </div>

                    </div>
                </div>
            </div>
            <script src="imageview.js"></script>
        </div>
</div>
    );
}


export default Login;