// importing libraries and dependencies
import {useState, useEffect} from "react";
import { FirebaseError } from 'firebase/app';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore} from 'firebase/firestore';
import {db} from '../firebase/firebase-config';
import "./reset.css"; //Resets styling
import "./viewTickets.css";

function App() {

  const [allTickets, setAllTickets] = useState([]);
  const [displayTickets, setDisplayTickets] = useState([]);
  const ticketsCollectionRef=collection(db, "Tickets");
  
  useEffect(() => {
    const getTickets = async () => {
        const data = await getDocs(ticketsCollectionRef);
        setDisplayTickets(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setAllTickets(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        //In the above line we are looping through the documents in the collection 
        // and setting the users array to be equal to an array of the document data and id for each document.
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

  //This function sorts the tickets based on date and resolved status. 
  const sortTickets = (value) => {

    let newArray = [];

    if(value=="All"){setDisplayTickets(allTickets); return;}

    //Sorts by Date:
    if((value=="Newest") || (value=="Oldest"))
    {
      newArray=[...allTickets];
      for (let i = 1; i < newArray.length; i++) {
            // Choosing the first element in our unsorted subarray
            let current = newArray[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (Date.parse(current.dateCreated) < Date.parse(newArray[j].dateCreated))) {
                newArray[j+1] = newArray[j];
                j--;
            }
            newArray[j+1] = current;
      }
      if(value=="Newest"){setDisplayTickets(newArray.reverse());} //Flips the array from Newest to Oldest.
      else{setDisplayTickets(newArray);}
      return;
    }

    //Sorts Resolved or Unresolved:
    for(let i=0; i<allTickets.length; i++)
    {
      if(allTickets[i].status==value)
      {
        newArray.push(allTickets[i]);
      }
    }
      setDisplayTickets(newArray);
      return;
    };

    /* 
    | checks if resolved, and if not resolved, it shows a button to resolve the ticket
    |
    | @param  Object  ticket
    | @return html  
    */
    const resolvedCheck = (ticket) => {
      console.log(ticket);
      console.log(ticket.status);
      if(ticket.status === "Resolved"){
        return <b className="text-primary text-center float-lg-none">RESOLVED!</b>
      }
      else{
        return <button type="button" class=" markResolved btn btn-outline-success" onClick={() =>{markResolved(ticket.id)}}>Mark as resolved</button>
      }
    }

    // returns the html output for the view tickets page
  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
      <div className="container-fluid">
        <div className="row">
          <h1 className="text-secondary text-center float-lg-none">View Tickets</h1>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-4 offset-md-4">
          <select className=" form-select form-select-md" id="categories" defaultValue={"default"} onChange={(event) => {sortTickets(event.target.value);}}>
            <option className="" value="default" disabled>Sort By</option>
            <option value="All">All</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Resolved">Resolved</option>
            <option value="Unresolved">Unresolved</option>
          </select>
          </div>
          
        </div>
        


        {displayTickets.map((ticket) => {
          return(
          <div className="row">
              <div class="col-sm-10 offset-md-1 pt-3">
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
                    {resolvedCheck(ticket)}
                  </div>
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
