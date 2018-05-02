
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

console.log(audioContext.currentTime);



const sharkFin = function(x) {
	if (x < 0) return 0;
	x = (x * 2) % 2 + 0.05;
	if (x < 1) {
		return 1 + Math.log(x) / 4;
	}
	return Math.pow(-x, -2);
};
let sharkFinValues = [];

for (let i = 0; i < 1000; i++) {
  sharkFinValues.push(sharkFin(i / 2000) * 2000);
}

const ft = new DFT(sharkFinValues.length);
ft.forward(sharkFinValues);
const lfoTable = audioContext.createPeriodicWave(ft.real, ft.imag);



const osc = audioContext.createOscillator();
osc.frequency.value = 1200;

const lfo = audioContext.createOscillator();
lfo.setPeriodicWave(lfoTable);
lfo.frequency.value = 1 / 0.380;


lfoGain = audioContext.createGain();
lfoGain.gain.value = 450;

lfo.connect(lfoGain);
lfoGain.connect(osc.frequency);
osc.connect(audioContext.destination);

// osc.start();
// lfo.start();

// osc.stop(2);
// lfo.stop(2);

// console.log(audioContext.currentTime);

///////////////////

class Sound {

	constructor(context) {
	  this.context = audioContext;
	}
  
	init() {
	  this.oscillator = this.context.createOscillator();
	  this.gainNode = this.context.createGain();
  
	  this.oscillator.connect(this.gainNode);
	  this.gainNode.connect(this.context.destination);
	  this.oscillator.type = 'sine';
	}
  
	play(value, time) {
	  this.init();
  
	  this.oscillator.frequency.value = value;
	  this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
			  
	  this.oscillator.start(time);
	  this.stop(time);
  
	}
  
	stop(time) {
	  this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
	  this.oscillator.stop(time + 1);
	}
  
  }

let note = new Sound(audioContext);
let now = audioContext.currentTime;
note.play(261.63, now);
note.play(293.66, now + 0.5);
note.play(329.63, now + 1);
note.play(349.23, now + 1.5);
note.play(392.00, now + 2);
note.play(440.00, now + 2.5);
note.play(493.88, now + 3);
note.play(523.25, now + 3.5);