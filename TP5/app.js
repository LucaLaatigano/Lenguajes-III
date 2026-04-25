const inputNombre = document.getElementById("input-nombre");
const inputApellido = document.getElementById("input-apellido");
const inputFecha = document.getElementById("input-fecha");
const inputEmail = document.getElementById("input-email");
const inputContraseña = document.getElementById("input-contraseña");
const inputConfirmarContraseña = document.getElementById("input-confirmar-contraseña");

function submitForm(e) {
    e.preventDefault();

    let esValido = true;

    if (inputNombre.value.trim().length < 3) {
        mostrarError(inputNombre, true);
        esValido = false;
    } else {
        mostrarError(inputNombre, false);
    }

    if (inputApellido.value.trim().length < 3) {
        mostrarError(inputApellido, true);
        esValido = false;
    } else {
        mostrarError(inputApellido, false);
    }

    const fechaNacimiento = new Date(inputFecha.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    if (isNaN(edad) || edad < 18 || edad > 40) {
        mostrarError(inputFecha, true);
        esValido = false;
    } else {
        mostrarError(inputFecha, false);
    }


    if (!inputEmail.value.toLowerCase().endsWith("@ucasal.edu.ar")) {
        mostrarError(inputEmail, true);
        esValido = false;
    } else {
        mostrarError(inputEmail, false);
    }

    if (inputContraseña.value === "" || inputContraseña.value !== inputConfirmarContraseña.value) {
        mostrarError(inputContraseña, true);
        mostrarError(inputConfirmarContraseña, true);
        esValido = false;
    } else {
        mostrarError(inputContraseña, false);
        mostrarError(inputConfirmarContraseña, false);
    }

    if (esValido) {
        alert("¡Formulario enviado con éxito!");
        document.querySelector('form').reset();
    }
}

function mostrarError(input, mostrar) {
    const mensaje = input.nextElementSibling;
    if (mostrar) {
        mensaje.classList.remove("hidden");
        input.classList.add("border-red-600");
    } else {
        mensaje.classList.add("hidden");
        input.classList.remove("border-red-600");
    }
}