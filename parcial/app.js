function validarNombre() {
    let nombre = document.getElementById("nombre").value.trim()
    let errorEl = document.getElementById("error-nombre")

    if (nombre.length < 3) {
        errorEl.innerHTML = "El nombre tiene que tener un minimo de 3 caracteres"
        return false
    }

    let letrasPermitidas = "abcdefghijklmnñopqrstuvwxyzáéíóúü ";
    for (let i = 0; i < nombre.length; i++) {
        let caracter = nombre[i]

        if (!letrasPermitidas.includes(caracter.toLowerCase())) {
            errorEl.innerHTML = "El nombre solo puede tener letras"
            return false
        }
    }
    errorEl.innerHTML = ""
    return true;
}

function validarDNI() {
    let dni = document.getElementById("dni").value.trim()
    let errorEl = document.getElementById("error-dni")

    if (isNaN(dni) || dni.length !== 8) {
        errorEl.innerHTML = "El DNI debe tener exactamente 8 dígitos numericos"
        return false;
    }

    errorEl.innerHTML = ""
    return true
}

function validarFecha() {
    let fecha = document.getElementById("fecha").value
    let errorEl = document.getElementById("error-fecha")

    if (!fecha) {
        errorEl.innerHTML = "Ingresá tu fecha de nacimiento"
        return false
    }

    let hoy = new Date()
    let partes = fecha.split("-");
    let anioNac = parseInt(partes[0]);
    let mesNac = parseInt(partes[1]) - 1;
    let diaNac = parseInt(partes[2]);

    let edad = hoy.getFullYear() - anioNac;
    let mes = hoy.getMonth() - mesNac;

    if (mes < 0 || (mes === 0 && hoy.getDate() < diaNac)) {
        edad--
    }

    if (edad < 18) {
        errorEl.innerHTML = "Debés ser mayor de 18 años para inscribirte"
        return false
    }

    errorEl.innerHTML = ""
    return true
}

document.getElementById("btn-enviar").addEventListener("click", function (e) {
    e.preventDefault()
    let nombre = validarNombre()
    let dni = validarDNI()
    let fecha = validarFecha()
    let mensajeExito = document.getElementById("mensaje-exito")

    if (nombre && dni && fecha) {
        mensajeExito.innerHTML = "Inscripto Correctamente"
        mensajeExito.classList.remove("hidden")
    } else {
        mensajeExito.innerHTML = ""
        mensajeExito.classList.add("hidden")
    }
});

document.getElementById("btn-preguntas").addEventListener("click", function () {
    let preguntas = [
        "¿Cuál es tu nacionalidad?",
        "¿Cuál es tu nivel de conocimiento en programación? (Básico / Intermedio / Avanzado)",
        "¿Por qué elegiste esta carrera?"
    ]

    let respuestas = [];

    for (let i = 0; i < preguntas.length; i++) {
        let resp = prompt(preguntas[i])
        if (resp === null) {
            respuestas.push("No respondio")
        } else {
            respuestas.push(resp.trim() !== "" ? resp.trim() : "Sin respuesta")
        }
    }

    let container = document.getElementById("respuestas-div")
    let body = document.getElementById("respuestas-cotenido")

    body.innerHTML =
        "<p><strong>Pregunta 1:</strong> " + respuestas[0] + "</p>" +
        "<p><strong>Pregunta 2:</strong> " + respuestas[1] + "</p>" +
        "<p><strong>Pregunta 3:</strong> " + respuestas[2] + "</p>"

    container.classList.remove("hidden")
})