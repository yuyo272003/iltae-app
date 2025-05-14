import SpeechPhraseScreen from '../../../../../components/ReorderAndSpeak';

export default function EjemploFrase() {
  return (
    <SpeechPhraseScreen
      correctPhrase="El globo rojo es"
      words={["es", "rojo", "globo", "El"]}
      audioFile={require('@assets/audio/levels/nivel4/audioLeccion5.wav')}
      onSuccess={() => console.log("¡Frase correcta!")}
    />
  );
}
