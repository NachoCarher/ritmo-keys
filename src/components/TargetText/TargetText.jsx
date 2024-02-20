/* eslint-disable react/prop-types */
import mock from "../../mocks/text1.json";
import { useState } from "react";

export default function TargetText() {
    const palabraObjetivo = mock.exampleText;
    const [letrasIngresadas, setLetrasIngresadas] = useState([]);

    const manejarCambioInput = (event) => {
        const valorInput = event.target.value;
        const letras = valorInput.split('');
    
        const inputConEstilo = letras.map((letra, index) => {
          const letraObjetivo = palabraObjetivo[index];
          const esCorrecta = letra === letraObjetivo;
    
          return <span key={index} className={esCorrecta ? 'letra-correcta' : 'letra-incorrecta'}>{letra}</span>;
        });
    
        setLetrasIngresadas(inputConEstilo);
        //console.log(inputConEstilo);
      };

    // El input debe mantener el foco siempre
    const manejarBlurInput = (event) => {
        event.target.focus();
    }

    return (
        <div className="target-text-container">
            {/* <p>{palabraObjetivo}</p> */}
            <input type="text" className="target-text-input" autoFocus onChange={manejarCambioInput} onBlur={manejarBlurInput} />
            <p className="word">{letrasIngresadas}
              <span className="placeholder">{palabraObjetivo}</span>
            </p>
        </div>
        
    )
}