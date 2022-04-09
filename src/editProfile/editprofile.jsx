import React,{useRef, useState} from "react";
import {firestore} from  "../firebase/firebase-config";
import {addDoc,collection } from "@firebase/firestore"
import { storage } from "../firebase/firebase-config";
import { signup, login, logout, useAuth , auth, db} from "../firebase/firebase-config";
import Profile from "./Profile";


export default function Home(){


    const FnameRef = useRef();
    const LnameRef = useRef(); 
    const EmailRef = useRef(); 
    const PassRef = useRef(); 
    const preferencesRef = useRef();
    const currentUser = useAuth();
    const [ loading, setLoading ] = useState(false);


    const ref = collection(firestore, "users");

    const handlesave = async(e)=>{
        e.preventDefault();


        let data ={
            Fname:FnameRef.current.value,
            Lname:LnameRef.current.value,
            Email:EmailRef.current.value,
            Pass:PassRef.current.value,
            preferences:preferencesRef.current.value

        }

        try{
            addDoc(ref,data)
        } catch(e){
            console.log(e);
        }

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

      <div className="container-fluid">
        <p className="font-weight-bold">Edit Profile</p>

      <form onSubmit={handlesave}>
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
                        <div className="col-md-6"><input type="text" className="form-control" ref ={FnameRef} placeholder="first name"></input></div>
                        <div className="col-md-6"><input type="text" className="form-control" ref ={LnameRef} placeholder="Last Name"></input></div>
                      </div>
                      <div className="row mt-3">
                        <div className ="col-md-3"><p className="description">Email:</p></div>
                        <div className ="col-md-9"><input type="text" className="form-control" ref ={EmailRef} placeholder="Email"></input></div>
                      </div>
                      <div className="row mt-3">
                        <div className ="col-md-3"><p className="description">Password:</p></div>
                        <div className="col-md-9"><input type="text" className="form-control" ref ={PassRef} placeholder="Password"></input></div>
                      </div>

                      {/* <div className="row mt-4">
                        <div className ="col-md-3"><p className="description">Preferences:</p></div>
                        <div className="col-md-9"><input type="text" className="form-control" ref ={preferencesRef} placeholder="Preferences"></input></div>
                      </div> */}

                        {/* NEED to make changes from below: */}
                        {/* Have to change the Ref */}

                      <div className="row mt-4">
                        <div class="form-group">
                        <label for="personalIntroduction">Personal Introduction:</label>
                        <textarea class="form-control" id="personalIntroducton" rows="2"></textarea>
                        </div>
                      </div>
                        
                      <div className="row mt-4">
                        <div className ="col-md-3"><p className="description">Location:</p></div>
                        <div className="col-md-9"><input type="text" className="form-control" ref ={preferencesRef} placeholder="Location"></input></div>
                      </div>

                      <div className="row mt-4">
                        <div className ="col-md-3"><p className="description">Occupation:</p></div>
                        <div className="col-md-9"><input type="text" className="form-control" ref ={preferencesRef} placeholder="Occupation"></input></div>
                      </div>

                      <div className="row mt-4">
                      <div className ="col-md-3"><p className="description">Sector:</p></div>
                        <select class="col-md-9 form-select form-select-sm" aria-label=".form-select-sm example">
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
                        <select class="col-md-9 form-select form-select-sm" aria-label=".form-select-sm example">
                          <option disabled selected>Open this select menu</option>
                          <option value="1">BSc</option>
                          <option value="2">MSc</option>
                          <option value="3">PhD</option>
                          <option value="3">Other</option>
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

                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="storytellingMentee" />
                          <label class="form-check-label" for="storytellingMentee">
                            Storytelling
                          </label>
                        </div>
                        </div>
                      </div>
                      
                      <div className="mt-5 text-right"><button className="btn btn-primary profile-button " type="submit">Save Changes</button></div>
                  </div>
                </div>
            </div>
        </div>
      </form>

    </div>

    )
}

// Mentee Profile:
// -	
// Mentor Profile:
// -	Short introduction of themselves (could include awards and organisations)
// -	Experience (in years)
// -	LinkedIn profile link
// -	What are your strengths?
