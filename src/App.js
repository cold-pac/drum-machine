import React, {useState} from 'react';
import './App.css';

const keys = "qweasdzxc";

let Slider = (props) => {
  let [powerOn, setPowerOn] = useState(true);
  let barHandleClick = () => {
    setPowerOn(!powerOn);
  }
  return (
    <div className = "slider">
      <div className = "sliderHeader">{props.heading}</div>
      <div className = {powerOn?"sliderBar":"sliderBar power-off"} onClick = {barHandleClick}>
        <div className = "sliderCircle"></div>
      </div>
    </div>
  );
}

let keyMap = {
  'Q': 'Beat01a',
  'W': 'Check_your_answers',
  'E': 'Cowbell',
  'A': 'HiHat', 
  'S': 'Rim Shot', 
  'D': 'Snare',
  'Z': 'Tamb 1',
  'X': 'Motorway',
  'C': 'FX'
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
    this.handlePadClick = this.handlePadClick.bind(this);
  }

  handlePadClick (event) {
    window.document.getElementById(keyMap[event.target.id]).play();
  }

  render () {
    return  (
      <div id = "drum-machine">
        <div id = "pads">
          {keys.toUpperCase().split("").map((elem, index) => <div onClick = {this.handlePadClick} className = "drum-pad" key = {index} id = {elem}>{elem}</div>)}
        </div>
        <div id = "buttons">
          <Slider heading = "Power" /> 
          <Slider heading = "Bank" />
          <div id = "displayUnit">
            <div id = "displayHeader"> Display:
            </div>
            <div id = "display"></div>
          </div>
        </div>
      </div>
      );
  }
}

window.onkeydown = (event) => {
  if (keys.split("").indexOf(event.key.toLowerCase()) !== -1) {
    document.getElementById(event.key.toUpperCase()).click();
    document.getElementById(event.key.toUpperCase()).style.backgroundColor = "blue";
  }
}

window.onkeyup = (event) => {
  if (keys.split("").indexOf(event.key.toLowerCase()) !== -1) {
    document.getElementById(event.key.toUpperCase()).style.backgroundColor = "rgb(178, 179, 185)";
  }
}

export default App;
