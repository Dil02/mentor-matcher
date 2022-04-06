import {useState, useEffect} from "react";
import { FirebaseError } from 'firebase/app';
import {collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore, where, query} from 'firebase/firestore';
import {db} from './firebase/firebase-config';
import "./reset.css"; //Resets styling
import "./View Tickets/viewTickets.css";

function App() {

  const [allTickets, setAllTickets] = useState([]);
  const [displayTickets, setDisplayTickets] = useState([]);
  const ticketsCollectionRef=collection(db, "Tickets");
  
  useEffect(() => {
    const getTickets = async () => {
        const data = await getDocs(ticketsCollectionRef);
        //setDisplayTickets(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setAllTickets(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        //In the above line we are looping through the documents in the collection 
        // and setting the users array to be equal to an array of the document data and id for each document.
        tempFunction();
    }

    getTickets();
  }, []);

  //Once the system admin marks a ticket as 'resolved' the ticket in the collection is updated in Firebase.
  const markResolved = async (id) =>{
    const ticketDoc = doc(db, "Tickets",id);
    const newFields = {dateResolved: String(new Date()), status: "Resolved"};
    await updateDoc(ticketDoc,newFields);
    window.location.reload();
  };

  //Used to find a particular document within a collection.
  const tempFunction = async() =>{
    const newArray=[]

    //Used to get documents which meet certain criteria:
    // const q=query(ticketsCollectionRef,where("category","==","Pairings"));

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   //console.log(doc.id, " => ", doc.data());
    //   newArray.push(doc.data());
    // }); console.log(newArray); setDisplayTickets(newArray);
  
    //Used to get a single particular document:
    const docRef = doc(db, "Tickets", "yKTOKR5I665gjWq92RM0");
    const docSnap = await getDoc(docRef);

    newArray.push(docSnap.data());
    setDisplayTickets(newArray);
  
  }

  return (
    <div className="App">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
      <div className="container fluid">

        <h1>View Tickets</h1>

        {displayTickets.map((ticket) => {
          return(
            <div class="col-sm pt-3">
              <div class="row tickets p-3">
                <div class="col-m-10">
                  <p><b>Category: </b>{ticket.category}</p>
                  <p><b>Date Created: </b> {ticket.dateCreated}</p>
                  <p className="dateResolved"><b>Date Resolved: </b> {ticket.dateResolved}</p>
                  <p><b>Description: </b> {ticket.description}</p>
                  <p><b>User's Email: </b> {ticket.emailAddress}</p>
                  <p><b>User's Phone Number: </b> {ticket.phoneNumber}</p>
                </div>
                <div class="col-m-2">
                  <button type="button" class=" markResolved btn btn-outline-success" onClick={() =>{markResolved(ticket.id)}}>Mark as resolved</button>
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
