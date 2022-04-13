import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './editProfile/mystyle.css';
import reportWebVitals from './reportWebVitals';
import logo from './logo.png';
import {auth, useAuth, db} from './firebase/firebase-config'
import {  onAuthStateChanged, signOut} from 'firebase/auth';
import { collection, getDocs, query, where, onSnapshot, doc, getDoc } from '@firebase/firestore';
import { async } from '@firebase/util';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//importing pages
import Selection from './selection/Selection';
import Home from './home/home';
import Login from './login/Login';
import Registration from './registration/Registration';
import MenteeHome from './menteeHome/MenteeHome';
import AdminHome from './adminHome/AdminHome';
import Editprofile from './editProfile/editprofile';
import EditprofileMentee from './editProfile/editprofileMentee';
import RaiseTickets from './RaiseTickets/raiseTickets';
import ViewTickets from './ViewTickets/viewTickets'
import MentorHome from './mentorHome/MentorHome';
import MenteeSelection from './MenteeSelection/MenteeSelection';
import Messages from './Messages/Messages';
import MessagesMentors from './Messages/MessagesMentor';

// importing images
import FDMLogo from './logo.png';

const logout = async (e) => {
  e.preventDefault();
  try{
    signOut(auth)  
    } catch(error)
    {
      alert("Invalid Login Details");
      console.log(error.message);
    }
    window.location.href = "/Home"

};

onAuthStateChanged(auth, (user) => {
  console.log('Login status change:', user)
})

function Homepagelogin() {
  const isLoggedIn = useAuth()
  return (
    isLoggedIn ? <MenteeOrMentor />  : <Login />
  )
}

function HomePage() {
  const isLoggedIn = useAuth()
  return (
    isLoggedIn ? <MenteeOrMentor />  : <Home />
  )
}

/*async function checkMentors(db) {
  const mentorsCol = collection(db, 'Mentors');
  const mentorSnapshot = await getDocs(mentorsCol);
  const mentorList = mentorSnapshot.docs.map(doc => doc.data());
  for(var i = 0; i<mentorList.length; i++) {
    if (mentorList[i].emailAddress == auth.currentUser.email) {
      return true
    }
  }
  return false;
}*/


function MenteeOrMentor() {
  //let docRef = doc(db, "Mentors", auth.currentUser.email)
  if (auth.currentUser.email == "billy@jenkins.com" |
  auth.currentUser.email == "mentor@test.com" 
  )
  {
    return(<MentorHome />)
  } else if (auth.currentUser.email == "admin@gmail.com") {
    return (<AdminHome />) 
  } else {
    return(<MenteeHome />)
  }
}


function NavBar() {
  if (!useAuth()) {
    return(
      <nav id="navbar">
        <li><Link to="/Home"><img src={logo} alt="logo" class= "fdmlogo"/></Link></li>
        <li><Link to="/Home" class="home">HOME</Link></li>
        <li><a href="/Home#about" class="about">ABOUT</a></li>
        <li><a href="/Home#faqs" class="faqs">FAQS</a></li>
        <li><Link to="/Registration" className="register">REGISTER</Link></li>
        <li class="login"><Link to="/Login" class="login">LOGIN</Link></li>
      </nav> 
      )

      
  } 
  else {
    // admin
    if(auth.currentUser.email == "admin@gmail.com"){
      return (
        <nav id="navbar">
          <li><Link to="/Home"><img src={logo} alt="logo" class= "fdmlogo"/></Link></li>
          <li><Link to="/Home" class="home">HOME</Link></li>
          {/* <li><a href="home.html#contact" class="contact">VIEW MENTEES</a></li> */}
          <li><Link to="/ViewTickets" className="home">VIEW TICKETS</Link></li>
          <li class="login"><button className='logoutButton' onClick={logout}>LOGOUT</button></li>
        </nav> )
    }
    // mentor
    else if (auth.currentUser.email == "billy@jenkins.com" |
    auth.currentUser.email == "mentor@test.com") {
      return (
        <nav id="navbar">
          <li><Link to="/Home"><img src={logo} alt="logo" class= "fdmlogo"/></Link></li>
          <li><Link to="/Home" class="home">HOME</Link></li>
          <li><Link to="/Editprofile" className="home">EDIT PROFILE</Link></li>
          <li><Link to="/RaiseTickets" className="home">RAISE TICKET</Link></li>
          <li><Link to="/MenteeSelection" class="contact">VIEW MENTEES</Link></li>
          <li class="login"><button className='logoutButton' onClick={logout}>LOGOUT</button></li>
        </nav> )
    } 
    // mentee
    else {
      return (
        <nav id="navbar">
          <li><Link to="/Home"><img src={logo} alt="logo" class= "fdmlogo"/></Link></li>
          <li><Link to="/Home" class="home">HOME</Link></li>
          <li><Link to="/EditprofileMentee" className="home">EDIT PROFILE</Link></li>
          <li><Link to="/RaiseTickets" className="home">RAISE TICKET</Link></li>
          <li><Link to="/Selection" class="contact">MENTOR</Link></li>
          <li class="login"><button className='logoutButton' onClick={logout}>LOGOUT</button></li>
        </nav> )
    }
    
  }
}



ReactDOM.render(
  <React.StrictMode>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
      <link rel="stylesheet" href="style.css"/>  
      <Router>
        <NavBar/>
        <Switch>
          {/* <Route path="/">
            <HomePage />
          </Route> */}
          <Route path="/Selection">
            <Selection />
          </Route>
          <Route path="/Home">
            <HomePage />
          </Route>
          <Route path="/Login">
            <Homepagelogin />
          </Route>
          <Route path="/Registration">
            <Registration />
          </Route>
          <Route path="/Editprofile">
            <Editprofile />
          </Route>
          <Route path="/EditprofileMentee">
            <EditprofileMentee />
          </Route>
          <Route path="/AdminHome">
            <AdminHome />
          </Route>
          <Route path="/RaiseTickets">
            <RaiseTickets />
          </Route>
          <Route path="/MenteeSelection">
            <MenteeSelection />
          </Route>
          <Route path='/ViewTickets'>
            <ViewTickets/>
          </Route>
          <Route path='/Messages'>
            <Messages/>
          </Route>
          <Route path='/MessagesMentors'>
            <MessagesMentors/>
          </Route>
        </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
