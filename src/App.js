import React, {useState} from 'react';
import './App.css';

const keys = "qweasdzxc";

let Slider = (props) => {
    return (  
    <div className = "slider">
      <div className = "sliderHeader">{props.heading}</div>
      <div className = {props.sliderOn?"sliderBar":"sliderBar power-off"} onClick = {props.sliderClick}>
        <div className = "sliderCircle"></div>
      </div>
    </div>
  );
}

let keyMap1 = {
  'Q': 'Beat01a.mp3',
  'W': 'Check_your_answers.mp3',
  'E': 'Cowbell.wav',
  'A': 'HiHat.wav', 
  'S': 'Rim Shot.wav', 
  'D': 'Snare.wav',
  'Z': 'Tamb 1.wav',
  'X': 'Motorway.mp3',
  'C': 'FX.mp3'
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isPowerOn: true,
      bank1: true,
      mostRecentAudio: ""
    }
    this.handlePadClick = this.handlePadClick.bind(this);
    this.handlePowerSliderClick = this.handlePowerSliderClick.bind(this);
    this.handleDisplaySliderClick = this.handleDisplaySliderClick.bind(this);
  }

  handlePadClick (event) {
    if (this.state.isPowerOn) {
      window.document.getElementById(event.target.id).children[0].play();
      this.setState({mostRecentAudio: keyMap1[event.target.id.split("")[0]] });
    }
  }

  handlePowerSliderClick () {
    this.setState(function (state) {return {isPowerOn: !state.isPowerOn}});   
  }

  handleDisplaySliderClick () {
    this.setState(function (state) {return {bank1: !state.bank1}});
  }

  render () {
    return  (
      <div id = "drum-machine">
        <div id = "pads">
          {keys.toUpperCase().split("").map((elem, index) => <div onClick = {this.handlePadClick} className = "drum-pad" key = {index} id = {elem + "p"}>{elem}
            <audio id = {elem} className = "clip"  src = {"Samples/" + keyMap1[elem]} /> 
          </div>)}
        </div>
        <div id = "buttons">
          <Slider heading = "Power" sliderOn = {this.state.isPowerOn} sliderClick = {this.handlePowerSliderClick}/> 
          <Slider heading = "Bank" sliderOn = {this.state.bank1} sliderClick = {this.handleDisplaySliderClick}/>
          <div id = "displayUnit">
            <div id = "displayHeader"> Display:</div>
            <div id = "display">{this.state.mostRecentAudio}</div>
          </div>
        </div>
      </div>
      );
  }
}

window.addEventListener("keydown", function (event) {
  if (keys.split("").indexOf(event.key.toLowerCase()) !== -1) {
    this.document.getElementById(event.key.toUpperCase() + "p").click();
    this.document.getElementById(event.key.toUpperCase() + "p").style.backgroundColor = "rgb(76, 76, 165)";
  }
});

window.addEventListener("keyup", function (event) {
  if (keys.split("").indexOf(event.key.toLowerCase()) !== -1) {
    this.document.getElementById(event.key.toUpperCase() + "p").style.backgroundColor = "rgb(137, 137, 143)";
  }
});

export default App;
