/* eslint-disable react/prop-types */
//import mock from "../../mocks/text1.json";
import { useState, useEffect } from "react";
import TextoIngresado from '../TextoIngresado/TextoIngresado';
import {useHttp} from '../../hooks/useHttp';

export default function TargetText({ onInputStarted, textFinished, correctWords, totalWords}) {
  const [textoIngresado, setTextoIngresado] = useState('');
  const palabrasIngresadas = textoIngresado.split(' ');
  const [textoObjetivo, setTexto] = useState("");
  const { data, isLoading, error } = useHttp({ url: 'https://clientes.api.greenborn.com.ar/public-random-word?c=10' });

  useEffect(() => {
    if (data) {
      setTexto(removeCommas(data.toString()));
    }
  }, [data]);

  function removeCommas(texto) {
    return texto.replace(/,/g, ' ');
  }

  const manejarCambioInput = (event) => {
    onInputStarted();
    setTextoIngresado(event.target.value);
  };

  const manejarBlurInput = (event) => {
    event.target.focus();
  }

  // sacar en otro componente las palabras correctas
  const palabrasCorrectas = palabrasIngresadas.filter((palabra, index) => {
    return palabra === textoObjetivo.split(' ')[index];
  });

  useEffect(() => {
    if ((textoObjetivo !== "") && (textoIngresado.length === textoObjetivo.length)) {
      textFinished(true);
      correctWords(palabrasCorrectas.length);
      totalWords(textoObjetivo.split(' ').length);
    }
  }, [textoIngresado, textoObjetivo]);

  return (
    <div className="target-text-container">
      <input type="text" spellCheck="false" className="target-text-input" autoFocus onChange={manejarCambioInput} onBlur={manejarBlurInput} />
      <p className="word">
        <TextoIngresado textoIngresado={textoIngresado} textoObjetivo={textoObjetivo} />
        <span className="placeholder">
          { isLoading && "Cargando..." }
          { error && "Error al cargar el texto" }
          { data && textoObjetivo.slice(textoIngresado.length) }
          </span>
      </p>
      <p className="word-counter">{palabrasCorrectas.length} / {textoObjetivo.split(' ').length} palabras correctas</p>
    </div>
  )
}