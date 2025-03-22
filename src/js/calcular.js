// Verificar si estamos en la página de simulación antes de agregar event listeners
if (document.getElementById("calcular")) {
  document.getElementById("calcular").addEventListener("click", function () {
    let numCamiones = document.getElementById("numCamiones").value;
    const agregarObjetivo = document.getElementById("agregarObjetivo").checked;
    const objetivoIndustriales = document.getElementById(
      "objetivoIndustriales"
    ).value;
    const objetivoAutos = document.getElementById("objetivoAutos").value;

    let errors = [];
    if (numCamiones === "") {
      parseInt((numCamiones = 5));
    }

    // Validar número de camiones
    console.log(numCamiones);
    if (numCamiones < 1 || numCamiones > 15) {
      errors.push("El número de camiones debe estar entre 1 y 15.");
    }

    // Validar que el número de camiones no sea negativo o cero
    if (numCamiones <= 0) {
      errors.push("El número de camiones debe ser mayor que 0.");
    }

    // Validar objetivos mínimos si el checkbox está activo
    if (agregarObjetivo) {
      if (objetivoIndustriales < 1 || objetivoIndustriales > 10000) {
        errors.push(
          "El objetivo mínimo de demanda para componentes industriales debe estar entre 1 y 10000."
        );
      }
      if (objetivoAutos < 1 || objetivoAutos > 3000) {
        errors.push(
          "El objetivo mínimo de demanda para componentes para autos debe estar entre 1 y 3000."
        );
      }
      if (objetivoIndustriales === "" || objetivoAutos === "") {
        errors.push(
          "Debe ingresar los valores de demanda mínima para ambos componentes."
        );
      }
    }

    // Mostrar errores o realizar acción
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      generarResultados();

      // Mostrar la sección de resultados
      document.getElementById("resultados-section").classList.remove("hidden");
      // Desplazarse a la sección de resultados
      document
        .getElementById("resultados-section")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  // Funciones de los inputs
  const sliderMin = document.getElementById("sliderMin");
  if (sliderMin && sliderMin.oninput) {
    sliderMin.oninput = function () {
      document.getElementById("sliderMinValue").innerText = this.value;
    };
    sliderMin.value = "20";
  }

  const sliderMax = document.getElementById("sliderMax");
  if (sliderMax && sliderMax.oninput) {
    sliderMax.oninput = function () {
      document.getElementById("sliderMaxValue").innerText = this.value;
    };
    sliderMax.value = "30";
  }

  // Event listener para el checkbox
  const agregarObjetivo = document.getElementById("agregarObjetivo");
  if (agregarObjetivo) {
    agregarObjetivo.addEventListener("change", function () {
      const objetivosDiv = document.getElementById("objetivos");
      const objetivoIndustrialesInput = document.getElementById(
        "objetivoIndustriales"
      );
      const objetivoAutosInput = document.getElementById("objetivoAutos");

      if (this.checked) {
        objetivosDiv.classList.remove("hidden");
      } else {
        objetivosDiv.classList.add("hidden");
        objetivoIndustrialesInput.value = "";
        objetivoAutosInput.value = "";
      }
    });
  }

  // Asegurarse de que el checkbox esté desactivado y los inputs estén vacíos al cargar la página
  document.addEventListener("DOMContentLoaded", function () {
    if (agregarObjetivo) {
      agregarObjetivo.checked = false;
    }
    const numCamionesInput = document.getElementById("numCamiones");
    if (numCamionesInput) {
      numCamionesInput.value = "";
    }
    const objetivoIndustrialesInput = document.getElementById(
      "objetivoIndustriales"
    );
    if (objetivoIndustrialesInput) {
      objetivoIndustrialesInput.value = "";
    }
    const objetivoAutosInput = document.getElementById("objetivoAutos");
    if (objetivoAutosInput) {
      objetivoAutosInput.value = "";
    }
  });
}
