import React, { useState } from 'react';
import '../App.css';

const Login = () => {
    const [username, setUsername] = useState(true);
    const [password, setPassword] = useState(true);

    function handleOnClick (username, password) {
        console.log('button clicked');
        console.log('username: ', username, ' password: ', password);
        fetch('/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}) //username and password 
        })
        .then(res => res.json())
        .then(data => {
          console.log('data in handleOnClick: ', data)
        //switch view to tinder-style movie matching - requisite id populates data
          props.setRedirect('/getuserid');
        })
        .catch((error) => {
        console.log('error', error)  // returns if error occurs
        })
    };

        return (
          <div>
            <h1 className="loginheader">Log In to tinder-style movie matching!</h1>
              <div className="form-group">
                <input type="username" className="form-control" placeholder="Your username here" onChange={(e) => { setUsername(e.target.value) } } />
                <div className="separate"></div>
                <input type="password" className="form-control" placeholder="Your password here" onChange={(e) => { setPassword(e.target.value)} }/>
                <div className="separate"></div>
                <button type="submit" className="btn btn-success btn-large w-100" onClick={() => { handleOnClick(username, password) } } >Click to login!</button>
                <div className="separate"></div>
              </div>
          </div>
        );
}

export default Login;