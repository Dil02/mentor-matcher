import './Selection.css';
import {useState, useEffect} from "react";
import {auth} from ".././firebase/firebase-config";
import {db} from ".././firebase/firebase-config"; 
import {getDoc, getDocs, collection, setDoc, doc, updateDoc, arrayUnion} from "firebase/firestore";
import MentorBox from './MentorBox';



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
  const mentorCol = collection(db, "Mentors");

  const [confirm, setConfirm] = useState(false)
  
  useEffect(() => {
    const getMentors = async () => {
        const data = await getDocs(mentorCol);
        const docRef = doc(db, "Mentees", auth.currentUser.email)
        const docSnap = await getDoc(docRef)
        setPending(docSnap.data().pending)
        setMentor(docSnap.data().mentor)
        
        setDisplayMentors(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
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
      infoArray[i][4] = displayMentors[i].description;
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
  if (currentMentor != null) {
    return (<h1>Paired with {currentMentor}</h1>)
  }
  else if (pending == null) {
  return (
    <div class="selection">
        <div class="text-center p-4">
        {displayMentors.length == 0 ? <h2>Unfortunately you could not be matches with any mentors at this time</h2> : <h1>We have matched you with the following mentors. Please select one from below:</h1>}
        </div>
        {confirm && 
        <div>
          <h2>Send a request to this mentor?</h2>
          <button onClick={setRequest}>Confirm</button>
          <button onClick={toggleConfirm}>Deny</button>
        </div>}
        {displayMentors.length == 0 ? <h2></h2> : showMentors(infoArray, toggleConfirm)}
    </div>
    
    
  ) } else {
    return(<h2>MENTOR REQUEST PENDING</h2>)
  }
}

export default Selection;
