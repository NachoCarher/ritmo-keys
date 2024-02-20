import "./App.css";
import "./components/TargetText/TargetText.jsx";
import TargetText from "./components/TargetText/TargetText.jsx";

export default function App() {
  return (
    <div>
      <header className="app-header">
        <h1>ritmokeys</h1>
      </header>
      <main>
        <TargetText />
      </main>
    </div>
  )
}