
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

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

osc.start();
lfo.start();

osc.stop(2);
lfo.stop(2);


