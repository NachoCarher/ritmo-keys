import "./App.css";
import "./components/TargetText/TargetText.jsx";
import TargetText from "./components/TargetText/TargetText.jsx";
import Timer from "./components/Timer/Timer.jsx";
import { useState } from "react";

export default function App() {
  const [isWriting, setIsWriting] = useState(false);
  const [textFinished, setTextFinished] = useState(false);

  const handleIsWriting = () => {
    setIsWriting(true);
  }

  const handleTextFinished = () => {
    setTextFinished(true);
  }

  return (
    <div>
      <header className="app-header">
        <h1>ritmokeys</h1>
      </header>
      <main>
        <Timer startTimer={isWriting} stopTimer={textFinished}/>
        <TargetText onInputStarted={handleIsWriting} textFinished={handleTextFinished}/>
      </main>
    </div>
  )
}