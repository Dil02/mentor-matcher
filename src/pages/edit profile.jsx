import React,{useRef} from "react";
import {firestore} from  "../firebase";
import {addDoc,collection } from "@firebase/firestore"


export default function Home(){

    return(

        <div>
            


<header>
    <hgroup>
      <nav id="navbar">
        <li><a href="home.html"><img src="https://i.postimg.cc/sgF6sGkS/logo.png" alt="logo" className= "fdmlogo"></img></a></li>
        <li><a href="home.html" className="home">HOME</a></li>
        <li><a href="home.html#about" className="about">ABOUT</a></li>
        <li><a href="home.html#faqs" className="faqs">FAQS</a></li>
        <li><a href="home.html#contact" className="contact">CONTACT</a></li>
        <li className="register"><a href="Register.html" className="register">REGISTER</a></li>
        <li className="login"><a href="Login.html" className="login">LOGIN</a></li>

      </nav>

      </hgroup>
</header>

<p className="font-weight-bold">Edit Profile</p>

<form>
<div className="container rounded mt-5 ">
    <div className="row">
        <div className="col-md-4 border-right border-danger">
            <div className="d-flex flex-column align-items-center"><img className="img-rounded mt-5" src="https://vistapointe.net/images/stick-man-1.jpg" width="90"></img></div>
        </div>
        <div className="col-md-8">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-center">Edit Profile</h4>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6"><input type="text" className="form-control" placeholder="first name"></input></div>
                    <div className="col-md-6"><input type="text" className="form-control" placeholder="Last Name"></input></div>
                </div>
                <div className="row mt-3">
                    <div className ="col-md-3"><p className="description">Email:</p></div>
                    <div className ="col-md-9"><input type="text" className="form-control" placeholder="Email"></input></div>
                </div>
                <div className="row mt-3">
                    <div className ="col-md-3"><p className="description">Password:</p></div>
                    <div className="col-md-9"><input type="text" className="form-control" placeholder="Password"></input></div>
                </div>

                <div className="row mt-4">
                    <div className ="col-md-3"><p className="description">Preferences:</p></div>
                    <div className="col-md-9"><input type="text" className="form-control" placeholder="Preferences"></input></div>
                </div>

                <div className="mt-5 text-right"><button className="btn btn-primary profile-button bg-danger" type="submit">Save Changes</button></div>
            </div>
        </div>
    </div>
</div>
</form>




        </div>




    )
}