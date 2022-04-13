import './mentorHome.css';


import {firestore} from  "../firebase/firebase-config";
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore,query, where, onSnapshot, getFirestore} from "@firebase/firestore";
import {useAuth} from "../firebase/firebase-config";
import { useEffect, useState } from "react";
import { getAuth,} from "firebase/auth";



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
                                    <p><b>Occupation: </b>{user.occupation}</p>
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
                                            <th>Mentees </th>
                                        </tr>
                                        <tr>
                                            <td> Mentee1: <button class="button2"> Message </button> </td>
                                        </tr>	
                                        <tr>
                                            <td> Mentee2: <button class="button2"> Message </button> </td>
                                        </tr>
                                        <tr>
                                            <td> Mentee3: <button class="button2"> Message </button> </td>
                                        </tr>
                                        <tr> 
                                            <td> Mentee4: <button class="button2"> Message </button> </td>
                                        </tr>
                                        <tr>
                                            <td> Mentee5: <button class="button2"> Message </button> </td>
                                        </tr>
                                    </table>

                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                {/* stylings of meetingsBox in menteeHome.css */}
                                    <div className='meetingsBox'>
                                    <table>
                                        <tr>
                                            <th>Meetings</th>
                                        </tr>
                                        <tr>
                                            <td> Mentee1: 9am <button class="button2"> Join Meeting </button> </td>
                                        </tr>	
                                        <tr>
                                            <td> Mentee2: 10:30am <button class="button2"> Join Meeting </button> </td>
                                        </tr>
                                        <tr>
                                            <td> Mentee3: 11:30am <button class="button2"> Join Meeting </button> </td>
                                        </tr>
                                        <tr>
                                            <td> Mentee4: 2pm <button class="button2"> Join Meeting </button> </td>
                                        </tr>
                                        <tr>
                                            <td> Mentee5: 4pm <button class="button2"> Join Meeting </button> </td>
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
