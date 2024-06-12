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
    const [bandpass, setBandpass] = useState(null);
    const [eq3, setEQ3] = useState(null);
    const [lowpass, setLowpass] = useState(null);
    const [highpass, setHighpass] = useState(null);

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

    const executeAutoWah = (percentCorrect) => {
        console.log(`autoWah: ${percentCorrect}`);
        if (autoWah) {
            autoWah.wet.value = 1 - (percentCorrect / 100);
        }
    };

    const executeEQLow = (percentCorrect) => {
        console.log(`eqLow: ${percentCorrect}`);
        if (eq3) {
            const maxReduction = -50;
            eq3.low.value = maxReduction * (1 - (percentCorrect / 100));
        }
    };

    const executeEQMid = (percentCorrect) => {
        console.log(`eqMid: ${percentCorrect}`);
        if (eq3) {
            const maxReduction = -50;
            eq3.mid.value = maxReduction * (1 - (percentCorrect / 100));
        }
    };

    const executeEQHigh = (percentCorrect) => {
        console.log(`eqHigh: ${percentCorrect}`);
        if (eq3) {
            const maxReduction = -50;
            eq3.high.value = maxReduction * (1 - (percentCorrect / 100));
        }
    };

    const executeReverb = (percentCorrect) => {
        console.log(`reverb: ${percentCorrect}`);
        if (reverb) {
            reverb.wet.value = 1 - (percentCorrect / 100);
        }
    };

    const executeBandpass = (percentCorrect) => {
        console.log(`bandpass: ${percentCorrect}`);
        if (bandpass) {
            const minQ = 0;
            const maxQ = 7;
            const range = maxQ - minQ;
            pitchShift.pitch = maxQ - (percentCorrect / 100) * range;
        }
    };
    
    const executeHighpass = (percentCorrect) => {
        console.log(`highpass: ${percentCorrect}`);
        if (highpass) {
            const minFrequency = 0;
            const maxFrequency = 10000;
            const range = maxFrequency - minFrequency;
            highpass.frequency.value = maxFrequency - (percentCorrect / 100) * range;
        }
    };

    const executeLowpass = (percentCorrect) => {
        console.log(`lowpass: ${percentCorrect}`);
        if (lowpass) {
            const minFrequency = 10000;
            const maxFrequency = 20000;
            const range = maxFrequency - minFrequency;
            lowpass.frequency.value = minFrequency + (percentCorrect / 100) * range;
        }
    };

    // Erstelle ein Array von Funktionsreferenzen
    const functionsForSongManipulation = [executeSpeedChange, executePitchChange, executeAutoWah, executeLowpass, executeHighpass, executeReverb, executeReverb];

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
        if (eq3) {
            eq3.dispose();// Alten bandpass entsorgen, um Speicherleck zu vermeiden
        }
        if (bandpass) {
            bandpass.dispose();// Alten bandpass entsorgen, um Speicherleck zu vermeiden
        }
        if (bandpass) {
            bandpass.dispose();// Alten bandpass entsorgen, um Speicherleck zu vermeiden
        }
        if (bandpass) {
            bandpass.dispose();// Alten bandpass entsorgen, um Speicherleck zu vermeiden
        }


        setPlayer(newPlayer);

        // Erstellen des PitchShift-Effekts
        const newPitchShift = new Tone.PitchShift();
        setPitchShift(newPitchShift);

        // Erstellen des AutoWah-Effekts
        const newAutoWah = new Tone.AutoWah({
            baseFrequency: 5,
            octaves: 12,
            sensitivity: -40,
            wet: 0,
        })
        setAutoWah(newAutoWah);

        // Erstellen des Lowpass-Effekts 
        const newLowpass = new Tone.Filter({
            type: 'lowpass',
            frequency: 20000,
            rolloff: -96
        })
        setLowpass(newLowpass)

        // Erstellen des Highpass-Effekts 
        const newHighpass = new Tone.Filter({
            type: 'highpass',
            frequency: 0,
            rolloff: -96
        })
        setHighpass(newHighpass)

        // Erstellen des EQ-Effekts 
        const newEQ = new Tone.EQ3({
            low: 0,
            mid: 0,
            high: 0,
            Q: 1000
        })
        setEQ3(newEQ)

        // Erstellen des Bandpass-Effekts 
        const newBandpass = new Tone.Filter({
            type: 'bandpass',
            frequency: 10000,
            Q: 0
        })
        setBandpass(newBandpass)


        // Erstellen des Reverb-Effekts 
        const newReverb = new Tone.Reverb({
            decay: 20,
            wet: 0
        })
        setReverb(newReverb);


        // Verbinden mit dem Player
        newPlayer.chain(newPitchShift, newAutoWah, newReverb, newLowpass, newHighpass, Tone.Destination);
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
                    if (index === 3 || index === 4) {
                        functionsForSongManipulation[index](rowPercent);
                    } else {
                        functionsForSongManipulation[index](100);
                    }
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
