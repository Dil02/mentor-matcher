import ProgressBar from ".././ProgressBar/ProgressBar";
import profilePic from './profilePic.jpg';
import {useState, useEffect} from "react";

function MentorBox(i, name, job, email, phone, description, toggleConfirm) {
    if (name == "NULL") {
      return(null)
    }
    var color = "#7a3fc2"
    if (i == 2) { color = '#42b0cc'} 
    
    return(
        <div class="btn w-100" id={"btn-" + i}>
            <div id="mentors">
            <img  src={profilePic} className="rounded-circle" height="200"/>
            <div class="text-center">
                <h2> {name} </h2>
                <h4> {job} </h4>
                <br/>
                <p> <strong>Email: </strong></p>
                <p class="p-0" id="email"> {email} </p>
                <br/>
                <p> <strong> Phone: </strong></p>
                <p>{phone}</p>
                <br/>
                <p> <strong>Description: </strong></p>
                <p>{description}</p>
            </div>
            <button id={email} onClick={toggleConfirm}>SEND REQUEST</button>
            <div id="bar">
                <ProgressBar bgcolor={color} completed="60"/>
            </div>
          </div>
        </div>
    )
}
export default MentorBox;