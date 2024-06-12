import React, {useState} from 'react';
import * as Tone from 'tone';
import './App.css';
import LevelSelection from './LevelSelection';
import VolumeSlider from './VolumeSlider';
import Grid from "./Grid";


function App() {
    const [volume, setVolume] = useState(-10);
    const [selectedLevel, setSelectedLevel] = useState({id: 'default', song: '', grid: []});
    const [player, setPlayer] = useState(null);
    const [audioContextStarted, setAudioContextStarted] = useState(false);
    const [pitchShift, setPitchShift] = useState(null);
    const [autoWah, setAutoWah] = useState(null);
    const [reverb, setReverb] = useState(null);
    const [lowpass, setLowpass] = useState(null);
    const [highpass, setHighpass] = useState(null);
    const [pingPong, setPingPong] = useState(null);

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

    const executeReverb = (percentCorrect) => {
        console.log(`reverb: ${percentCorrect}`);
        if (reverb) {
            reverb.wet.value = 1 - (percentCorrect / 100);
        }
    };

    const executeHighpass = (percentCorrect) => {
        console.log(`highpass: ${percentCorrect}`);
        if (highpass) {
            const minFrequency = 0;
            const maxFrequency = 300;
            const range = maxFrequency - minFrequency;
            console.log(`highpass_freq: ${maxFrequency - (percentCorrect / 100) * range}`);
            highpass.frequency.value = maxFrequency - (percentCorrect / 100) * range;
        }
    };

    const executeLowpass = (percentCorrect) => {
        console.log(`lowpass: ${percentCorrect}`);
        if (lowpass) {
            const minFrequency = 300;
            const maxFrequency = 22000;
            // Basiswert für die exponentielle Skalierung
            const exponent = 4;  // Höhere Werte machen die Kurve steiler
            // Skalierung des Prozentwerts auf eine exponentielle Skala
            const scaledPercent = Math.pow(percentCorrect / 100, exponent);
            // Berechnung der Frequenz
            const frequency = minFrequency + (maxFrequency - minFrequency) * scaledPercent;
            console.log(`lowpass_freq: ${frequency}`);
            lowpass.frequency.value = frequency;
        }
    };

    const executePingPong = (percentCorrect) => {
        console.log(`pingPong: ${percentCorrect}`);
        if (pingPong) {
            pingPong.wet.value = 1 - (percentCorrect / 100);
        }
    };

    // Erstelle ein Array von Funktionsreferenzen
    const functionsForSongManipulation = [executeSpeedChange, executePitchChange, executeAutoWah, executeReverb, executeLowpass, executeHighpass, executePingPong];

    // Funktion zum Ändern der Lautstärke
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (player) {
            player.volume.value = newVolume;
        }
        startAudioContextIfNeeded(); // Starte den Audio-Kontext bei Benutzerinteraktion
    };

    // Alte Component entsorgen, um Speicherleck zu vermeiden
    function disposeComponent(component) {
        if (component) {
            component.dispose();
        }
    }

    function loadSong(song) {
        const newPlayer = createPlayer(song);

        disposeComponent(player);
        disposeComponent(pitchShift);
        disposeComponent(autoWah);
        disposeComponent(reverb);
        disposeComponent(highpass);
        disposeComponent(lowpass);
        disposeComponent(pingPong);

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
            frequency: 220000,
            rolloff: -96,
            Q: 7
        })
        setLowpass(newLowpass)

        // Erstellen des Highpass-Effekts 
        const newHighpass = new Tone.Filter({
            type: 'highpass',
            frequency: 0,
            rolloff: -96,
            Q: 7
        })
        setHighpass(newHighpass)

        // Erstellen des Reverb-Effekts 
        const newReverb = new Tone.Reverb({
            decay: 10,
            wet: 0
        })
        setReverb(newReverb);

        // Erstellen des PingPong Delays
        const newPingPong = new Tone.PingPongDelay({
            delayTime: 0.25,
            feedback: 0.5,
            wet: 0
        })
        setPingPong(newPingPong);


        // Verbinden mit dem Player
        newPlayer.chain(newPitchShift, newAutoWah, newReverb, newLowpass, newHighpass, newPingPong, Tone.Destination);
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
                if (functionsForSongManipulation.length > index) {
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
