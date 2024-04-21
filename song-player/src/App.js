import React, { useState } from 'react';
import * as Tone from 'tone';
import './App.css';
import Slider from './Slider';
import SongSelection from './SongSelection';
import VolumeSlider from './VolumeSlider';

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
            console.log('AudioContext started');
        }
    };

    // Erstellen des Audio-Players
    const createPlayer = (song) => {
        const audioFile = process.env.PUBLIC_URL + '/songs/' + song;
        const newPlayer = new Tone.Player({
            url: audioFile,
            onload: () => {
                console.log('Buffer loaded');
                startAudioContextIfNeeded(); // Starte den Audio-Kontext, wenn der Buffer geladen ist
                newPlayer.start();
            },
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
        console.log('Load song', song);

        // Erstellen des PitchShift-Effekts und Verbinden mit dem Player
        const newPitchShift = new Tone.PitchShift().toDestination();
        newPlayer.connect(newPitchShift);
        setPitchShift(newPitchShift);

        // Geschwindigkeit und Tonhöhe zufällig setzen
        const randomSpeed = Math.random() * (2 - 0.5) + 0.5; // Zufällige Geschwindigkeit zwischen 0.5 und 2
        const randomPitch = Math.floor(Math.random() * (24 + 1)) - 12; // Zufällige Tonhöhe zwischen -12 und 12
        setSpeed(randomSpeed);
        setPitch(randomPitch);

        // Geschwindigkeit und Tonhöhe des neuen Players setzen
        newPlayer.playbackRate = randomSpeed;
        newPitchShift.pitch = randomPitch;
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
            <Slider label="Geschwindigkeit" value={speed} onChange={handleSpeedChange} min={0.5} max={2} step={0.1} />
            <Slider label="Tonhöhe" value={pitch} onChange={handlePitchChange} min={-12} max={12} step={1} />
            <VolumeSlider volume={volume} handleVolumeChange={handleVolumeChange} />
            <SongSelection selectedSong={selectedSong} loadSong={loadSong} />
        </div>
    );
}

export default App;
