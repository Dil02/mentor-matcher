import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, Firestore} from 'firebase/firestore';
import {db} from '../firebase/firebase-config';
import "./raiseTickets.css";
import "./reset.css"; //Resets styling
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useAuth, auth } from "../firebase/firebase-config";

//Bootstrap Imports:
import {Container, Row, Col, Button, NavbarBrand, NavLink} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let myEmailAddress="";
onAuthStateChanged(auth, (user) => {
  if(user){
    console.log("Current user's email address is: " + user.email);
    myEmailAddress=user.email;
  }
})

function App() {
  const [newCategory, setCategory] = useState("");
  const [newDescription, setDescription] = useState("");

  const [users, setUsers] = useState([]);

  const usersCollectionRef=collection(db, "Tickets");

  const createTicket = async () => {

    //Note: Input validation cannot be performed using 'required' due to the lack of the <form> tag.
    //Instead a separate function will be used.

    if(!validateForm()){return};

    let isUrgent= false;
    if(newCategory=="Wellbeing" || newCategory=="Login")
    {
      isUrgent=true;
      // Network issues and pairings are considered less urgent.
    }

    await addDoc(usersCollectionRef,
       {category: newCategory, 
        description: newDescription,
        dateCreated: String(new Date()),
        dateResolved : "N/A",
        emailAddress : myEmailAddress,
        phoneNumber : "Add this",
        status : "Unresolved",
        urgent : isUrgent
      });
  }

  const validateForm = () => {
  
    if(document.getElementById("categories").value=="default")
    {
      document.getElementById("inputCheck").innerHTML="You must select a ticket category.";
      return false;
    }
    if(document.getElementById("descript").value=="")
    {
      document.getElementById("inputCheck").innerHTML="You must enter a ticket description.";
      return false;
    }
    document.getElementById("categories").value="default";
    document.getElementById("descript").value="";
    document.getElementById("inputCheck").innerHTML="Ticket succesfully submitted.";
    return true;

  }

  return (
    
    <div className="App">
        <Container fluid className="ticket">
          <Row className='pt-2'>
            <h2 className='h2'>Submit New Support Ticket</h2>
            
            <p class="fw-bold">Having a problem? Please submit your question below.</p>
            <p>The more information you provide, the faster we can solve your problem.</p>
          </Row>

          <Row className="pt-2">
            <Col className="col">
              <select className="" id="categories" defaultValue={"default"} onChange={(event) => {setCategory(event.target.value);}}>
                  <option className="" value="default" disabled>Select a category</option>
                  <option value="Network">Network</option>
                  <option value="Login">Login</option>
                  <option value="Pairings">Pairings</option>
                  <option value="Wellbeing">Wellbeing</option>
              </select>
            </Col>
          </Row>

          <Row className='p-2'>
            <label className="p-2">Description</label>
            <textarea id="descript" placeholder="Description: Please provide details of the issue you are having." onChange={(event) => {setDescription(event.target.value);}}></textarea>  
          </Row>

          <Row className="pt-2">
            <Col className="justify-content-center text-center">
              <Button onClick={createTicket}>Raise Ticket</Button>
            </Col>
          </Row>
          
          <Row className="pt-2 d-flex justify-content-center text-center text-danger">
            <p id="inputCheck"></p>
          </Row>
        </Container>
    </div>
  );
}

export default App;