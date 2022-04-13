// importing dependencies and stylings
import {useState, useEffect} from "react";
import { FirebaseError } from 'firebase/app';
import {collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore, where, query, arrayRemove, arrayUnion} from 'firebase/firestore';
import {db, auth} from '.././firebase/firebase-config';
import "./reset.css"; //Resets styling
import "./viewMenteeRequests.css";
import { getAuth} from "firebase/auth";

function MenteeSelection() {

  const [currentMentees, setMentees] = useState([]);
  const [pendingMentees, setPending] = useState([]);
  
  
  useEffect(() => {
    const getMentees = async () => {
        const mentorRef = doc(db, "Mentors", auth.currentUser.email);
        const mentorSnap = await getDoc(mentorRef);
        const menteeCol = collection(db, "Mentees")

        if (mentorSnap.data().pending.length != 0) {
            const q = query(menteeCol, where('emailAddress', 'in', mentorSnap.data().pending))
            const data = await getDocs(q)
            setPending(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        
        if (mentorSnap.data().mentees.length != 0) {
            const q2 = query(menteeCol, where('emailAddress', 'in', mentorSnap.data().mentees));
            const data2 = await getDocs(q2);
            setMentees(data2.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
    }
    getMentees();
  });

  // Accepts the request from the mentee
  const acceptRequest = (e) => {
    const menteeRef = doc(db, "Mentees", e.target.id);
    const mentorRef = doc(db, "Mentors", auth.currentUser.email);
    updateDoc(menteeRef, {
        pending: null,
        mentor: auth.currentUser.email
      })
    updateDoc(mentorRef, {
        pending: arrayRemove(e.target.id),
        mentees: arrayUnion(e.target.id)
      })

    for (var i = 0; i < pendingMentees.length; i++) {
      if (pendingMentees[i].emailAddress == e.target.id) {
        break
      }
    }

    currentMentees.push(pendingMentees[i]);
    pendingMentees.splice(i, 1)
  }

  // denying requests from mentees
  const denyRequest = (e) => {
    const menteeRef = doc(db, "Mentees", e.target.id);
    const mentorRef = doc(db, "Mentors", auth.currentUser.email);
    updateDoc(menteeRef, {
        pending: null,
      })
    updateDoc(mentorRef, {
        pending: arrayRemove(e.target.id),
      })

    for (var i = 0; i < pendingMentees.length; i++) {
      if (pendingMentees[i].emailAddress == e.target.id) {
        break
      }
    }
    pendingMentees.splice(i, 1)
  }

  // Unpairing existing mentor-mentee match/relationship
  const unpair = (e) => {
    const menteeRef = doc(db, "Mentees", e.target.id);
    const mentorRef = doc(db, "Mentors", auth.currentUser.email);
    updateDoc(menteeRef, {
        mentor: null,
      })
    updateDoc(mentorRef, {
        mentees: arrayRemove(e.target.id),
      })

    for (var i = 0; i < currentMentees.length; i++) {
      if (currentMentees[i].emailAddress == e.target.id) {
        break
      }
    }
    currentMentees.splice(i, 1)
  }

  // returns the html output 
  return (
    <div className="App">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
      <div className="container-fluid">
        <h1>View Mentee Requests</h1>
        {pendingMentees.map((mentee) => {
          return(
              <div className="row menteeProfiles p-3 mt-4">
                <div className="col-md-2">
                  <img className="profilePhoto" src="https://firebasestorage.googleapis.com/v0/b/mentor-matcher-g14.appspot.com/o/profilePictures%2Fmentee%40mentee.com.jpg?alt=media&token=31e1d6a4-3a0d-4b84-99c0-7b7da247f9e0"></img>
                </div>
                <div className="col-lg-7">
                  <ul className="list-unstyled">
                    <li className="pb-2"><h4>{mentee.firstName + " " + mentee.surname}</h4></li>
                    <li><p>{mentee.emailAddress}</p></li>
                    <li><p>{mentee.phone}</p></li>
                  </ul>
                </div>
                <div className="col col-lg-2">
                  <button type="button" id={mentee.emailAddress} onClick={acceptRequest} className="btn btn-outline-success">Accept</button>
                  <button type="button" id={mentee.emailAddress} onClick={denyRequest} class="btn btn-outline-danger">Decline</button>
                </div>
              </div>
          );
        })}
        <h1>Current Mentees</h1>
        {currentMentees.map((m) => {
          return(
              <div className="row menteeProfiles p-3 mt-4">
                <div className="col-md-2">
                  <img className="profilePhoto" src="https://firebasestorage.googleapis.com/v0/b/mentor-matcher-g14.appspot.com/o/profilePictures%2Fmentee%40mentee.com.jpg?alt=media&token=31e1d6a4-3a0d-4b84-99c0-7b7da247f9e0"></img>
                </div>
                <div className="col-lg-7">
                  <ul className="list-unstyled">
                    <li className="pb-2"><h4>{m.firstName + " " + m.surname}</h4></li>
                    <li><p>{m.emailAddress}</p></li>
                    <li><p>{m.phone}</p></li>
                  </ul>
                </div>
                <div className="col col-lg-2">
                  <button type="button" id={m.emailAddress} onClick={unpair} class="btn btn-outline-danger">Unpair</button>
                </div>
              </div>
          );
        })}
        
      </div>
    </div>
  );
}

export default MenteeSelection;