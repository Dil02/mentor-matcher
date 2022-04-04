import {useState, useEffect} from "react";
import { FirebaseError } from 'firebase/app';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore} from 'firebase/firestore';
import {db} from './firebase-config';
import "./reset.css"; //Resets styling
import "./viewTickets.css";

function App() {

  const [tickets, setTickets] = useState([]);
  const usersCollectionRef=collection(db, "Tickets");
  
  useEffect(() => {
    const getTickets = async () => {
        const data = await getDocs(usersCollectionRef);
        setTickets(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        //In the above line we are looping through the documents in the collection 
        // and setting the users array to be equal to an array of the document data and id for each document.
    }

    getTickets();
  }, []);

  return (
    <div className="App">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
      <div className="container fluid">
        <h1>View Tickets</h1>
        {tickets.map((ticket) => {
          return(
            <div class="col-sm pt-3">
              <div class="row tickets p-3">
                <div class="col-m-12">
                  <p><b>Category: </b>{ticket.category}</p>
                  <p><b>Date Created: </b> {ticket.dateCreated}</p>
                  <p><b>Description: </b> {ticket.description}</p>
                  <p><b>User's Email: </b> {ticket.emailAddress}</p>
                  <p><b>User's Phone Number: </b> {ticket.phoneNumber}</p>
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