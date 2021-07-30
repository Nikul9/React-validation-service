import React, { createContext, useReducer } from 'react'
import './App.css';
import Login from './Components/login'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from './Components/regiester'
import UserDetail from "./Components/userProfile"
import Detail from './Components/detail'
import {reducer , initialState} from './Components/reduser/reduser'

export const userDetail = createContext()
function App() {
  const [state , dispatch] = useReducer(reducer , initialState)
  return (
      <>
      <Router>
      
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          
        <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>positronX.io</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/userdetail"}>EditDetail</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/detail"}>UserDetail</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            
            <userDetail.Provider value={{state,dispatch}}> 
              <Route exact path='/' component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/userdetail" component={UserDetail} />
              <Route path="/detail" component={Detail} />
            </userDetail.Provider>
          </div>
        </div>
      </div></Router>
      </>
    );
}

export default App;
