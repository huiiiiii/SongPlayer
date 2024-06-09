import React, {useState} from 'react';
import * as Tone from 'tone';
import './App.css';
import LevelSelection from './LevelSelection';
import VolumeSlider from './VolumeSlider';
import Grid from "./Grid";

function App() {
    const [volume, setVolume] = useState(0);
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
            url: audioFile, onload: () => {
                console.log('Buffer loaded');
                startAudioContextIfNeeded(); // Starte den Audio-Kontext, wenn der Buffer geladen ist
                newPlayer.start();
            },
        }).toDestination();
        return newPlayer;
    };

    // Funktion zum Ändern der Geschwindigkeit zwischen 0 und 1
    const executeSpeedChange = (percentCorrect, myPlayer, myPitchShift) => {
        myPlayer.playbackRate = percentCorrect / 100;
    };
    // Funktion zum Ändern der Tonhöhe zwischen 0 und 20
    const executePitchChange = (percentCorrect, myPlayer, myPitchShift) => {
        myPitchShift.pitch = 20 - (percentCorrect / 5);
    };
    // ToDo weiter Funktion, die den Song verändert
    const executeFunction2 = (percentCorrect, myPlayer, myPitchShift) => {
        console.log(`Function 2: ${percentCorrect}`);
    };
    // ToDo weiter Funktion, die den Song verändert
    const executeFunction3 = (percentCorrect, myPlayer, myPitchShift) => {
        console.log(`Function 3: ${percentCorrect}`);
    };
    // ToDo weiter Funktion, die den Song verändert
    const executeFunction4 = (percentCorrect, myPlayer, myPitchShift) => {
        console.log(`Function 4: ${percentCorrect}`);
    };
    // ToDo weiter Funktion, die den Song verändert
    const executeFunction5 = (percentCorrect, myPlayer, myPitchShift) => {
        console.log(`Function 5: ${percentCorrect}`);
    };
    // ToDo weiter Funktion, die den Song verändert
    const executeFunction6 = (percentCorrect, myPlayer, myPitchShift) => {
        console.log(`Function 6: ${percentCorrect}`);
    };

    // Erstelle ein Array von Funktionsreferenzen
    const functionsForSongManipulation = [executeSpeedChange, executePitchChange, executeFunction2, executeFunction3, executeFunction4, executeFunction5, executeFunction6];

    // Funktion zum Ändern der Lautstärke
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (player) {
            player.volume.value = newVolume;
        }
        startAudioContextIfNeeded(); // Starte den Audio-Kontext bei Benutzerinteraktion
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

        startAudioContextIfNeeded(); // Starte den Audio-Kontext bei Benutzerinteraktion

        // Funktionen zum Song anpassen ausführen ToDo 100 durch Prozent-Wert der Spalte ersetzen
        functionsForSongManipulation.forEach((func) => func(100, newPlayer, newPitchShift));
    };

    return (<div className="container">
        <h1>Welches Lied wird hier abgespielt?</h1>
        <Grid/>
        <LevelSelection selectedSong={selectedSong} loadSong={loadSong}/>
        <VolumeSlider volume={volume} handleVolumeChange={handleVolumeChange}/>
    </div>);
}

export default App;
