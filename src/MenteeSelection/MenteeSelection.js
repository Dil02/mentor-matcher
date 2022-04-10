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
    //UPDATES THE FIRESTORE BUT NOT THE STATES, PAGE NEEDS TO BE NAVIGATED TO AGAIN FOR IT TO WORK
    //currentMentees.push(pendingMentees[pendingMentees.indexOf(e.target.id)]);
    //setMentees(currentMentees.docs.map((doc) => ({...doc.data(), id: doc.id})));
    //pendingMentees.splice(pendingMentees.indexOf(e.target.id), 1);
    //setPending(pendingMentees.map((doc) => ({...doc.data(), id: doc.id})));
  }

  return (
    <div className="App">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
      <div className="container-fluid">
        <h1>View Mentee Requests</h1>
        {pendingMentees.map((mentee) => {
          return(
              <div className="row menteeProfiles p-3 mt-4">
                <div className="col-md-2">
                  <img className="profilePhoto" src=""></img>
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
                  <button type="button" id={mentee.emailAddress} class="btn btn-outline-danger">Decline</button>
                </div>
              </div>
          );
        })}
        <h1>Current Mentees</h1>
        {currentMentees.map((m) => {
          return(
              <div className="row menteeProfiles p-3 mt-4">
                <div className="col-md-2">
                  <img className="profilePhoto" src=""></img>
                </div>
                <div className="col-lg-7">
                  <ul className="list-unstyled">
                    <li className="pb-2"><h4>{m.firstName + " " + m.surname}</h4></li>
                    <li><p>{m.emailAddress}</p></li>
                    <li><p>{m.phone}</p></li>
                  </ul>
                </div>
              </div>
          );
        })}
        
      </div>
    </div>
  );
}

export default MenteeSelection;