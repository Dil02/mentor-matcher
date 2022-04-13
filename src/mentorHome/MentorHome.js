// importing stylings and dependencies
import './mentorHome.css';
import {firestore} from  "../firebase/firebase-config";
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore,query, where, onSnapshot, getFirestore} from "@firebase/firestore";
import {useAuth} from "../firebase/firebase-config";
import { useEffect, useState } from "react";
import { getAuth,} from "firebase/auth";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  

function MentorHome() {

    const currentUser = useAuth();
    const auth = getAuth();
    const userAuth = auth.currentUser;
    const emailAddr = userAuth.email;

    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(firestore, "Mentors");
    const ref = collection(firestore, "Mentors");

    const db = getFirestore();
    const colRef = (collection(db, "Mentors"));

    const newArray=[]

    
  /*
  | Gets the current user's information from firebase firestore database
  |
  */
    const tempFunction = async() =>{

        const q=query(colRef,where("emailAddress","==", emailAddr));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          newArray.push(doc.data());
        }); console.log(newArray); setUsers(newArray)
      
    }

    useEffect(() => {
        const getUsers = async (currentUser) => {
          tempFunction(currentUser);
        };
        getUsers();
    }, []);

    useEffect(() => {
        if (currentUser?.photoURL) {
          setPhotoURL(currentUser.photoURL);
        }
      }, [currentUser])   

      // returns the html page for mentee home page along with mapping for the user's details
  return (
<div>
{users.map((user) => {
        return(
            <div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <div className='profileBox'>
                            <img src ={photoURL} width="200" height="200" class="center"/>
                            <h2> Welcome </h2>
                            <h2> {user.firstName} {user.surname} </h2>
                            <div class="center">
                                <div className=''>
                                    
                                    <hr/>
                                    <p><b>Introduction: </b>{user.personalIntroduction}</p>
                                    <hr/>
                                    <p><b>Occupation: </b>{user.occupation}</p>
                                    <p><b>Sector: </b>{user.sector}</p>
                                    <p><b>Qualification: </b>{user.Qualifications}</p>
                                    <p><b>Location: </b>{user.location}</p>
                                    <hr/>
                                    <p className='text-center'><b>Keep your profile updated using the Edit Profile page</b></p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className='col-md-5 offset-md-1'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='menteeBox'>
                                    <table>
                                    <tr>
                                            <button class="button2"><Link to="/MessagesMentors" style={{color: "black"}}>Go to Mentor Matcher Forum</Link></button>
                                        </tr>
                                    </table>

                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='meetingsBox'>
                                    <table>
                                        <tr>
                                            <th>Meetings</th>
                                        </tr>
                                        <tr>
                                            <td> Mentee1: 9am <button class="button2"> Join Meeting </button> </td>
                                        </tr>	
                                        <tr>
                                            <td> Mentee2: 2pm <button class="button2"> Join Meeting </button> </td>
                                        </tr>
                                        <tr>
                                            <td> Mentee3: 4pm <button class="button2"> Join Meeting </button> </td>
                                        </tr>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


    

</div>

);
})}

    </div>

  );
}

export default MentorHome;
