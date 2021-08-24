import React, { Component } from 'react';
// import MainContainer from './containers/MainContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return React.createElement('h2', null, "Hey Dude");
  }
  /*
  render() {
    return (
      <div>
        <p>Testing App Component...</p>
        <MainContainer />
      </div>
    );
  };
  */
}

export default App;