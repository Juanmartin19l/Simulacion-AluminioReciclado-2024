let graficoProductos;
let graficoBasuraAluminio;

function generarResultados() {
    // VARIABLES
    let dia = 0;
    let basuraDiaria = 0;
    let basuraTotal = 0;
    let aluminioReciclable = 0;
    let toneladasAluminio = 0;
    let basura = 0;
    let aluminio99 = 0;
    let aluminio80 = 0;
    let aluminio50 = 0;
    let autopartes = {
        valor: 0,
    };
    let productosCocina = {
        valor: 0,
    };
    let poissonCamion = {
        valor: 0,
    };
    let componentesIndustriales = 0;
    let autopartesTotal = 0;
    let productosCocinaTotal = 0;
    let componentesIndustrialesTotal = 0;

    // Constantes del INPUT
    let numCamiones = document.getElementById("numCamiones").value;
    if (numCamiones === "") {
        parseInt((numCamiones = 5));
    }
    let minT = parseInt(document.getElementById("sliderMin").value);
    let maxT = parseInt(document.getElementById("sliderMax").value);
    const objetivoIndustriales = document.getElementById(
        "objetivoIndustriales"
    ).value;
    const objetivoAutos = document.getElementById("objetivoAutos").value;

    // BUCLE DIA
    while (dia < 30) {
        //console.log('\n Hoy es el dia: ', dia+1);
        Poisson(numCamiones, poissonCamion);
        //console.log(
        //     "Cantidad de camiones del dia ",
        //     dia,
        //     "es: ",
        //     poissonCamion.valor
        // );
        while (poissonCamion.valor > 0) {
            GU(u);
            //console.log(u.valorU);
            basura = Math.floor(minT + (maxT - minT) * u.valorU);
            //console.log('Basura del camion ', poissonCamion.valor, 'es de: ', basura);
            basuraDiaria += basura;
            poissonCamion.valor = poissonCamion.valor - 1;
        }
        //console.log('Basura diaria', basuraDiaria);
        basuraTotal += basuraDiaria;
        GU(u);
        let porcentaje = 45 + 30 * u.valorU;
        //console.log('La el aluminio que se reciclara es: ',Math.floor(basuraDiaria * (porcentaje / 100)), 'y el porcentaje de basura que se reciclara es: ', porcentaje);
        aluminioReciclable += Math.floor(basuraDiaria * (porcentaje / 100));
        //console.log('Total de Aluminio para reciclar: ', aluminioReciclable);
        basuraDiaria = 0;
        dia++;
    } // FIN BUCLE DIA

    // RESULTADOS MES
    //console.log('\n\nToneladas de chatarra ingresaron a la planta en el mes:', basuraTotal);
    //console.log('El promedio diario, en toneladas, de chatarra: ', Math.floor(basuraTotal/30));
    //console.log('Cantidad total de aluminio se ha logrado reciclar: ', aluminioReciclable);
    //console.log('Toneladas de CO2 se ha reciclado en el proceso: ', aluminioReciclable*9);

    toneladasAluminio = aluminioReciclable;
    // INICIO BUCLE TONELADA
    while (aluminioReciclable > 0) {
        GU(u);
        if (u.valorU < 0.1) {
            aluminio99++;
            Normal(6, 1, autopartes);
            autopartes.valor = Math.round(autopartes.valor);
            autopartesTotal += autopartes.valor;
            //console.log('La tonelada n',aluminioReciclable, 'tiene ',autopartes.valor, 'autopartes');
        } else if (u.valorU < 0.5) {
            aluminio80++;
            Normal(400, 50, productosCocina);
            productosCocina.valor = Math.round(productosCocina.valor);
            productosCocinaTotal += productosCocina.valor;
            //console.log('La tonelada n',aluminioReciclable, 'tiene ',productosCocina.valor, 'productos cocina');
        } else {
            aluminio50++;
            GU(u);
            componentesIndustriales = Math.round(2 + 2 * u.valorU);
            componentesIndustrialesTotal += componentesIndustriales;
            //console.log('La tonelada n',aluminioReciclable, 'tiene ',componentesIndustriales, 'componentes industriales');
        }
        aluminioReciclable--;
    } // FIN BUCLE TONELADA

    // RESULTADOS PRODUCTOS FINALES
    //console.log('Toneladas Aluminio99: ', aluminio99);
    //console.log('Toneladas Aluminio80: ', aluminio80);
    //console.log('Toneladas Aluminio50: ', aluminio50);
    //console.log('Componentes para autos: ', autopartesTotal);
    //console.log('Utensilios de cocina: ', productosCocinaTotal);
    //console.log('Componentes industriales: ', componentesIndustrialesTotal);

    let compra =
        toneladasAluminio < 2500
            ? `<p>Se comprarán dos nuevos camiones recolectores para aumentar la capacidad de recolección de basura.</p><img src="src/img/camionNuevo.jpg" alt="camion nuevo">`
            : `<p>Se adquirirá una nueva máquina trituradora para aumentar la capacidad de trituración de aluminio.</p><img src="src/img/trituradora.png" alt="trituradora nueva">
`;
    let demandaEssen =
        productosCocinaTotal < 370000
            ? `<p><span>NO</span> se alcanzó la meta de demanda mínima establecida de <span>370000</span> utensilios de cocina Essen, con un déficit de <span>${
                  370000 - productosCocinaTotal
              }</span>. Como resultado, se procederá a contratar un nuevo gerente de planta.</p>`
            : `<p>Se ha logrado satisfactoriamente la meta de demanda de <span>370000</span> utensilios de cocina Essen, cumpliendo con el objetivo establecido y superándolo por <span>${
                  productosCocinaTotal - 370000
              }</span> unidades.</p>`;

    //console.log(compra);
    //console.log(demandaEssen);

    // Demanda Minima de productos
    let obAuto = "";
    let obIndustriales = "";
    if (objetivoAutos > 0 && objetivoIndustriales > 0) {
        if (objetivoAutos < autopartesTotal) {
            obAuto = `<p>Se ha cumplido satisfactoriamente con la meta mínima de demanda de componentes para autos, alcanzando el objetivo propuesto de <span>${objetivoAutos}</span> y superándolo por <span>${
                autopartesTotal - objetivoAutos
            }</span>.</p>`;
        } else {
            obAuto = `<p><span>NO</span> se alcanzó la meta mínima establecida para la demanda de componentes automotrices, quedando un déficit de <span>${
                objetivoAutos - autopartesTotal
            }</span> para cumplir con el objetivo de <span>${objetivoAutos}</span>.</p>`;
        }
        if (objetivoIndustriales < componentesIndustrialesTotal) {
            obIndustriales = `<p>Se alcanzó con éxito la meta de demanda mínima para componentes industriales, logrando el objetivo de <span>${objetivoIndustriales}</span> y superándolo por <span>${
                componentesIndustrialesTotal - objetivoIndustriales
            }</span>.</p>`;
        } else {
            obIndustriales = `<p><span>NO</span> se alcanzó la meta mínima establecida para la demanda de componentes industriales, quedando un déficit de <span>${
                objetivoIndustriales - componentesIndustrialesTotal
            }</span> para cumplir con el objetivo de <span>${objetivoIndustriales}</span>.</p>`;
        }
    } else {
        obAuto = "";
        obIndustriales = "";
    }

    // Destruir gráficos existentes antes de crear nuevos
    if (graficoProductos) {
        graficoProductos.destroy();
    }
    if (graficoBasuraAluminio) {
        graficoBasuraAluminio.destroy();
    }

    // Gráficos
    let ctx = document.getElementById("graficoProductos").getContext("2d");
    graficoProductos = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Aluminio99", "Aluminio80", "Aluminio50"],
            datasets: [
                {
                    label: "Distribución de Aluminio",
                    data: [aluminio99, aluminio80, aluminio50],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let total = context.dataset.data.reduce(
                                (a, b) => a + b,
                                0
                            );
                            let value = context.raw;
                            let percentage = ((value / total) * 100).toFixed(2);
                            return `${context.label}: ${value} (${percentage}%)`;
                        },
                    },
                },
            },
        },
    });

    let ctx2 = document
        .getElementById("graficoBasuraAluminio")
        .getContext("2d");
    graficoBasuraAluminio = new Chart(ctx2, {
        type: "pie",
        data: {
            labels: ["Basura", "Aluminio  Reciclado"],
            datasets: [
                {
                    label: "Basura vs Aluminio Reciclado",
                    data: [basuraTotal - toneladasAluminio, toneladasAluminio],
                    backgroundColor: [
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                    ],
                    borderColor: [
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true, // Set to false to control the size
            plugins: {
                legend: {
                    position: "top",
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let total = context.dataset.data.reduce(
                                (a, b) => a + b,
                                0
                            );
                            let value = context.raw;
                            let percentage = ((value / total) * 100).toFixed(2);
                            return `${context.label}: ${value} (${percentage}%)`;
                        },
                    },
                },
            },
        },
    });

    // cambiar la semilla inicial
    u.semilla = Math.floor(Math.random() * 100);
    // VALIDAR CUANDO DA 0
    if (
        aluminio50 == 0 ||
        aluminio80 == 0 ||
        aluminio99 == 0 ||
        basuraTotal == 0
    ) {
        console.log(
            "ERROR................................................................................................................................................................................"
        );
        generarResultados();
    } else {
        let resultadosHTML = `
            <table class="content-table">
                <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Valor</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Toneladas de chatarra que ingresaron en el mes</td>
                    <td><span>${basuraTotal}</span></td>
                </tr>
                <tr>
                    <td>El promedio diario, en toneladas, de chatarra</td>
                    <td><span>${Math.floor(basuraTotal / 30)}</span></td>
                </tr>
                <tr>
                    <td>Toneladas Aluminio99 fabricado</td>
                    <td><span>${aluminio99}</span></td>
                </tr>
                <tr>
                    <td>Toneladas Aluminio80 fabricado</td>
                    <td><span>${aluminio80}</span></td>
                </tr>
                <tr>
                    <td>Toneladas Aluminio50 fabricado</td>
                    <td><span>${aluminio50}</span></td>
                </tr>
                <tr>
                    <td>Producción estimada de componentes para autos</td>
                    <td><span>${autopartesTotal}</span></td>
                </tr>
                <tr>
                    <td>Producción estimada de utensilios de cocina</td>
                    <td><span>${productosCocinaTotal}</span></td>
                </tr>
                <tr>
                    <td>Producción estimada de componentes industriales</td>
                    <td><span>${componentesIndustrialesTotal}</span></td>
                </tr>
                </tbody>
            </table>
        `;
        let CO2 = `<div class="loading">
                    <div class="line-box">
                        <div class="line-1"></div>
                    </div>
                </div>
                <div class="loading-text"><p>En el proceso de reciclaje de aluminio, se han reciclado <span>${
                    toneladasAluminio * 9
                }</span> toneladas de CO2.</p></div>`;
        let chatarra = `<div class="loading">
                    <div class="line-box">
                        <div class="line-2"></div>
                    </div>
                </div>
                <div class="loading-text"><p>En el proceso de reciclaje, se han reciclado exitosamente <span>${toneladasAluminio}</span> toneladas de aluminio.</p></div>`;
        document.getElementById("CO2").innerHTML = CO2;
        document.getElementById("chatarra").innerHTML = chatarra;
        document.getElementById("resultados").innerHTML = resultadosHTML;
        document.getElementById("compra").innerHTML = compra;
        let objetivos = `${demandaEssen}${obAuto}${obIndustriales}`;
        document.getElementById("demanda").innerHTML = objetivos;
    }
}
