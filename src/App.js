import React from 'react';
import './App.css';

const keys = "qweasdzxc";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }
  render () {
    return  (
      <div id = "drum-machine">
        <div id = "pads">
          {keys.toUpperCase().split("").map((elem) => <div className = "drum-pad" id = {elem}>{elem}</div>)}
        </div>
        <div id = "buttons">
          <div id = "power"><span>Power</span></div>
          <div id = "display"><span>Display:</span></div>
        </div>
      </div>
      );
  }
}

window.onkeypress = (event) => {
  if (keys.split("").indexOf(event.key.toLowerCase()) !== -1) {
    document.getElementById(event.key.toUpperCase()).click();
  }
}

export default App;
