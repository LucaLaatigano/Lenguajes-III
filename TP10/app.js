let paso = 1;
const totalPasos = 10;

const validaciones = {
    1: validar1, 2: validar2, 3: validar3, 4: validar4, 5: validar5,
    6: validar6, 7: validar7, 8: validar8, 9: validar9, 10: validar10
};

const mensajes = {
    1: 'Solo letras (acentos y ñ permitidos), mínimo 3 caracteres.',
    2: 'Seleccioná una raza válida.',
    3: 'Seleccioná una clase válida.',
    4: 'Solo letras (acentos y ñ permitidos), mínimo 3 caracteres.',
    5: 'Solo letras (acentos y ñ permitidos), mínimo 3 caracteres.',
    6: 'Solo números, exactamente 6 dígitos.',
    7: 'Solo números, entre 1 y 999.',
    8: 'Solo números, mínimo 0.',
    9: 'Tu personaje debe ser mayor de 18 años.',
    10: 'La fecha no puede ser futura.'
};

function soloLetras(v) {
    const t = v.trim();
    return /^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ ]+$/.test(t) && t.length >= 3;
}

function soloNumeros(v) {
    return v.trim() !== '' && !isNaN(v);
}

function validar1() { return soloLetras(document.getElementById('campo1').value); }
function validar2() { return document.getElementById('campo2').value !== ''; }
function validar3() { return document.getElementById('campo3').value !== ''; }
function validar4() { return soloLetras(document.getElementById('campo4').value); }
function validar5() { return soloLetras(document.getElementById('campo5').value); }

function validar6() {
    const v = document.getElementById('campo6').value.trim();
    return soloNumeros(v) && /^[0-9]{6}$/.test(v);
}

function validar7() {
    const v = document.getElementById('campo7').value;
    return soloNumeros(v) && Number(v) >= 1 && Number(v) <= 999;
}

function validar8() {
    const v = document.getElementById('campo8').value;
    return soloNumeros(v) && Number(v) >= 0;
}

function validar9() {
    const v = document.getElementById('campo9').value;
    if (v === '') return false;
    const hoy = new Date();
    const nac = new Date(v + 'T00:00:00');
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad >= 18;
}

function validar10() {
    const v = document.getElementById('campo10').value;
    if (v === '') return false;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(v + 'T00:00:00');
    return fecha <= hoy;
}

function setBorde(el, estado) {
    el.classList.remove('border-slate-300', 'border-gray-400', 'border-red-500', 'border-green-500');
    if (estado === 'gris') el.classList.add('border-gray-400');
    else if (estado === 'rojo') el.classList.add('border-red-500');
    else if (estado === 'verde') el.classList.add('border-green-500');
    else el.classList.add('border-slate-300');
}

function actualizarBotones() {
    document.getElementById('btnRetroceder').disabled = (paso === 1);
}

function siguiente() {
    const campo = document.getElementById('campo' + paso);
    const error = document.getElementById('error' + paso);
    const valor = campo.value;

    if (valor.trim() === '') {
        setBorde(campo, 'gris');
        error.innerHTML = 'Este campo no puede estar vacío.';
        return;
    }

    if (!validaciones[paso]()) {
        setBorde(campo, 'rojo');
        error.innerHTML = mensajes[paso];
        return;
    }

    setBorde(campo, 'verde');
    error.innerHTML = '';
    campo.disabled = true;

    if (paso === totalPasos) {
        finalizar();
        return;
    }

    document.getElementById('p' + paso).classList.add('hidden');
    paso++;
    document.getElementById('p' + paso).classList.remove('hidden');
    actualizarBotones();
}

function retroceder() {
    if (paso === 1) return;
    document.getElementById('p' + paso).classList.add('hidden');
    paso--;
    const campo = document.getElementById('campo' + paso);
    document.getElementById('p' + paso).classList.remove('hidden');
    campo.disabled = false;
    setBorde(campo, 'original');
    document.getElementById('error' + paso).innerHTML = '';
    actualizarBotones();
}

function reiniciar() {
    for (let i = 1; i <= totalPasos; i++) {
        const campo = document.getElementById('campo' + i);
        campo.disabled = false;
        if (campo.tagName === 'SELECT') campo.selectedIndex = 0;
        else campo.value = '';
        setBorde(campo, 'original');
        document.getElementById('error' + i).innerHTML = '';
        document.getElementById('p' + i).classList.add('hidden');
    }
    paso = 1;
    document.getElementById('p1').classList.remove('hidden');
    document.getElementById('mensajeFinal').classList.add('hidden');
    document.getElementById('controles').classList.remove('hidden');
    actualizarBotones();
}

function finalizar() {
    for (let i = 1; i <= totalPasos; i++) {
        document.getElementById('campo' + i).disabled = true;
    }
    document.getElementById('controles').classList.add('hidden');
    const nombre = document.getElementById('campo1').value;
    const raza = document.getElementById('campo2').value;
    const clase = document.getElementById('campo3').value;
    const final = document.getElementById('mensajeFinal');
    final.innerHTML = '🎉 ¡Registro exitoso, ' + nombre + '! Tu leyenda comienza hoy. ¡Que la Gran Alianza guíe tus pasos, ' + clase + ' de los ' + raza + '! 🎉';
    final.classList.remove('hidden');
}