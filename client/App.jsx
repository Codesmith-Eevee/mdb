import React, { useState, useEffect } from 'react';
import { Switch as RouteSwitch, Route, /*useNavigate,  Redirect, */ useHistory  } from "react-router-dom";
import Login from './components/Login';
import MoreInfo from './components/MoreInfo';
import SwipeOnly from './components/SwipeOnly';
import Switch from 'react-ios-switch';
import './App.css';

/*
import {useNavigate} from 'react-router-dom';
const navigate = useNavigate();
navigate('/home')
*/

function App () {

  const history = useHistory();
  // const navigate = useNavigate();

  const [showMoreInfo, setMoreInfo] = useState(null);
  const [redirect, setRedirect] = useState(null);

  // if (redirect) history.push('/getuserid');


  useEffect(() => {
    if (redirect) {
      history.push('/getuserid')
    }
  })


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



export default App;