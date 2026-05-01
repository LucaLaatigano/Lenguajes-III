$(document).ready(function () {

    const tabla = $("#tablaTareas").DataTable({
        language: {
            emptyTable: "No hay tareas cargadas.",
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ tareas",
            info: "Mostrando _START_ a _END_ de _TOTAL_ tareas",
            paginate: { first: "«", last: "»", next: "›", previous: "‹" },
        },
        columnDefs: [{ orderable: false, targets: 2 }],
    });

    $("#titulo").on("mouseenter", function () {
        $(this).css("color", "#2563eb");
    }).on("mouseleave", function () {
        $(this).css("color", "#1f2937");
    });

    function obtenerEtiqueta(prioridad) {
        const estilos = {
            Alta: "background:#fee2e2;color:#b91c1c;padding:2px 10px;border-radius:999px;font-size:0.75rem;",
            Media: "background:#fef9c3;color:#92400e;padding:2px 10px;border-radius:999px;font-size:0.75rem;",
            Baja: "background:#dcfce7;color:#166534;padding:2px 10px;border-radius:999px;font-size:0.75rem;",
        };
        return `<span style="${estilos[prioridad] || ""}">${prioridad}</span>`;
    }

    $("#btnAgregar").on("click", function () {
        const nombre = $("#inputTarea").val().trim();
        const prioridad = $("#selectPrioridad").val();

        if (nombre === "") {
            $("#error-msg").fadeIn(200);
            $("#inputTarea").addClass("border-red-400").removeClass("border-gray-300");
            return;
        }

        $("#error-msg").fadeOut(150);
        $("#inputTarea").addClass("border-gray-300").removeClass("border-red-400");

        const botonEliminar = `<button class="btn-eliminar text-xs text-red-500 border border-red-300 hover:bg-red-50 px-3 py-1 rounded transition-colors">Eliminar</button>`;

        const fila = tabla.row.add([nombre, obtenerEtiqueta(prioridad), botonEliminar]).draw(false).node();
        $(fila).hide().fadeIn(400);

        $("#inputTarea").val("");
        $("#selectPrioridad").val("Media");
    });

    $("#tablaTareas tbody").on("click", ".btn-eliminar", function () {
        const fila = $(this).closest("tr");
        fila.fadeOut(350, function () {
            tabla.row(fila).remove().draw(false);
        });
    });

    $("#inputTarea").on("input", function () {
        if ($(this).val().trim() !== "") {
            $("#error-msg").fadeOut(150);
            $(this).addClass("border-gray-300").removeClass("border-red-400");
        }
    });

});