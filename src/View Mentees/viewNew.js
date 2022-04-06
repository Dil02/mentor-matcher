import {useState, useEffect} from "react";
import { FirebaseError } from 'firebase/app';
import { storage } from "./firebase/firebase-config";
import { ref, getBytes } from "firebase/storage";
import {collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore, where, query} from 'firebase/firestore';
import {db} from './firebase/firebase-config';
import "./reset.css"; //Resets styling
import "./View Mentees/viewMentees.css";

function App() {

  const [mentees, setMentees] = useState([]);
  const menteesCollectionRef=collection(db, "Mentees");
  
  useEffect(() => {
    const getMentees = async () => {
        const data = await getDocs(menteesCollectionRef);
        setMentees(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    //Resume at the 15:48 mark pedro video for uploading videos.
    getMentees();
  }, []);

  return (
    <div className="App">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
      <div className="container fluid">
        <h1>View Mentees</h1>
        {mentees.map((mentee) => {
          return(
            <div class="col-sm pt-3">
              <div class="row menteeProfiles p-3" >
                <div class="col-m-2">
                  <img class="profilePhoto" src=""></img>
                </div>
                <div class="col-lg-7 mt-3">
                  <ul class="list-unstyled">
                    <li class="pb-2"><h4>{mentee.firstName + " " + mentee.lastName}</h4></li>
                    <li><p>{mentee.emailAddress}</p></li>
                    <li><p>{mentee.phone}</p></li>
                  </ul>
                </div>
                <div class="col-m-2">
                  <button type="button" class="btn btn-outline-success">Accept</button>
                  <button type="button" class="btn btn-outline-danger">Decline</button>
                </div>
              </div>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}

export default App;
