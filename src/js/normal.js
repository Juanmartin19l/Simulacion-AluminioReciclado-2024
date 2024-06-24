// Función para generar números aleatorios distribuidos normalmente
let normalSalida = {
    valor: 0, // resultado de demora de normal
};
function Normal(m, d, normalSalida) {
    let sum = 0;
    for (let i = 1; i <= 12; i++) {
        GU(u);
        sum = sum + u.valorU;
    }
    let x = d * (sum - 6) + m;
    return (normalSalida.valor = x);
}
// Ejemplo de uso de la función Normal para generar un número aleatorio con media 800 y desviación estándar 50
// Normal(800, 50, normalSalida);
// console.log(normalSalida.valor);
