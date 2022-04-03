import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Selection from './Selection';
import Registration from './Registration'
import Home from './home';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>

      <Router>
        <nav id="navbar">
          <li><Link to="/"><img src="./logo.png" alt="logo" className= "fdmlogo"/></Link></li>
          <li><Link to="/Home" className="home">HOME</Link></li>
          <li><a href="home.html#about" className="about">ABOUT</a></li>
          <li><a href="home.html#faqs" className="faqs">FAQS</a></li>
          <li><a href="home.html#contact" className="contact">CONTACT</a></li>
          <li><Link to="/Selection" className="contact">SELECT TEST</Link></li>
          {/* <li className="register"><a href="Register.html" className="register">REGISTER</a></li> */}
          <li><Link to="/Registration" className="register">REGISTER</Link></li>
          <li className="login"><a href="Login.html" className="login">LOGIN</a></li>
        </nav>
        <Switch>
          <Route path="/Selection">
            <Selection />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Registration">
            <Registration />
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
