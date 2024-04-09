import { useEffect } from 'react';
import Tts from 'react-native-tts';

Tts.addEventListener('tts-start', (event) => console.log("start", event));
Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));

export const TextToSpeechPlay = (text:string) => {
    TextToSpeechConfiqure()
    Tts.speak(text);
}

const TextToSpeechConfiqure = () => {
    Tts.setDefaultVoice('com.apple.voice.compact.hi-IN.Lekha');
    Tts.setDefaultRate(0.35);
}

export const TextToSpeechVoiceList = () => {
    return new Promise((resolve, reject) => {
        Tts.voices().then(voices => resolve(voices)).catch(error => reject(error));
    });
}