import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import logo from './logo.png';
import {auth} from './firebase/firebase-config'
import {  onAuthStateChanged, signOut} from 'firebase/auth';
import { useAuth } from './firebase/firebase-config';

//importing pages
import Selection from './selection/Selection';
import Home from './home/home';
import Login from './login/Login';
import Registration from './registration/Registration';
import MenteeHome from './menteeHome/MenteeHome';
import AdminHome from './adminHome/AdminHome';
import Editprofile from './editProfile/editprofile';
import RaiseTickets from './RaiseTickets/raiseTickets';
import ViewTickets from './ViewTickets/viewTickets'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const logout = async (e) => {
  e.preventDefault();
  try{
    signOut(auth)  
    } catch(error)
    {
      alert("Invalid Login Details");
      console.log(error.message);
    }
};

onAuthStateChanged(auth, (user) => {
  console.log('Login status change:', user)
})

function LoginButton() {
  const isLoggedIn = useAuth()
  return (
    isLoggedIn ? <li class="login"><button onClick={logout}>LOGOUT</button></li> : <li class="login"><Link to="/Login" class="login">LOGIN</Link></li>
  )
}

function Homepagelogin() {
  const isLoggedIn = useAuth()
  return (
    isLoggedIn ? <MenteeHome />  : <Login />
  )
}

function HomePage() {
  const isLoggedIn = useAuth()
  return (
    isLoggedIn ? <MenteeHome />  : <Home />
  )
}




ReactDOM.render(
  <React.StrictMode>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
      <link rel="stylesheet" href="style.css"/>  
      <Router>
        <nav id="navbar">
          <li><Link to="/Home"><img src={logo} alt="logo" class= "fdmlogo"/></Link></li>
          <li><Link to="/Home" class="home">HOME</Link></li>
          <li><a href="home.html#about" class="about">ABOUT</a></li>
          <li><a href="home.html#faqs" class="faqs">FAQS</a></li>
          <li><a href="home.html#contact" class="contact">CONTACT</a></li>
          <li><Link to="/Registration" className="register">REGISTER</Link></li>
          <li><Link to="/Editprofile" className="Editprofile">Editprofile</Link></li>
          <li><Link to="/AdminHome" className="AdminHome">AdminHome</Link></li>
          <li><Link to="/RaiseTickets" className="RaiseTickets">RaiseTickets</Link></li>
          <li><Link to="/ViewTickets" className="ViewTickets">ViewTickets</Link></li>
          <LoginButton />
        </nav>
        <Switch>
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
          <Route path="/AdminHome">
            <AdminHome />
          </Route>
          <Route path="/RaiseTickets">
            <RaiseTickets />
          </Route>
          <Route path='/ViewTickets'>
            <ViewTickets/>
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
