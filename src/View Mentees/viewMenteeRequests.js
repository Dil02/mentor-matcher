import {useState, useEffect} from "react";
import { FirebaseError } from 'firebase/app';
import {collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore, where, query} from 'firebase/firestore';
import {db} from './firebase/firebase-config';
import "./reset.css"; //Resets styling
import "./viewMenteeRequests.css";
import { getAuth } from "firebase/auth";

function App() {

  const [mentees, setMentees] = useState([]);
  const menteesCollectionRef=collection(db, "Mentees");
  
  useEffect(() => {
    const getMentees = async () => {
        const data = await getDocs(menteesCollectionRef);
        setMentees(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getMentees();
  }, []);
  

  return (
    <div className="App">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
      <div className="container-fluid">
        <h1>View Mentee Requests</h1>
        {mentees.map((mentee) => {
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
                  <button type="button" className="btn btn-outline-success">Accept</button>
                  <button type="button" class="btn btn-outline-danger">Decline</button>
                </div>
              </div>
          );
        })}
        
      </div>
    </div>
  );
}

export default App;
