import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';
import "../App.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const history = useHistory();
  /*
    const redirect = () => {
      history.push('/login');
    }
    */
  // const navigate = useNavigate();

  function handleOnClick(username, password) {
    console.log("button clicked");
    console.log("username: ", username, " password: ", password);
    console.log("props: ", props);
    // redirect();
    props.setRedirect("/getuserid");
    // console.log(props.navigate('/getuserid'));
    // console.log('props.setRedirect: ', props.setRedirect('/getuserid'));
    console.log("redirected!");
    fetch("/api/getuserid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }), //username and password
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data: ", data);
        sessionStorage.clear();
        console.log("data in handleOnClick: ", data.rows);
        const tempArr = data.rows;
        tempArr.push(username);
        tempArr.forEach((element) => {
          sessionStorage.setItem(
            tempArr.indexOf(element),
            JSON.stringify(element)
          );
        });
        console.log(JSON.parse(sessionStorage));
        // console.log(JSON.parse(sessionStorage[0]));

        //switch view to tinder-style movie matching - requisite id populates data
        //props.setRedirect('/getuserid');
      })
      .catch((error) => {
        //props.setRedirect('/getuserid');
        console.log("error", error); // returns if error occurs
      });
  }

  return (
    <div>
      <h1 className="loginheader">Log In to tinder-style movie matching!</h1>
      <div className="form-group">
        <input
          type="username"
          className="form-control"
          placeholder="Your username here"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <div className="separate"></div>
        <input
          type="password"
          className="form-control"
          placeholder="Your password here"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="separate"></div>
        <button
          type="submit"
          className="btn btn-success btn-large w-100"
          onClick={() => {
            handleOnClick(username, password);
          }}
        >
          Click to login!
        </button>
        <div className="separate"></div>
      </div>
    </div>
  );
};

export default Login;
