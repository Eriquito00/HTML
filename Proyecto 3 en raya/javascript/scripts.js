//el juego empieza con X
let jugadorActual = "X";
//el juego no esta terminado
let juegoTerminado = false;
//coje los estilos de cuadrado en el CSS que son descendientes de cuadricula
let cuadricula = document.querySelectorAll(".cuadricula > .cuadrado");
//dice la info de quien es el turno
let info = document.getElementById("info");
//dice que el boton de volver a jugar sea interactivo
let boton = document.getElementById("boton");
//funcion que dice que empezara x y despues o, asi continuamente
function cambiarJugador() {
  jugadorActual = jugadorActual === "X" ? "O" : "X";
//dice de quien es el turno de los 2 jugadores
  info.innerHTML = `Es el turno del jugador ${jugadorActual}`;
}
//funcion que dice todos los tipos de coincidencias que tienen que haber para ganar
function verificarGanador() {
  const combinacionesGanadoras = [
//de derecha a izquierda
    [0, 1, 2],[3, 4, 5],[6, 7, 8],
//de arriba a abajo
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
//en diagonales
    [0, 4, 8],[2, 4, 6]
  ];
//tienen que haver 3 simbolos iguales en las posiciones de combinacionesGanadoras para ganar 
  for (let combinacion of combinacionesGanadoras) {
    let [a, b, c] = combinacion;
    if (
      cuadricula[a].innerHTML === jugadorActual &&
      cuadricula[b].innerHTML === jugadorActual &&
      cuadricula[c].innerHTML === jugadorActual
    ) {
//en caso de que eso pase tienen que iluminarse de color verde los cuadrados por los que se ha ganado
      juegoTerminado = true;
      info.innerHTML = `El jugador ${jugadorActual} ha ganado!`;
      cuadricula[a].style.backgroundColor = "lightgreen";
      cuadricula[b].style.backgroundColor = "lightgreen";
      cuadricula[c].style.backgroundColor = "lightgreen";
      return;
    }
  }
//la variable juegoTerminado se haya activado y no haya ninguna combinacion de combinacionesGanadoras el juego quedara empate
  if (Array.from(cuadricula).every((cuadrado) => cuadrado.innerHTML !== "")) {
    juegoTerminado = true;
    info.innerHTML = "El juego ha terminado en empate";
  }
}
//mira si el cuadrado esta vacio y el juego no ha terminado
function manejarClic(event) {
  let cuadrado = event.target;
  if (cuadrado.innerHTML !== "" || juegoTerminado) {
    return;
  }
//se verifica si el juego ha terminado y si no ha terminado cambia de jugador
  cuadrado.innerHTML = jugadorActual;
  verificarGanador();
  if (!juegoTerminado) {
    cambiarJugador();
  }
}
//si algun cuadrado ha sido clickado se ejecutara la funcion manejarClic
cuadricula.forEach((cuadrado) => {
  cuadrado.addEventListener("click", manejarClic);
});
//cambiar el turno de jugador
info.innerHTML = `Es el turno del jugador ${jugadorActual}`;
//boton para reiniciar el juego
let botonReinicio = document.getElementById("boton-reinicio");
//al hacer click que se ejecute el reiniciarJuego
botonReinicio.addEventListener("click", reiniciarJuego);
//funcion de reiniciar el juego
function reiniciarJuego() {
  cuadricula.forEach((cuadrado) => (cuadrado.innerHTML = ""));
//repite la funcion para que empiece X si ha ganado O, o puede que repita la funcion para que empiece O si ha ganado X
  if ( juegoTerminado === true && jugadorActual === "X" ){
      jugadorActual = "O";
  }else {
      jugadorActual = "X";
  }
//hacer que la funcion juegoTerminado sea falso 
  juegoTerminado = false;
//para poder jugar otra vez y vuelve a seleccionar el jugador que juega
  info.innerHTML = `Es el turno del jugador ${jugadorActual}`;
//reinicia el color de fondo de los cuadrados donde se ponen los simbolos
  cuadricula.forEach((cuadrado) => (cuadrado.style.backgroundColor = ""));
}
//miriadax
//desarrollo frontend con html, css y javascript