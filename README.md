# PIF: Carro controlado mediante Giroscopio 🧭
 
> Proyecto PIF para la asignatura de Arquitectura de Hardware (Politécnico Colombiano Jaime Isaza Cadavid - Ingeniería Informática - Semestre 5)

[![Giroscopio](https://developers.google.com/web/fundamentals/native-hardware/device-orientation/images/axes.png?hl=es "Giroscopio")](https://developers.google.com/web/fundamentals/native-hardware/device-orientation/images/axes.png?hl=es "Giroscopio")

### Validar si la API es soportada
```javascript
if (window.DeviceOrientationEvent) {
    SupportMessage.innerText = "🎉 Soportado 🎉"
    window.addEventListener('deviceorientation', deviceOrientationHandler, false);
} else {
    SupportMessage.innerText = "😭 No Soportado 😭"
}
```

### Valores:
| Variable  | Descripción  |
| :------------: | :------------: |
| Alpha **α**  | Z - Rotación  |
| Beta **β** | Y - Vertical  |
| Gamma **γ** |  X - Horizontal |

### Fuente - Documentación
[Movimiento y orientación del dispositivo](https://developers.google.com/web/fundamentals/native-hardware/device-orientation?hl=es#alpha "Movimiento y orientación del dispositivo")

------------

<h3 align="center"> 🚀 JUAN ESTEBAN GALVIS 😎 </h3>
<h5 align="center"> Frontend 💻 - UI Designer 🎨 - Estudiante de Ingeniería informática 🎓 - Full Stack en proceso 🧠 </h5>
<p align="center">
	🌲´https://linktr.ee/JuanGalvis 🌲
</p>

<p align="center"> <a href="https://twitter.com/JuanEGalvis"> <img src="https://img.icons8.com/fluent/48/000000/twitter.png" /> </a> <a href="https://www.linkedin.com/in/juanegalvis/"> <img src="https://img.icons8.com/color/48/000000/linkedin.png" /> </a> <a href="https://www.instagram.com/juanesgalvisb/"> <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" /> </a>
</p>