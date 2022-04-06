import React,{useRef, useState} from "react";
import {firestore} from  "../firebase/firebase-config";
import {addDoc,collection } from "@firebase/firestore"
import { storage } from "../firebase/firebase-config";
import { signup, login, logout, useAuth } from "../firebase/firebase-config";
import Profile from "./Profile";


export default function Home(){


    const FnameRef = useRef();
    const LnameRef = useRef(); 
    const EmailRef = useRef(); 
    const PassRef = useRef(); 
    const preferencesRef = useRef();
    const currentUser = useAuth();
    const [ loading, setLoading ] = useState(false);


    const ref = collection(firestore, "users");

    const handlesave = async(e)=>{
        e.preventDefault();


        let data ={
            Fname:FnameRef.current.value,
            Lname:LnameRef.current.value,
            Email:EmailRef.current.value,
            Pass:PassRef.current.value,
            preferences:preferencesRef.current.value

        }

        try{
            addDoc(ref,data)
        } catch(e){
            console.log(e);
        }

    }

    return(

        <div>

<p className="font-weight-bold">Edit Profile</p>

<div>
      
      {!currentUser && 
        <>
          <div>
            hi

          </div>

        </>
      }

      {currentUser && 
        <>
          <Profile />
        </>
      }

    </div>

<form onSubmit = {handlesave}>
<div className="container rounded mt-5 ">
    <div className="row">
        <div className="col-md-4 border border-4">
        <div>Currently logged in as: { currentUser?.email } </div>
            <div className="d-flex flex-column align-items-center"><div> 
            <div>
      
      {!currentUser && 
        <>
          <div>
            hi

          </div>

        </>
      }

      {currentUser && 
        <>
          <Profile />
        </>
      }

    </div>
                 </div></div>
            <input type="file" id="image" accept="image/jpg, image/png"/>
        </div>
        <div className="col-md-8">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-center">Edit Profile</h4>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6"><input type="text" className="form-control" ref ={FnameRef} placeholder="first name"></input></div>
                    <div className="col-md-6"><input type="text" className="form-control" ref ={LnameRef} placeholder="Last Name"></input></div>
                </div>
                <div className="row mt-3">
                    <div className ="col-md-3"><p className="description">Email:</p></div>
                    <div className ="col-md-9"><input type="text" className="form-control" ref ={EmailRef} placeholder="Email"></input></div>
                </div>
                <div className="row mt-3">
                    <div className ="col-md-3"><p className="description">Password:</p></div>
                    <div className="col-md-9"><input type="text" className="form-control" ref ={PassRef} placeholder="Password"></input></div>
                </div>

                <div className="row mt-4">
                    <div className ="col-md-3"><p className="description">Preferences:</p></div>
                    <div className="col-md-9"><input type="text" className="form-control" ref ={preferencesRef} placeholder="Preferences"></input></div>
                </div>



                <div className="mt-5 text-right"><button className="btn btn-primary profile-button " type="submit">Save Changes</button></div>
            </div>
        </div>
    </div>
</div>
</form>




        </div>




    )
}