import './App.css';
import {useState, useEffect} from 'react'

function App() {

  const URL = 'http://192.168.1.99';
  
  const [Beta, setBeta] = useState(0);
  const [Gamma, setGamma] = useState(0);
  
  const [Actual, setActual] = useState("detener");
  const [Response, setResponse] = useState("");
  
  const [Timer, setTimer] = useState(0)
  const [Estado, setEstado] = useState(false)
  const [Movimientos, setMovimientos] = useState("")

  useEffect(() => {

    const deviceOrientationHandler = ( value ) => {

      setBeta(`Y - Vertical: ${parseInt(value.beta)}`);
      setGamma(`X - Horizontal: ${parseInt(value.gamma)}`);

      const Instruccion = DetectarInstruccion(parseInt(value.beta), parseInt(value.gamma));

      if (Actual !== Instruccion) {
        setActual(Instruccion)
        if (Estado) {
          setMovimientos(`${Movimientos+' '+Actual}`)
        }
        EjecutarInstruccion(Instruccion)
      }
      
    }

    window.addEventListener('deviceorientation', deviceOrientationHandler);

    return () => {
      window.removeEventListener('deviceorientation', deviceOrientationHandler)
  }

  }, [Actual])

  function DetectarInstruccion(Vertical, Horizontal) {

    if (Vertical > 20) {
      return "retroceder"
    } else if (Vertical < -20) {
      return "avanzar"
    }

    if (Horizontal > 20) {
      return "derecha"
    } else if (Horizontal < -20) {
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

  function StartTimer() {
    let seconds = 0;
    setEstado(true)
    setInterval(() => {
      setTimer(seconds++)
    }, 1000);
  }

  function SaveTimer() {
    const ObjectForMongoDB = {
      fecha: new Date().toString(),
      tiempo: `${Timer} segundos`,
      movimientos: Movimientos.split(' ')
    }
  
    fetch('https://intelligent-livre-42440.herokuapp.com/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ObjectForMongoDB)
    }).then((response) => { console.log("Guardado con Exito!"); return response.json()  }).then((data) => { alert(data.message); window.location.reload() })
      
    
  }

  return (
    <div className="App">
      <h1> 🕹 Control <span>ESP32</span> mediante <span>Giroscopio</span> 🚗 </h1>
      <h2>
          { window.DeviceOrientationEvent ? "🎉 Soportado 🎉" : "😭 No Soportado 😭" }
      </h2>
      <img className={`Carro ${Actual}`} src="https://pngimage.net/wp-content/uploads/2018/05/carro-vista-superior-png-2.png" alt="Carro visto desde arriba para simular el comportamiento del carro real"/>
      <p id="Beta"> Beta: {Beta ? Beta : 0}</p>
      <p id="Gamma"> Gamma: {Gamma ? Gamma : 0}</p>
      <h3> Instrucción Actual: <span> { Actual[0].toUpperCase() + Actual.substr(1) } </span> </h3>
      { <h3> Tiempo manejando: { Timer > 1 ? Timer+' segundos' : Timer+' segundo' } </h3> }
      <h3> Response ESP32: { JSON.stringify(Response) } </h3>
      <div className="BtnTimmers">
        <button onClick={StartTimer}> 🏁 Iniciar recorrido  </button>
        { Estado && <button onClick={SaveTimer}> 💾 Guardar Recorrido </button> }
      </div>
    </div>
  );
}

export default App;
