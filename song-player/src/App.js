import React, { useState } from 'react';
import * as Tone from 'tone';
import './App.css';

function App() {
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [selectedSong, setSelectedSong] = useState('');
  const [player, setPlayer] = useState(null);
  const [audioContextStarted, setAudioContextStarted] = useState(false);
  const [pitchShift, setPitchShift] = useState(null);

  // Starte den Audio-Kontext, falls nicht bereits gestartet
  const startAudioContextIfNeeded = () => {
    if (!audioContextStarted) {
      Tone.start();
      setAudioContextStarted(true);
      console.log("AudioContext started");
    }
  };

  // Erstellen des Audio-Players
  const createPlayer = (song) => {
    const audioFile = process.env.PUBLIC_URL + '/songs/' + song;
    const newPlayer = new Tone.Player({
      url: audioFile,
      onload: () => {
        console.log("Buffer loaded");
        startAudioContextIfNeeded(); // Starte den Audio-Kontext, wenn der Buffer geladen ist
        newPlayer.start();
      }
    }).toDestination();
    return newPlayer;
  };

  // Laden des ausgewählten Songs
  const loadSong = (song) => {
    const newPlayer = createPlayer(song);
    setSelectedSong(song);
    if (player) {
      player.dispose(); // Alten Player entsorgen, um Speicherleck zu vermeiden
    }
    setPlayer(newPlayer);
    console.log("Load song", song);

    // Erstellen des PitchShift-Effekts und Verbinden mit dem Player
    const newPitchShift = new Tone.PitchShift().toDestination();
    newPlayer.connect(newPitchShift);
    setPitchShift(newPitchShift);
  };

  // Funktion zum Ändern der Geschwindigkeit
  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    if (player) {
      player.playbackRate = newSpeed;
    }
    startAudioContextIfNeeded(); // Starte den Audio-Kontext bei Benutzerinteraktion
  };

  // Funktion zum Ändern der Lautstärke
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (player) {
      player.volume.value = newVolume;
    }
    startAudioContextIfNeeded(); // Starte den Audio-Kontext bei Benutzerinteraktion
  };

  // Funktion zum Ändern der Tonhöhe
  const handlePitchChange = (e) => {
    const newPitch = parseFloat(e.target.value);
    setPitch(newPitch);
    if (pitchShift) {
      pitchShift.pitch = newPitch;
    }
    startAudioContextIfNeeded(); // Starte den Audio-Kontext bei Benutzerinteraktion
  };

  return (
      <div className="container">
        <h1>Welches Lied wird hier abgespielt?</h1>
        <div>
          <label htmlFor="speedSlider">Geschwindigkeit: </label>
          <input
              id="speedSlider"
              className="inputField"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={handleSpeedChange}
          />
        </div>
        <div>
          <label htmlFor="volumeSlider">Lautstärke: </label>
          <input
              id="volumeSlider"
              className="inputField"
              type="range"
              min="-12"
              max="12"
              step="1"
              value={volume}
              onChange={handleVolumeChange}
          />
        </div>
        <div>
          <label htmlFor="pitchSlider">Tonhöhe: </label>
          <input
              id="pitchSlider"
              className="inputField"
              type="range"
              min="-12"
              max="12"
              step="1"
              value={pitch}
              onChange={handlePitchChange}
          />
        </div>
        <div>
          <label htmlFor="songSelect">Lied auswählen: </label>
          <select
              id="songSelect"
              className="selectField"
              value={selectedSong}
              onChange={(e) => loadSong(e.target.value)}
          >
            <option value="">Auswählen</option>
            <option value="song1.mp3">Lied 1</option>
            <option value="song2.mp3">Lied 2</option>
            <option value="song3.mp3">Lied 3</option>
          </select>
        </div>
      </div>
  );
}

export default App;
