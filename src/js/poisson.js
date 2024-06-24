// Función para generar una distribución de Poisson

function Poisson(a, poissonCamion) {
    let b = Math.pow(2.71, -a);
    let x = 0;
    let p = 1;
    while (p > b) {
        GU(u); // Generar un número pseudoaleatorio usando el método congruencial multiplicativo
        p = p * u.valorU; // Actualizar la probabilidad acumulada
        x = x + 1; // Incrementar el contador de eventos
    }
    return (poissonCamion.valor = x); // Devolver el resultado de la distribución de Poisson
}
// Poisson(900, poissonCamion);
// console.log(poissonCamion.valor);
