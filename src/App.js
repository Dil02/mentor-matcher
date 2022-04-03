import {useState, useEffect} from "react";
import './App.css';
import {db} from './firebase-config';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';

function App() {
  const [newEmailAddress, setNewEmailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updatedPassword, setUpdatedPassword] = useState("");


  const [users, setUsers] = useState([]);
  const usersCollectionRef=collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {emailAddress: newEmailAddress, password: newPassword});
  }

  const changePassword = async (id) => {
    const userDoc = doc(db, "users", id);
    const newFields = {password: updatedPassword}
    await updateDoc(userDoc, newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }


  useEffect(() => {
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        //In the above line we are looping through the documents in the collection 
        // and setting the users array to be equal to an array of the document data and id for each document.
    }

    getUsers();
  }, []);
  return (
    <div className="App">
      <input placeholder="Email Address..." onChange={(event) => {setNewEmailAddress(event.target.value);}}></input>
      <input placeholder="Password..." onChange={(event) => {setNewPassword(event.target.value);}}></input>

      <button onClick={createUser}>Create User</button>

      {users.map((user) => {
        return(
          <article>
            <h1>Email Address: {user.emailAddress}</h1>
            <h1>Password: {user.password}</h1>
            <h1>Username: {user.username}</h1>
            <input placeholder="New Password..." onChange={(event) => {setUpdatedPassword(event.target.value);}}></input>
            <button onClick={() => {changePassword(user.id)}}>Change Password</button>
            <button onClick={() => {deleteUser(user.id)}}>Delete User</button>

          </article>
        );
      })}
    </div>
  );
}

export default App;
