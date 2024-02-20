/* eslint-disable react/prop-types */
import mock from "../../mocks/text1.json";
import { useState } from "react";

export default function TargetText() {
    const textoObjetivo = mock.exampleText;
    const [letrasIngresadas, setLetrasIngresadas] = useState([]);
    const [textoPlaceholder, setTextoPlaceholder] = useState(textoObjetivo);

    const manejarCambioInput = (event) => {
        const valorInput = event.target.value;
        const letras = valorInput.split('');
    
        const inputConEstilo = letras.map((letra, index) => {
          const letraObjetivo = textoObjetivo[index];
          const esCorrecta = letra === letraObjetivo;
    
          return <span key={index} className={esCorrecta ? 'letra-correcta' : 'letra-incorrecta'}>{letra}</span>;
        });
    
        setLetrasIngresadas(inputConEstilo);
        setTextoPlaceholder(textoObjetivo.slice(letras.length));
      };

    // El input debe mantener el foco siempre
    const manejarBlurInput = (event) => {
        event.target.focus();
    }

    return (
        <div className="target-text-container">
            <input type="text" spellCheck="false" className="target-text-input" autoFocus onChange={manejarCambioInput} onBlur={manejarBlurInput} />
            <p className="word">{letrasIngresadas}
              <span className="placeholder">{textoPlaceholder}</span>
            </p>
        </div>
        
    )
}