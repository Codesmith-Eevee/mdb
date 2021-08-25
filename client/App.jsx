import React, { useState } from 'react';
// import { BrowserRouter as Router } from "react-router-dom";
import { Switch as RouteSwitch, Route } from "react-router-dom";
import Login from './components/Login';
import MoreInfo from './components/MoreInfo';
import SwipeOnly from './components/SwipeOnly';
import Switch from 'react-ios-switch';
import './App.css';

function App () {

  const [showMoreInfo, setMoreInfo] = useState(true);
  const [redirect, setRedirect] = useState(true);
  
  return (

    <div>
      <RouteSwitch>

      <Route exact path="/getuserid">
      <div className='app'>
      {showMoreInfo ? <MoreInfo /> : <SwipeOnly />}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show more info</p> <Switch checked={showMoreInfo} onChange={setMoreInfo} />
      </div>
      </div>

    </Route>

      <Route exact path="/">
          <div className="authentication">
            <Login redirect={redirect} setRedirect={setRedirect} />
          </div>
        </Route>


    </RouteSwitch>
    </div>

  );
}
    /*
    <div className='app'>
      {showMoreInfo ? <MoreInfo /> : <SwipeOnly />}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show more info</p> <Switch checked={showMoreInfo} onChange={setMoreInfo} />
      </div>
    </div>
    */


/*
    <div>
      <RouteSwitch>
        <Route exact path="/login">
          <div className="authentication">
            <Login redirect={redirect} setRedirect={setRedirect} />
          </div>
        </Route>

        <Route exact path="/signup">
          <div className="authentication">
            <Signup />
          </div>
        </Route>

        <Route exact path="/getuserid">
          <div className='app'>
            {showMoreInfo ? <MoreInfo /> : <SwipeOnly />}
            <div className='row'>
              <p style={{ color: '#fff' }}>Show more info</p> <Switch checked={showMoreInfo} onChange={setMoreInfo} />
            </div>
          </div>
        </Route>

      </RouteSwitch>
    </div>
*/


export default App;