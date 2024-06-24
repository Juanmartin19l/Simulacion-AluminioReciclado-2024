// Función para generar números pseudoaleatorios utilizando el método congruencial multiplicativo
function GU(u) {
    // Variables constantes
    const a = 5631; // Constante multiplicativa a > 0
    const m = 547; // Módulo m > 0

    // Generar la siguiente semilla usando la fórmula de congruencia Multiplicativo
    u.semilla = (a * u.semilla) % m;

    // Calcular el valor de u
    let resultado = u.semilla / m;

    // Devolver el valor de u
    return (u.valorU = resultado);
}
// Objeto para almacenar la semilla de u
let u = {
    semilla: Math.floor(Math.random() * 100), // semilla inicial de u
    valorU: 0,
};
// console.log("Número aleatorio u0:", GU(u));
