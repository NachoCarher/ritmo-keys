import "./App.css";
import "./components/TargetText/TargetText.jsx";
import TargetText from "./components/TargetText/TargetText.jsx";
import Timer from "./components/Timer/Timer.jsx";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function App() {
  const [isWriting, setIsWriting] = useState(false);
  const [textFinished, setTextFinished] = useState(false);
  const [time, setTime] = useState("00:00:00");
  const [aciertos, setAciertos] = useState(0);
  const [totales, setTotales] = useState(0);

  const handleIsWriting = () => {
    setIsWriting(true);
  }

  const converTimeToSeconds = (time) => {
    const tiempo = time.split(':');
    const minutos = parseInt(tiempo[0]) * 60;
    const segundos = parseInt(tiempo[1]);
    const milisegundos = parseInt(tiempo[2]) / 100;
    return minutos + segundos + milisegundos;
  }

  useEffect(() => {
    const tiempoTotal = converTimeToSeconds(time);
    if (textFinished && tiempoTotal > 0) {
      confetti();
      const precision = (aciertos / totales) * 100;

      const data = {
        palabras_acertadas: aciertos,
        palabras_totales: totales,
        tiempo_segundos: tiempoTotal,
        precision_porcentaje: precision
      }

      fetch('https://back-ritmo-keys-dev-fskx.1.ie-1.fl0.io/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
    }
  }, [textFinished, time]);

  return (
    <div>
      <header className="app-header">
        <h1>ritmokeys</h1>
      </header>
      <main>
        <Timer startTimer={isWriting} stopTimer={textFinished} timeEnded={setTime}/>
        <TargetText onInputStarted={handleIsWriting} textFinished={setTextFinished} correctWords={setAciertos} totalWords={setTotales}/>
      </main>
    </div>
  )
}