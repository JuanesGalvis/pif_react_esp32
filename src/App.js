import './App.css';
import {useState, useEffect} from 'react'

function App() {

  const URL = 'http://192.168.1.99';

  const [Beta, setBeta] = useState(0);
  const [Gamma, setGamma] = useState(0);
  const [Actual, setActual] = useState("detener");
  const [Response, setResponse] = useState("");

  useEffect(() => {

    const deviceOrientationHandler = ( value ) => {

      setBeta(`Y - Vertical: ${parseInt(value.beta)}`);
      setGamma(`X - Horizontal: ${parseInt(value.gamma)}`);

      const Instruccion = DetectarInstruccion(parseInt(value.beta), parseInt(value.gamma));

      if (Actual !== Instruccion) {
        setActual(Instruccion)
        EjecutarInstruccion(Instruccion)
      }
      
    }

    window.addEventListener('deviceorientation', deviceOrientationHandler);

    return () => {
      window.removeEventListener('deviceorientation', deviceOrientationHandler)
  }

  }, [Actual])

  function DetectarInstruccion(Vertical, Horizontal) {

    if (Vertical > 10) {
      return "retroceder"
    } else if (Vertical < -10) {
      return "avanzar"
    }

    if (Horizontal > 10) {
      return "derecha"
    } else if (Horizontal < -10) {
      return "izquierda"
    }

    return "detener"
  }

  function EjecutarInstruccion( instr ) {
    fetch(`${URL}/${instr}`)
    .then(result => result.json())
    .then(data => setResponse(data))
    .catch((err) => {
        console.log(err);
    })
  }

  return (
    <div className="App">
      <h1> 🕹 Control carro mediante Giroscopio 🚗 </h1>
      <h2>
          { window.DeviceOrientationEvent ? "🎉 Soportado 🎉" : "😭 No Soportado 😭" }
      </h2>
      <img src="https://developers.google.com/web/fundamentals/native-hardware/device-orientation/images/axes.png?hl=es" alt="Angulos Celular"/>
      <p id="Beta"> Beta: {Beta ? Beta : 0}</p>
      <p id="Gamma"> Gamma: {Gamma ? Gamma : 0}</p>
      <h3> Instrucción Actual: { Actual } </h3>
      <h3> Response ESP32: { JSON.stringify(Response) } </h3>
    </div>
  );
}

export default App;
