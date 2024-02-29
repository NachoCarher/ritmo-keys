/* eslint-disable react/prop-types */
import mock from "../../mocks/text1.json";
import { useState, useEffect } from "react";
import TextoIngresado from '../TextoIngresado/TextoIngresado';



export default function TargetText({ onInputStarted, textFinished }) {
  //let textoObjetivo = "hola colega";
  const [textoIngresado, setTextoIngresado] = useState('');
  const palabrasIngresadas = textoIngresado.split(' ');
  const [textoObjetivo, setTexto] = useState("");

useEffect(() => {
  fetch('https://clientes.api.greenborn.com.ar/public-random-word?c=10')
  .then(response => response.json())
  .then(data => setTexto(data.toString()))
  .catch(error => console.log(error));

  // reemplazar comas por espacios de texto objetivo
  console.log(textoObjetivo);

}, []);

  const manejarCambioInput = (event) => {
    onInputStarted();
    setTextoIngresado(event.target.value);
  };

  const manejarBlurInput = (event) => {
    event.target.focus();
  }

  if (textoIngresado.length === textoObjetivo.length) {
    textFinished(); 
  }

  // sacar en otro componente las palabras correctas
  const palabrasCorrectas = palabrasIngresadas.filter((palabra, index) => {
    return palabra === textoObjetivo.split(',')[index];
  });

  return (
    <div className="target-text-container">
      <input type="text" spellCheck="false" className="target-text-input" autoFocus onChange={manejarCambioInput} onBlur={manejarBlurInput} />
      <p className="word">
        <TextoIngresado textoIngresado={textoIngresado} textoObjetivo={textoObjetivo} />
        <span className="placeholder">{textoObjetivo.slice(textoIngresado.length)}</span>
      </p>
      <p className="word-counter">{palabrasCorrectas.length} / {textoObjetivo.split(',').length} palabras correctas</p>
    </div>
  )
}