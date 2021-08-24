import React, { useState } from 'react';
import MoreInfo from './components/MoreInfo';
import SwipeOnly from './components/SwipeOnly';
import Switch from 'react-ios-switch';
import './App.css';

function App () {

  const [showMoreInfo, setMoreInfo] = useState(true);

  return (
    <div className='app'>
      {showMoreInfo ? <MoreInfo /> : <SwipeOnly />}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show more info</p> <Switch checked={showMoreInfo} onChange={setMoreInfo} />
      </div>
    </div>
  );

}


export default App;