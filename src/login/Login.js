import './Login.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth} from ".././firebase/firebase-config";
import { FirebaseError } from 'firebase/app';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import {db} from ".././firebase/firebase-config";

function Login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword]= useState("");

    const login = async () => {
        try{
          const user = await signInWithEmailAndPassword(auth, loginEmail,loginPassword);
          console.log(user);
          } catch(error)
          {
            console.log(error.message);
          }
      };
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
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
                                
                                <div className="col-md-4 offset-md-4">
                                    <button className="btn btn-danger float-">Back</button>
                                    <button className="btn btn-primary float-end">Login</button>
                                </div>
                            
                            </div>
                        </form>
                        <div class="text-center mt-3 text-secondary">Don't have an account? <a href="registration.html">Click here to Register</a> </div>

                    </div>
                </div>
            </div>
            <script src="imageview.js"></script>
        </div>
    );
}

export default Login;