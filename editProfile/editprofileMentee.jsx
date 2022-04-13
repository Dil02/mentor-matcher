import React,{ useState,useEffect} from "react";
import {collection, getDocs, updateDoc, doc,query, where, getFirestore} from 'firebase/firestore';
import {useAuth,auth } from "../firebase/firebase-config";
import Profile from "./Profile";
import "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

export default function Editprofile(){


  const history = useHistory();
  
  //used 
  const handleRoute = () =>{ 
    history.push("./home/home");
  }

    


  let myEmail = "";
  const currentUser = useAuth();

  onAuthStateChanged(auth,(user)=>{
    if(user){
      console.log(user.email);
      myEmail = user.email;
    }
  }
  )

    const updateprofile = async (id,personalIntroduction,Qualifications,sector,location,phone,presentationskills,designThinking,leadershipSkills,verbalCommunications,careerProgression,coding,occupation,profilefname,surname) =>{
      const profiledoc = doc(db, "Mentees",id);
      const newFields = {Qualifications:Qualifications,personalIntroduction:personalIntroduction,sector:sector,firstName: profilefname,presentationskills:presentationskills, surname:surname, location:location,occupation:occupation,designThinking:designThinking,leadershipSkills,leadershipSkills,verbalCommunications:verbalCommunications,careerProgression:careerProgression,coding:coding,phone:phone};
      await updateDoc(profiledoc,newFields);
    };

    const [users, setUsers] = useState([]);
    const db = getFirestore();
    const colRef = (collection(db, "Mentees"));
    const newArray=[]

    const tempFunction = async() =>{

      const q=query(colRef,where("emailAddress","==", myEmail));
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        //doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        newArray.push(doc.data());
      }); console.log(newArray); setUsers(newArray)
    
  }

    useEffect(() => {
      const getUsers = async () => {
        tempFunction();
      };

      getUsers();
    }, []);



    const whensubmitted = async (id,personalIntroduction,Qualifications,sector,location,phone,presentationskills,designThinking,leadershipSkills,verbalCommunications,careerProgression,coding,occupation,profilefname,surname)=>{

      updateprofile(id,personalIntroduction,Qualifications,sector,location,phone,presentationskills,designThinking,leadershipSkills,verbalCommunications,careerProgression,coding,occupation,profilefname,surname);
      handleRoute()

    }




    function GoalStrength(){
      if(useAuth()){
        if(auth.currentUser.email == "billy@jenkins.com"){
          return (
            <div className ="col-md-3"><p className="description">Goals:</p></div>
          )
        }
        else{
          return (
            <div className ="col-md-3"><p className="description">Strengths:</p></div>
          )
        }
      }
      }


    return(

      <div>

      {users.map((user) => {
        return(
          <div>


<div className="container-fluid">
        <p className="font-weight-bold">Edit Profile</p>

      <form className="update">
      <div className="">
            <div className="row">
                <div className="col-md-4 border border-4">
                  <div>Currently logged in as: { currentUser?.email } 
                  </div>
                    <div className="d-flex flex-column align-items-center">
                      <div> 
                        <div>
              
                          {!currentUser && 
                            <>
                              <div>
                                No User Logged in
                              </div>

                            </>
                          }

                          {currentUser && 
                            <>
                              <Profile />
                            </>
                          }

                        </div>
                      </div>
                    </div>

                </div>
                <div className="col-md-8">
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-center">Edit Profile</h4>
                    </div>
                      <div className="row mt-2">
                        <div className="col-md-6"><input type="text" className="form-control" id= "fname"  defaultValue={user.firstName}></input></div>
                        <div className="col-md-6"><input type="text" className="form-control" id = "surname" defaultValue={user.surname}></input></div>
                      </div>

                      <div className="row mt-3">
                        <div className ="col-md-3"><p className="description">Phone Number:</p></div>
                        <div className="col-md-9"><input type="text" className="form-control"  id ="phone" defaultValue={user.phone}></input></div>
                      </div>


                      <div className="row mt-4">
                        <div class="form-group">
                        <div>personal Introduction</div>
                        <div><input type="text" className="form-control" id = "personalIntroduction" defaultValue={user.personalIntroduction}></input></div>
                        </div>
                      </div>
                        
                      <div className="row mt-4">
                        <div className ="col-md-3"><p className="description">Location:</p></div>
                        <div className="col-md-9"><input type="text" className="form-control" id = "location"  defaultValue={user.location}></input></div>
                      </div>

                      <div className="row mt-4">
                        <div className ="col-md-3"><p className="description">Occupation:</p></div>
                        <div className="col-md-9"><input type="text" className="form-control" id = "occupation"  defaultValue={user.occupation}></input></div>
                      </div>

                      <div className="row mt-4">
                      <div className ="col-md-3"><p className="description">Sector:</p></div>
                        <select class="col-md-9 form-select form-select-sm" id ="sector" name = "sector" defaultValue={user.sector} aria-label=".form-select-sm example">
                          <option disabled selected>Open this select menu</option>
                          <option value="technology">Technology</option>
                          <option value="marketing">Marketing</option>
                          <option value="marketing">Consulting</option>
                          <option value="marketing">Research</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="row mt-4">
                      <div className ="col-md-3"><p className="description">Qualifications:</p></div>
                        <select class="col-md-9 form-select form-select-sm" id ="Qualifications" defaultValue={user.Qualifications} name="Qualifications" aria-label=".form-select-sm example">
                          <option disabled selected>Open this select menu</option>
                          <option value="BSc">BSc</option>
                          <option value="MSc">MSc</option>
                          <option value="PhD">PhD</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                          Upto qualifications, everything is common for Mentor & Mentee
                          <br/>
                          Entries for Mentees
                      <div className="row mt-4">
                        <GoalStrength/>
                        <div className="col-md-9">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="presentationSkills" />
                          <label class="form-check-label" for="presentationSkills">
                            Presentation skills
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="designThinking" />
                          <label class="form-check-label" for="designThinking">
                            Design Thinking
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="leadershipSkills" />
                          <label class="form-check-label" for="leadershipSkills">
                            Leadership skills
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="verbalCommunications" />
                          <label class="form-check-label" for="verbalCommunications">
                            Verbal Communications
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="careerProgression" />
                          <label class="form-check-label" for="careerProgression">
                            Career Progression
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="coding" />
                          <label class="form-check-label" for="coding">
                            Coding
                          </label>
                        </div>
                        </div>
                      </div>
                      
                      <div className="mt-5 text-right"><button className="btn btn-primary profile-button " onClick={() =>{whensubmitted(currentUser?.email,document.getElementById('personalIntroduction').value,document.getElementById('Qualifications').value,document.getElementById('sector').value,document.getElementById("location").value,document.getElementById("phone").value,document.getElementById("presentationSkills").checked,document.getElementById("designThinking").checked,document.getElementById("leadershipSkills").checked,document.getElementById("verbalCommunications").checked,document.getElementById("careerProgression").checked,document.getElementById("coding").checked, document.getElementById("occupation").value,document.getElementById("fname").value, document.getElementById("surname").value)}} type="submit">Save Changes</button></div>
                  </div>
                </div>
            </div>
        </div>
      </form>

    </div>
    </div>

);
})}

          </div>
 

    )
}

