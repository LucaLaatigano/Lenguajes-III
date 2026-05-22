let materias = [];

function obtenerDatos() {
    const inputMateria = document.getElementById("materia");
    const inputNota = document.getElementById("nota");

    const materia = inputMateria.value.trim();
    const notaValor = inputNota.value.trim();

    if (materia === "" || notaValor === "" || isNaN(notaValor)) {
        alert("Por favor, ingrese un nombre de materia y una nota válida.");
        return null;
    }

    const nota = parseFloat(notaValor);
    if (nota < 0 || nota > 10) {
        alert("La nota debe estar entre 0 y 10.");
        return null;
    }

    return { materia, nota };
}

function clasificarNota(nota) {
    if (nota >= 9) {
        return "Sobresaliente";
    } else if (nota >= 7) {
        return "Bueno";
    } else if (nota >= 6) {
        return "Regular";
    } else if (nota >= 4) {
        return "Aprobado mínimo";
    } else {
        return "Insuficiente";
    }
}

function agregarMateria() {
    const datos = obtenerDatos();
    if (datos !== null) {
        materias.push(datos);
        
        document.getElementById("materia").value = "";
        document.getElementById("nota").value = "";
        document.getElementById("materia").focus();

        mostrarLista();
        calcularResumen();
    }
}

