const mensajeEstado = document.querySelector('.estado-juego');
const celdas = document.querySelectorAll('.celda');
const botonReiniciar = document.querySelector('.reiniciar-btn');

const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let tableroEstado = Array(9).fill('');
let turnoActual = 'X';
let juegoActivo = true;

const mensajes = {
    turno: () => `Turno del jugador: ${turnoActual}`,
    gana: () => `¡El jugador ${turnoActual} gana!`,
    empate: '¡Es un empate!'
};

function inicializarJuego() {
    mensajeEstado.textContent = mensajes.turno();
    celdas.forEach((celda) => {
        celda.textContent = '';
        celda.addEventListener('click', manejarClickCelda);
    });
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function manejarClickCelda(evento) {
    const celda = evento.target;
    const indice = celda.getAttribute('data-index');

    if (tableroEstado[indice] !== '' || !juegoActivo) {
        return;
    }

    actualizarEstadoCelda(celda, indice);
    validarResultado();
}

function actualizarEstadoCelda(celda, indice) {
    tableroEstado[indice] = turnoActual;
    celda.textContent = turnoActual;
}

function validarResultado() {
    let rondaGanada = combinacionesGanadoras.some(combinacion => {
        const [a, b, c] = combinacion;
        return tableroEstado[a] === turnoActual &&
               tableroEstado[b] === turnoActual &&
               tableroEstado[c] === turnoActual;
    });

    if (rondaGanada) {
        mensajeEstado.textContent = mensajes.gana();
        juegoActivo = false;
        return;
    }

    if (!tableroEstado.includes('')) {
        mensajeEstado.textContent = mensajes.empate;
        juegoActivo = false;
        return;
    }

    cambiarTurno();
}

function cambiarTurno() {
    turnoActual = turnoActual === 'X' ? 'O' : 'X';
    mensajeEstado.textContent = mensajes.turno();
}

function reiniciarJuego() {
    tableroEstado = Array(9).fill('');
    turnoActual = 'X';
    juegoActivo = true;
    mensajeEstado.textContent = mensajes.turno();
    celdas.forEach(celda => (celda.textContent = ''));
}

inicializarJuego();
