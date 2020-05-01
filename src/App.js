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

let keyMap2 = {
  'Q': 'acoustic/clap-analog.wav',
  'W': 'acoustic/crash-acoustic.wav',
  'E': 'acoustic/hihat-acoustic02.wav',
  'A': 'acoustic/kick-classic.wav', 
  'S': 'acoustic/openhat-acoustic01.wav', 
  'D': 'acoustic/perc-tribal.wav',
  'Z': 'acoustic/ride-acoustic01.wav',
  'X': 'acoustic/shaker-analog.wav',
  'C': 'acoustic/snare-analog.wav'
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
    this.handleBankSliderClick = this.handleBankSliderClick.bind(this);
  }

  handlePadClick (event) {
    if (this.state.isPowerOn) {
      window.document.getElementById(event.target.id).children[0].pause();
      window.document.getElementById(event.target.id).children[0].currentTime = 0;
      window.document.getElementById(event.target.id).children[0].play();
      if (this.state.bank1) {
        this.setState({mostRecentAudio: keyMap1[event.target.id.split("")[0]] });
      } else {
        this.setState({mostRecentAudio: keyMap2[event.target.id.split("")[0]] });
      }
    }
  }

  handlePowerSliderClick () {
    this.setState(function (state) {return {isPowerOn: !state.isPowerOn}}); 
    if (this.state.isPowerOn) {
      this.setState({mostRecentAudio: "Power Off"})
    } else {
      this.setState({mostRecentAudio: ""});
    }
  }

  handleBankSliderClick () {
    this.setState(function (state) {return {bank1: !state.bank1}});
    console.log(this.state.bank1);
  }

  render () {
    return  (
      <div id = "drum-machine">
        <div id = "pads">
          {keys.toUpperCase().split("").map((elem, index) => <div onClick = {this.handlePadClick} className = "drum-pad" key = {index} id = {elem + "p"}>{elem}
            <audio id = {elem} className = "clip"  src = {this.state.bank1?("Samples/" + keyMap1[elem]):("Samples/" + keyMap2[elem])} /> 
          </div>)}
        </div>
        <div id = "buttons">
          <Slider heading = "Power" sliderOn = {this.state.isPowerOn} sliderClick = {this.handlePowerSliderClick}/> 
          <Slider heading = "Bank" sliderOn = {this.state.bank1} sliderClick = {this.handleBankSliderClick}/>
          <div id = "displayUnit">
            <div id = "displayHeader">Display</div>
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
    this.document.getElementById(event.key.toUpperCase() + "p").classList.add("pressed");
  }
});

window.addEventListener("keyup", function (event) {
  if (keys.split("").indexOf(event.key.toLowerCase()) !== -1) {
    this.document.getElementById(event.key.toUpperCase() + "p").classList.remove("pressed");
  }
});

export default App;