function mostrarLista() {
    const listaContenedor = document.getElementById("lista");
    if (materias.length === 0) {
        listaContenedor.innerHTML = "";
        return;
    }

    let tablaHTML = `
        <table class="w-full border-collapse border border-slate-200 text-sm mb-4">
            <thead>
                <tr class="bg-slate-100 text-slate-700">
                    <th class="border border-slate-200 px-4 py-2 text-left font-semibold">Materia</th>
                    <th class="border border-slate-200 px-4 py-2 text-center font-semibold">Nota</th>
                    <th class="border border-slate-200 px-4 py-2 text-center font-semibold">Clasificación</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < materias.length; i++) {
        const mat = materias[i];
        const clasificacion = clasificarNota(mat.nota);
        tablaHTML += `
            <tr class="hover:bg-slate-50/50">
                <td class="border border-slate-200 px-4 py-2 text-slate-800">${mat.materia}</td>
                <td class="border border-slate-200 px-4 py-2 text-center font-bold text-slate-900">${mat.nota}</td>
                <td class="border border-slate-200 px-4 py-2 text-center text-slate-700">${clasificacion}</td>
            </tr>
        `;
    }

    tablaHTML += `
            </tbody>
        </table>
    `;

    listaContenedor.innerHTML = tablaHTML;
}

function calcularResumen() {
    const resumenContenedor = document.getElementById("resumen");
    if (materias.length === 0) {
        resumenContenedor.innerHTML = "";
        return;
    }

    let suma = 0;
    let aprobadas = 0;
    let reprobadas = 0;
    let mejorNota = -1;
    let peorNota = 11;
    let mejorMateria = "";
    let peorMateria = "";

    let i = 0;
    while (i < materias.length) {
        const m = materias[i];
        suma += m.nota;

        if (m.nota >= 6) {
            aprobadas++;
        } else {
            reprobadas++;
        }

        if (m.nota > mejorNota) {
            mejorNota = m.nota;
            mejorMateria = m.materia;
        }

        if (m.nota < peorNota) {
            peorNota = m.nota;
            peorMateria = m.materia;
        }

        i++;
    }

    const promedio = suma / materias.length;

    resumenContenedor.innerHTML = `
        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1 text-slate-700 text-sm">
            <p><strong>Promedio General:</strong> ${promedio.toFixed(2)}</p>
            <p><strong>Materias Aprobadas:</strong> ${aprobadas} | <strong>Reprobadas:</strong> ${reprobadas}</p>
            <p><strong>Mejor Rendimiento:</strong> ${mejorMateria} (${mejorNota})</p>
            <p><strong>Peor Rendimiento:</strong> ${peorMateria} (${peorNota})</p>
        </div>
    `;
}

function limpiarTodo() {
    materias = [];
    document.getElementById("materia").value = "";
    document.getElementById("nota").value = "";
    mostrarLista();
    calcularResumen();
}


let historial = [];

function obtenerNumero() {
    const inputValor = document.getElementById("valor");
    const valorStr = inputValor.value.trim();

    if (valorStr === "" || isNaN(valorStr)) {
        alert("Por favor, ingrese un valor numérico válido.");
        return null;
    }

    return parseFloat(valorStr);
}

function convertir() {
    const valor = obtenerNumero();
    if (valor === null) return;

    const tipoConversion = parseInt(document.getElementById("tipoConversion").value);
    const resultadoContenedor = document.getElementById("resultado");
    let resultado = 0;
    let operacion = "";
    let detalle = "";

    switch (tipoConversion) {
        case 1:
            resultado = valor * 0.621371;
            operacion = "Kilómetros a Millas";
            detalle = `${valor} km = ${resultado.toFixed(2)} mi`;
            break;
        case 2:
            resultado = valor * 1.60934;
            operacion = "Millas a Kilómetros";
            detalle = `${valor} mi = ${resultado.toFixed(2)} km`;
            break;
        case 3:
            resultado = valor * 2.20462;
            operacion = "Kilogramos a Libras";
            detalle = `${valor} kg = ${resultado.toFixed(2)} lb`;
            break;
        case 4:
            resultado = valor * 0.453592;
            operacion = "Libras a Kilogramos";
            detalle = `${valor} lb = ${resultado.toFixed(2)} kg`;
            break;
        case 5:
            resultado = (valor * 9/5) + 32;
            operacion = "Celsius a Fahrenheit";
            detalle = `${valor} °C = ${resultado.toFixed(2)} °F`;
            break;
        case 6:
            resultado = (valor - 32) * 5/9;
            operacion = "Fahrenheit a Celsius";
            detalle = `${valor} °F = ${resultado.toFixed(2)} °C`;
            break;
        case 7:
            resultado = valor * 3.28084;
            operacion = "Metros a Pies";
            detalle = `${valor} m = ${resultado.toFixed(2)} ft`;
            break;
        default:
            resultadoContenedor.innerText = "Opción de conversión no válida.";
            return;
    }

    resultadoContenedor.innerText = `Resultado: ${detalle}`;

    const fecha = new Date().toLocaleTimeString();
    historial.push({ operacion, detalle, fecha });

    mostrarHistorial();
}

function mostrarHistorial() {
    const historialContenedor = document.getElementById("historial");
    if (historial.length === 0) {
        historialContenedor.innerHTML = "";
        return;
    }

    let historialHTML = `<p class="font-bold mt-4 mb-2 text-slate-800 text-sm">Historial de Conversiones:</p><ul class="list-disc pl-5 space-y-1 text-slate-600 text-sm">`;
    for (let i = historial.length - 1; i >= 0; i--) {
        const item = historial[i];
        historialHTML += `<li>[${item.fecha}] ${item.operacion}: ${item.detalle}</li>`;
    }
    historialHTML += `</ul>`;
    historialContenedor.innerHTML = historialHTML;
}


let numeros = [];

function agregarNumero() {
    const inputNumero = document.getElementById("numero");
    const errorNumero = document.getElementById("errorNumero");
    const valorStr = inputNumero.value.trim();

    errorNumero.innerText = "";

    let esValido = false;
    let numero = null;

    do {
        if (valorStr === "" || isNaN(valorStr)) {
            errorNumero.innerText = "Error: Debe ingresar un valor numérico.";
            break;
        }
        numero = parseFloat(valorStr);
        esValido = true;
    } while (false);

    if (esValido && numero !== null) {
        numeros.push(numero);
        inputNumero.value = "";
        inputNumero.focus();

        mostrarNumeros();
        calcularEstadisticas();
        document.getElementById("tabla").innerHTML = "";
    }
}

function mostrarNumeros() {
    const listaNumerosContenedor = document.getElementById("listaNumeros");
    if (numeros.length === 0) {
        listaNumerosContenedor.innerText = "";
        return;
    }

    let numerosStr = "";
    for (let i = 0; i < numeros.length; i++) {
        numerosStr += numeros[i];
        if (i < numeros.length - 1) {
            numerosStr += ", ";
        }
    }

    listaNumerosContenedor.innerHTML = `<strong>Números ingresados (${numeros.length}):</strong> [${numerosStr}]`;
}

function calcularEstadisticas() {
    const estadisticasContenedor = document.getElementById("estadisticas");
    if (numeros.length === 0) {
        estadisticasContenedor.innerHTML = "";
        return;
    }

    let suma = 0;
    let positivos = 0;
    let negativos = 0;
    let mayor = numeros[0];
    let menor = numeros[0];

    let i = 0;
    while (i < numeros.length) {
        const num = numeros[i];
        suma += num;

        if (num > 0) {
            positivos++;
        } else if (num < 0) {
            negativos++;
        }

        if (num > mayor) {
            mayor = num;
        }
        if (num < menor) {
            menor = num;
        }

        i++;
    }

    const promedio = suma / numeros.length;

    estadisticasContenedor.innerHTML = `
        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1 text-slate-700 text-sm">
            <p><strong>Suma acumulada:</strong> ${suma.toFixed(2)}</p>
            <p><strong>Promedio:</strong> ${promedio.toFixed(2)}</p>
            <p><strong>Cantidad Positivos:</strong> ${positivos} | <strong>Negativos:</strong> ${negativos}</p>
            <p><strong>Número Mayor:</strong> ${mayor} | <strong>Número Menor:</strong> ${menor}</p>
        </div>
    `;
}

function tablaMultiplicar() {
    const tablaContenedor = document.getElementById("tabla");
    const errorNumero = document.getElementById("errorNumero");

    errorNumero.innerText = "";

    if (numeros.length === 0) {
        errorNumero.innerText = "Error: Ingrese al menos un número para generar la tabla.";
        return;
    }

    const ultimoNumero = numeros[numeros.length - 1];
    let tablaHTML = `<p class="font-bold mt-4 mb-2 text-slate-800 text-sm">Tabla del ${ultimoNumero}:</p><ul class="list-disc pl-5 space-y-1 text-slate-600 text-sm">`;
    
    for (let i = 1; i <= 10; i++) {
        tablaHTML += `<li>${ultimoNumero} x ${i} = ${ultimoNumero * i}</li>`;
    }
    
    tablaHTML += `</ul>`;
    tablaContenedor.innerHTML = tablaHTML;
}

function reiniciar() {
    numeros = [];
    document.getElementById("numero").value = "";
    document.getElementById("errorNumero").innerText = "";
    document.getElementById("listaNumeros").innerText = "";
    document.getElementById("estadisticas").innerHTML = "";
    document.getElementById("tabla").innerHTML = "";
}
