import React, {useState} from 'react';
import * as Tone from 'tone';
import './App.css';
import LevelSelection from './LevelSelection';
import VolumeSlider from './VolumeSlider';
import Grid from "./Grid";


function App() {
    const [volume, setVolume] = useState(0);
    const [selectedLevel, setSelectedLevel] = useState({id: 'default', song: '', grid: []});
    const [player, setPlayer] = useState(null);
    const [audioContextStarted, setAudioContextStarted] = useState(false);
    const [pitchShift, setPitchShift] = useState(null);
    const [autoWah, setAutoWah] = useState(null);
    const [reverb, setReverb] = useState(null);

    // Starte den Audio-Kontext, falls nicht bereits gestartet
    const startAudioContextIfNeeded = () => {
        if (!audioContextStarted) {
            Tone.start();
            setAudioContextStarted(true);
        }
    };

    // Erstellen des Audio-Players
    const createPlayer = (song) => {
        const audioFile = process.env.PUBLIC_URL + '/songs/' + song;
        const newPlayer = new Tone.Player({
            url: audioFile, 
            loop: true,
            onload: () => {
                startAudioContextIfNeeded(); // Starte den Audio-Kontext, wenn der Buffer geladen ist
                newPlayer.start();
            },
        }).toDestination();
        return newPlayer;
    };

    // Funktion zum Ändern der Geschwindigkeit zwischen 0.2 und 1
    const executeSpeedChange = (percentCorrect) => {
        console.log(`speedChange: ${percentCorrect}`);
        if (player) {
            const minSpeed = 0.2;
            const maxSpeed = 1.0;
            const range = maxSpeed - minSpeed;
            player.playbackRate = minSpeed + (percentCorrect / 100) * range;
        }
    };
    // Funktion zum Ändern der Tonhöhe zwischen 0 und 20
    const executePitchChange = (percentCorrect) => {
        console.log(`pitchChange: ${percentCorrect}`);
        if (pitchShift) {
            const minPitch = 0;
            const maxPitch = 20;
            const range = maxPitch - minPitch;
            pitchShift.pitch = maxPitch - (percentCorrect / 100) * range;
        }
    };
    // ToDo weitere Funktion, die den Song verändert
    const executeAutoWah = (percentCorrect) => {
        console.log(`autoWah: ${percentCorrect}`);
        if (autoWah) {
            autoWah.wet.value = (percentCorrect / 100);
        }
    };
    // ToDo weitere Funktion, die den Song verändert
    const executeFunction3 = (percentCorrect) => {
        console.log(`Function 3: ${percentCorrect}`);
    };
    // ToDo weitere Funktion, die den Song verändert
    const executeFunction4 = (percentCorrect) => {
        console.log(`Function 4: ${percentCorrect}`);
    };
    // ToDo weitere Funktion, die den Song verändert
    const executeFunction5 = (percentCorrect) => {
        console.log(`Function 5: ${percentCorrect}`);
    };
    // ToDo weitere Funktion, die den Song verändert
    const executeReverb = (percentCorrect) => {
        console.log(`reverb: ${percentCorrect}`);
        if (reverb) {
            reverb.wet.value = 1 - (percentCorrect / 100);
        }
    };

    // Erstelle ein Array von Funktionsreferenzen
    const functionsForSongManipulation = [executeSpeedChange, executePitchChange, executeAutoWah, executeFunction3, executeFunction4, executeFunction5, executeReverb];

    // Funktion zum Ändern der Lautstärke
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (player) {
            player.volume.value = newVolume;
        }
        startAudioContextIfNeeded(); // Starte den Audio-Kontext bei Benutzerinteraktion
    };

    function loadSong(song) {
        const newPlayer = createPlayer(song);
        if (player) {
            player.dispose(); // Alten Player entsorgen, um Speicherleck zu vermeiden
        }
        if (pitchShift) {
            pitchShift.dispose();// Alten Pitch Shift entsorgen, um Speicherleck zu vermeiden
        }
        if (autoWah) {
            autoWah.dispose();// Alten AutoWah entsorgen, um Speicherleck zu vermeiden
        }
        if (reverb) {
            reverb.dispose();// Alten Reverb entsorgen, um Speicherleck zu vermeiden
        }

        setPlayer(newPlayer);

        // Erstellen des PitchShift-Effekts und Verbinden mit dem Player
        const newPitchShift = new Tone.PitchShift();
        setPitchShift(newPitchShift);

        // Erstellen des AutoWah-Effekts und Verbinden mit dem Player
        const newAutoWah = new Tone.AutoWah({
            baseFrequency: 5,
            octaves: 12,
            sensitivity: -40
        })
        setAutoWah(newAutoWah);

        // Erstellen des AutoWah-Effekts und Verbinden mit dem Player
        const newReverb = new Tone.Reverb({
            decay: 20,
        })
        setReverb(newReverb);

        newPlayer.chain(newPitchShift, newAutoWah, newReverb, Tone.Destination);
        startAudioContextIfNeeded(); // Starte den Audio-Kontext bei Benutzerinteraktion
    }

    // Laden des ausgewählten Songs
    const loadLevel = (level) => {
        setSelectedLevel(level);

        const song = level.song;
        loadSong(song)
    };

    // Funktionen zum Song anpassen ausführen
    const changeSolvedTilesInRow = (solvedTilesInRow) => {
        solvedTilesInRow.forEach((rowPercent, index) => {
                if (functionsForSongManipulation.length >= index) {
                    functionsForSongManipulation[index](rowPercent);
                }
            }
        )
    };

    return (<div className="container">
        <h1>Welches Lied wird hier abgespielt?</h1>
        <Grid selectedGrid={selectedLevel.grid} changeSolvedTilesInRow={changeSolvedTilesInRow}/>
        <LevelSelection selectedLevel={selectedLevel} loadLevel={loadLevel}/>
        <VolumeSlider volume={volume} handleVolumeChange={handleVolumeChange}/>
    </div>);
}

export default App;
