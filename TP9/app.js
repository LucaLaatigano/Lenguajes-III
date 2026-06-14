let juegoSeleccionado = "";

function seleccionarJuego(elemento, nombre) {
    document.querySelectorAll('.tarjeta').forEach(t => t.classList.remove('seleccionado'));
    elemento.classList.add('seleccionado');
    juegoSeleccionado = nombre;
}

function validarNickname() {
    const valor = document.getElementById('nickname').value;
    const error = document.getElementById('errorNickname');
    if (!/^[a-zA-Z0-9]+$/.test(valor)) {
        error.innerHTML = 'Solo letras y números, sin espacios ni símbolos.';
        return false;
    }
    if (valor.length < 3) {
        error.innerHTML = 'Debe tener al menos 3 caracteres.';
        return false;
    }
    error.innerHTML = '';
    return true;
}

function validarEdad() {
    const valor = document.getElementById('edad').value;
    const error = document.getElementById('errorEdad');
    if (valor.trim() === '' || isNaN(valor)) {
        error.innerHTML = 'Ingresá una edad válida (solo números).';
        return false;
    }
    if (Number(valor) <= 16) {
        error.innerHTML = 'Tenés que ser mayor de 16 años.';
        return false;
    }
    error.innerHTML = '';
    return true;
}

function validarCodigo() {
    const valor = document.getElementById('codigo').value;
    const error = document.getElementById('errorCodigo');
    if (valor.trim() === '' || isNaN(valor)) {
        error.innerHTML = 'Solo números.';
        return false;
    }
    if (valor.length !== 4) {
        error.innerHTML = 'Debe tener exactamente 4 dígitos.';
        return false;
    }
    error.innerHTML = '';
    return true;
}

function validarJuego() {
    const error = document.getElementById('errorJuego');
    if (juegoSeleccionado === '') {
        error.innerHTML = 'Seleccioná un juego de la grilla.';
        return false;
    }
    error.innerHTML = '';
    return true;
}

function registrar() {
    const okNick = validarNickname();
    const okEdad = validarEdad();
    const okCodigo = validarCodigo();
    const okJuego = validarJuego();
    const mensaje = document.getElementById('mensajeRegistro');
    if (okNick && okEdad && okCodigo && okJuego) {
        mensaje.innerHTML = '✓ Registro exitoso. ¡A competir en ' + juegoSeleccionado + '!';
        document.getElementById('seccionPreparacion').hidden = false;
    } else {
        mensaje.innerHTML = '';
        document.getElementById('seccionPreparacion').hidden = true;
    }
}

function preparacion() {
    const horas = prompt('¿Cuántas horas por semana dedicás a jugar?');
    const modalidad = prompt('¿Preferís jugar solo o en equipo?');
    const rol = prompt('¿Qué rol ocupás en tu equipo? (Atacante, Defensa, Soporte, etc.)');
    const r = document.getElementById('respuestas');
    r.innerHTML =
        '<p>Horas de juego por semana: <strong>' + (horas === null ? 'No respondió esta pregunta' : horas) + '</strong></p>' +
        '<p>Modalidad preferida: <strong>' + (modalidad === null ? 'No respondió esta pregunta' : modalidad) + '</strong></p>' +
        '<p>Rol en el equipo: <strong>' + (rol === null ? 'No respondió esta pregunta' : rol) + '</strong></p>';
}