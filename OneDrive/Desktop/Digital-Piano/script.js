const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const volumeSlider = document.getElementById("volume");
const waveType = document.getElementById("waveType");

const notes = {
  C: 261.63,
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.00,
  A: 440.00,
  B: 493.88
};

function playNote(frequency) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = waveType.value;
  oscillator.frequency.value = frequency;

  gainNode.gain.value = volumeSlider.value;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();

  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.5
  );

  oscillator.stop(audioContext.currentTime + 0.5);
}

document.querySelectorAll(".white.key").forEach(key => {
  key.addEventListener("click", () => {
    const note = key.dataset.note;
    playNote(notes[note]);
  });
});

document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "a":
      playNote(notes.C);
      break;
    case "s":
      playNote(notes.D);
      break;
    case "d":
      playNote(notes.E);
      break;
    case "f":
      playNote(notes.F);
      break;
    case "g":
      playNote(notes.G);
      break;
    case "h":
      playNote(notes.A);
      break;
    case "j":
      playNote(notes.B);
      break;
  }
});