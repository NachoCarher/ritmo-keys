// eslint-disable-next-line react/prop-types
function Letra({ letra, esCorrecta }) {
    return <span className={esCorrecta ? 'letra-correcta' : 'letra-incorrecta'}>{letra}</span>;
}

export default function TextoIngresado({ textoIngresado, textoObjetivo }) {
    const letras = textoIngresado.split('');
    return letras.map((letra, index) => {
        const letraObjetivo = textoObjetivo[index];
        const esCorrecta = letra === letraObjetivo;
        return <Letra key={index} letra={letra} esCorrecta={esCorrecta} />
    });
}