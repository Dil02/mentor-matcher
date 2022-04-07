import './registration.css';
import logo from './logo.png';
import blankprofile from './profilePic.jpg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

// importing libraries
import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth} from "../firebase/firebase-config";
import { FirebaseError } from 'firebase/app';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore} from 'firebase/firestore';
import {db} from '../firebase/firebase-config';

function Registration() {

    const [registerFName, setRegisterFName] = useState("");
    const [registerSName, setRegisterSName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPhone, setRegisterPhone] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerCPassword, setRegisterCPassowrd] = useState("");
    const [mentorBoolean, setMentorBoolean] = useState("");

  
    const [user, setUser] = useState({});
    const usersCollectionRef=collection(db, "Users");
  

    onAuthStateChanged(auth,(currentUser) => {
      setUser(currentUser)
    })
  
    //Main Register Function
    const register = async () => {
        console.log(registerEmail, registerPassword,registerCPassword,mentorBoolean, registerFName, registerSName, registerPhone);

        if(registerFName.length === 0 |
        registerSName.length === 0 |
        registerEmail.length === 0 | 
        registerPhone.length === 0 |
        registerPassword.length === 0 |
        registerCPassword.length === 0){
            window.alert("Please fill the required fields");
        }
        else if(registerPassword !==registerCPassword){
            window.alert("The passwords didn't match, please try again")
        }
        else{
            try
            {
                console.log("registering!")
              const user = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword);
              console.log('Here');
              console.log(mentorBoolean);
              console.log('Here');
              if(mentorBoolean == true){
                  setDoc(doc(db,"Mentors",registerEmail),{  //"Users"- specifies the collection
                      firstName: registerFName,
                      surname: registerSName,
                      emailAddress: registerEmail,
                      phone: registerPhone,
                      password: registerPassword
                    });
              }
              else{
                  setDoc(doc(db,"Mentees",registerEmail),{  //"Users"- specifies the collection
                    firstName: registerFName,
                    surname: registerSName,
                    emailAddress: registerEmail,
                    phone: registerPhone,
                    password: registerPassword
                    });
              }
              
        
              console.log(user);
              window.alert("Registration complete!");
            } 
            catch(error)
            {
              console.log(error.message);
            }
          }
        };
      
  
    
  return (
    <div >
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

this line is here to prevent firefox bug

        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="signup-form">
                        <div className="mt-5 border p-4 bg-light shadow">
                            
                            <h4 className="text-secondary text-center float-lg-none" > <img src={logo} className="logo-form" width='100px'style={{filter:"invert(1)"}} /> Mentor Matcher Registration Form </h4>
                            <hr/>
                            <div className="row">

                                <div className="mb-3 col-md-12">
                                    <label>First Name<span className="text-danger">*</span></label>
                                    <input type="text" name="fname" className="form-control" placeholder="Enter First Name" required 
                                        onChange={(event) => {setRegisterFName(event.target.value);}}
                                    />
                                    <label>Surname<span className="text-danger">*</span></label>
                                    <input type="text" name="sname" className="form-control" placeholder="Enter Surname" required 
                                        onChange={(event) => {setRegisterSName(event.target.value);}}
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Email Address:<span className="text-danger">*</span></label>
                                    <input type="text" name="password" className="form-control" placeholder="Enter Email Address" required 
                                        onChange={(event) => {setRegisterEmail(event.target.value);}}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label>Phone Number<span className="text-danger">*</span></label>
                                    <input type="text" name="password" className="form-control" placeholder="Enter Phone Number" required 
                                        onChange={(event) => {setRegisterPhone(event.target.value);}}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label>Password<span className="text-danger">*</span></label>
                                    <input type="password" name="password" className="form-control" placeholder="Enter Password" required 
                                        onChange={(event) =>{setRegisterPassword(event.target.value);}}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label>Confirm Password<span className="text-danger">*</span></label>
                                    <input type="password" name="confirmpassword" className="form-control " placeholder="Confirm Password" required 
                                        onChange={(event) => {setRegisterCPassowrd(event.target.value);}}
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    Password should be minimum 6 characters long<span className="text-danger">*</span>
                                </div>
                                

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="mentor" id="flexCheckDefault" onChange={(event) =>{setMentorBoolean(event.target.checked);}} />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Register as Mentor
                                    </label>
                                </div>


                                <div className="col-md-4 offset-md-4">
                                    <button className="btn btn-danger float-">Cancel</button>
                                    <button className="btn btn-primary float-end" onClick={register}>Register</button>
                                </div>
                            
                            </div>
                        </div>
                        <p className="text-center mt-3 text-secondary">If you already have an account, <Link  to="/Login" className="register">Click here to Login</Link></p>

                        {/* <button className="button2"><Link  to="/Messages">Messages Mentor</Link></button> */}
                    </div>
                </div>
            </div>
        </div>


        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </div>
  );
}

export default Registration;