const form = document.getElementById("searchForm");
const input = document.getElementById("inp-el");
const cardContainer = document.getElementById("card-container");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    buscarPersonaje();
});

async function buscarPersonaje() {
    const valor = input.value.trim();

    if (valor === "") {
        mostrarError("Por favor, ingresá un nombre o un ID");
        return;
    }

    cardContainer.innerHTML = `
    <div class="w-full flex justify-center py-10">
      <p class="text-gray-400 text-lg animate-pulse">Buscando...</p>
    </div>
  `;

    try {
        let personaje;

        if (!isNaN(valor) && valor !== "") {
            const res = await fetch(`https://rickandmortyapi.com/api/character/${valor}`);
            if (!res.ok) throw new Error("No encontrado");
            personaje = await res.json();
            mostrarCards([personaje]);
        } else {
            const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${valor}`);
            if (!res.ok) throw new Error("No encontrado");
            const data = await res.json();
            mostrarCards(data.results);
        }
    } catch (error) {
        mostrarError("Personaje no encontrado");
    }
}

function mostrarCards(personajes) {
    cardContainer.innerHTML = "";

    personajes.forEach((personaje) => {
        const { name, status, species, location, image } = personaje;

        const colorBorde = status === "Alive"
            ? "border-green-500"
            : status === "Dead"
                ? "border-red-500"
                : "border-gray-400";

        const colorEstado = status === "Alive"
            ? "text-green-600"
            : status === "Dead"
                ? "text-red-500"
                : "text-gray-500";

        const colorPunto = status === "Alive"
            ? "bg-green-500"
            : status === "Dead"
                ? "bg-red-500"
                : "bg-gray-400";

        const card = document.createElement("div");
        card.className = `flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${colorBorde} w-full max-w-sm`;

        card.innerHTML = `
      <img src="${image}" alt="${name}" class="w-full sm:w-36 sm:h-36 object-cover flex-shrink-0">
      <div class="p-4 flex flex-col justify-center gap-1">
        <h2 class="text-lg font-bold text-gray-800">${name}</h2>
        <p class="text-sm flex items-center gap-1 ${colorEstado} font-medium">
          <span class="inline-block w-2 h-2 rounded-full ${colorPunto}"></span>
          ${status}
        </p>
        <p class="text-sm text-gray-500"><span class="font-medium text-gray-700">Especie:</span> ${species}</p>
        <p class="text-sm text-gray-500 truncate"><span class="font-medium text-gray-700">Última ubicación:</span> ${location.name}</p>
      </div>
    `;

        cardContainer.appendChild(card);
    });
}

function mostrarError(mensaje) {
    cardContainer.innerHTML = `
    <div class="w-full flex justify-center py-10">
      <p class="text-red-500 text-lg font-medium">${mensaje}</p>
    </div>
  `;
}