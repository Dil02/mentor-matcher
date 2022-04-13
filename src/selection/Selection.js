// importing dependencies and libraries and stylesheets
import './Selection.css';
import {useState, useEffect} from "react";
import {auth} from ".././firebase/firebase-config";
import {db} from ".././firebase/firebase-config"; 
import {getDoc, getDocs, collection, setDoc, doc, updateDoc, arrayUnion, arrayRemove, where, query} from "firebase/firestore";
import MentorBox from './MentorBox';
import profilePic from './profilePic.jpg';
import Popup from './Popup'
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';


/* 
| Shows mentors in the html output into different Mentor Boxes
|
 */
function showMentors(infoArray, toggleConfirm) {
  return(
    <div  class="btn-group d-flex" role="group">
      {MentorBox(1, infoArray[0][0], infoArray[0][1], infoArray[0][2], infoArray[0][3], infoArray[0][4], toggleConfirm)}
      {MentorBox(2, infoArray[1][0], infoArray[1][1], infoArray[1][2], infoArray[1][3], infoArray[1][4], toggleConfirm)}
      {MentorBox(1, infoArray[2][0], infoArray[2][1], infoArray[2][2], infoArray[2][3], infoArray[2][4], toggleConfirm)}
      {MentorBox(2, infoArray[3][0], infoArray[3][1], infoArray[3][2], infoArray[3][3], infoArray[3][4], toggleConfirm)}
      {MentorBox(1, infoArray[4][0], infoArray[4][1], infoArray[4][2], infoArray[4][3], infoArray[4][4], toggleConfirm)} 
    </div>
  )
}


function Selection() {
  const [displayMentors, setDisplayMentors] = useState([]);

  const [pending, setPending] = useState();
  const [tempEmail, setTemp] = useState();
  const [currentMentor, setMentor] = useState();

  const [confirm, setConfirm] = useState(false)
  
  useEffect(() => {
    const getMentors = async () => {

        const menteeRef = doc(db, "Mentees", auth.currentUser.email)
        const menteeSnap = await getDoc(menteeRef)
        setPending(menteeSnap.data().pending)

        if (menteeSnap.data().mentor != null) {
          const mentorRef = doc(db, "Mentors", menteeSnap.data().mentor)
          const mentorSnap = await getDoc(mentorRef)
          setMentor(mentorSnap)
        } else {
          const mentorCol = collection(db, "Mentors")
          const mentors = await getDocs(mentorCol)

          //Checks through the mentors a max of 4 times
          //On each pass through the mentors, the matching conditions become less strict
          let data = []
          mentors.docs.forEach((doc) => {
            if (doc.data().sector == menteeSnap.data().sector && doc.data().occupation == menteeSnap.data().occupation && doc.data().location == menteeSnap.data().location)
            {
              data.push({ ...doc.data(), id: doc.id })
            } 
          })
          if (data.length < 5) {
            mentors.docs.forEach((doc) => {
              if (doc.data().sector == menteeSnap.data().sector && doc.data().occupation == menteeSnap.data().occupation)
              {
                data.push({ ...doc.data(), id: doc.id })
              } 
            })
          }

          if (data.length < 5) {
            mentors.docs.forEach((doc) => {
              if (doc.data().sector == menteeSnap.data().sector)
              {
                data.push({ ...doc.data(), id: doc.id })
              } 
            })
          }

          if (data.length < 5) {
            mentors.docs.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            })
          }

          setDisplayMentors(data);
        }
        //In the above line we are looping through the documents in the collection 
        // and setting the users array to be equal to an array of the document data and id for each document.
    }
    getMentors();
  }, []);

  var infoArray = [["none", "none", "none", "none", "none"], 
                  ["none", "none", "none", "none", "none"], 
                  ["none", "none", "none", "none", "none"], 
                  ["none", "none", "none", "none", "none"], 
                  ["none", "none", "none", "none", "none"]]
  for (let i = 0; i < 5; i++) {
    if (displayMentors.length - 1 < i) {
      infoArray[i][0] = "NULL";
      infoArray[i][1] = "NULL";
      infoArray[i][2] = "NULL";
      infoArray[i][3] = "NULL";
      infoArray[i][4] = "NULL";
    } else {
      infoArray[i][0] = displayMentors[i].firstName + " " + displayMentors[i].surname;
      infoArray[i][1] = displayMentors[i].occupation;
      infoArray[i][2] = displayMentors[i].emailAddress;
      infoArray[i][3] = displayMentors[i].phone;
      infoArray[i][4] = displayMentors[i].personalIntroduction;
    }
    
  }

  

  const toggleConfirm = (e) => {
    setTemp(e.target.id)
    setConfirm(!confirm)
  }
  const setRequest = () => {
    const menteeRef = doc(db, "Mentees", auth.currentUser.email);
    const mentorRef = doc(db, "Mentors", tempEmail);
    updateDoc(menteeRef, {
      pending: tempEmail
    })
    updateDoc(mentorRef, {
      pending: arrayUnion(auth.currentUser.email)
    })
    setPending(tempEmail)
  }

  const cancelRequest = () => {
    const menteeRef = doc(db, "Mentees", auth.currentUser.email);
    const mentorRef = doc(db, "Mentors", pending);
    updateDoc(menteeRef, {
      pending: null
    })
    updateDoc(mentorRef, {
      pending: arrayRemove(auth.currentUser.email)
    })
    setConfirm(false)
    setPending(null)
  }


  const unpair = () => {
    const menteeRef = doc(db, "Mentees", auth.currentUser.email);
    const mentorRef = doc(db, "Mentors", currentMentor.data().emailAddress);
    updateDoc(menteeRef, {
      mentor: null
    })
    updateDoc(mentorRef, {
      mentees: arrayRemove(auth.currentUser.email)
    })
    setMentor(null)
  }

// returns the mentees that mentors are paired with 
  if (currentMentor != null) {
    return (
      <div>
        <h2>Currently paired with</h2>
      <div class="btn w-100" id="btn-2">
          <div id="mentors">
          <img  src={profilePic} className="rounded-circle" height="200"/>
          <div class="text-center">
              <h2> {currentMentor.data().firstName + " " + currentMentor.data().surname} </h2>
              <h4> {currentMentor.data().job} </h4>
              <br/>
              <p> <strong>Email: </strong></p>
              <p class="p-0" id="email"> {currentMentor.data().emailAddress} </p>
              <br/>
              <p> <strong> Phone: </strong></p>
              <p>{currentMentor.data().phone}</p>
              <br/>
              <p> <strong>Description: </strong></p>
              <p>{currentMentor.data().personalIntroduction}</p>
              <button onClick={unpair} class="btn btn-outline-danger">UNPAIR</button>
          </div>
        </div>
      </div> 
      </div>)
  }
  else if (pending == null) {
  return (
    <div class="selection">
        <div class="text-center p-4">
        {displayMentors.length == 0 ? <h2>Unfortunately you could not be matches with any mentors at this time</h2> : 
        <h1>We have matched you with the following mentors. Please select one from below:</h1>}
        <h4>(The mentors on the left best suit your personalised needs)</h4>
        </div>
        <Popup trigger={confirm} accept={setRequest} deny={setConfirm}>{tempEmail}</Popup>
        {displayMentors.length == 0 ? <h2></h2> : showMentors(infoArray, toggleConfirm)}
    </div>
    
    
  ) } else {
    return(
      <div className="text-center">
        <br></br>
        <h2>Waiting on response from {pending}</h2>
        <button  class="btn btn-outline-danger" onClick={cancelRequest}>CANCEL REQUEST</button>
      </div>
    )
  }
}

export default Selection;
