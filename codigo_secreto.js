console.log('\n' + '¡Bienvenido a Codigo secreto!' + '\n');
console.log('Adivina el código secreto de 4 dígitos. Este código tiene 4 dígitos que no se repiten entre sí' + '\n');

let codigoSecreto = generarCodigoSecreto(); // Generamos el código secreto en esta variable de scope global
let intentos = 0; // Contador de intentos

// Función para generar un código secreto aleatorio
function generarCodigoSecreto() {
    let codigo = []; // array que guardará el codigo secreto que genere esta función
    while (codigo.length < 4) {
        let numeroAleatorio = Math.floor(Math.random() * 10); //usamos el metodo random de math para agregar numeros
        if (!codigo.includes(numeroAleatorio)) { // si el numero no se repite en nuestro codigo se agrega
            codigo.push(numeroAleatorio); // el metodo .push agrega el numero de buestro array
        }
    }
    return codigo; //retornamos el valor de nuestro array a esta función para agregarla al scope global
}

console.log("Código secreto generado (oculto para el jugador):", codigoSecreto); // el codigo se nuestra solo para probar el programa

// CREAMOS UNA INTERFAZ CON MODULO readline PARA QUE USUARIO TECLEE SU CODIGO
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin, //para manejar codigo de entrada de usuario
    output: process.stdout //para mostrar codigo que usuario tecleeo
});

function validarCodigoUsuario() {
    rl.question("\nIntroduce un número de 4 dígitos sin repetir: ", (codigo) => {
        if (codigo.toLowerCase() === "salir") { // si el usuario elige rendirse
            console.log("\n💀 Te has rendido. El código secreto era:", codigoSecreto.join(""))
            rl.close()
            return
        }

        let codigoJugador = codigo.split('').map(Number); // Convertir string a array de números
        
        // Validación del código ingresado
        //aqui evaluamos las condiciones para asegurarnos que el codigo del usuario cumple con las condiciones (4 digitos unicos)
        if (/^\d{4}$/.test(codigo) && new Set(codigo).size === 4) {
            intentos++; // Aumentamos intentos
            // evaluamos el resultado invocando la función comparaCodigos
            let resultado = compararCodigos(codigoSecreto, codigoJugador);

            // si el resultado cumple con 4 * el jugador gana
            if (resultado === "****") {
                console.log("\n🎉 ¡Felicidades! Has adivinado el código en", intentos, "intentos.");
                rl.close();

            } else { 
                preguntarContinuar(); // Preguntar si el jugador quiere seguir o rendirse
            }
            
            // sino se ingresa un codigo de 4 digitos unicos se invoca nuevamente esta funcion
        } else {
            console.log("\nError: Debes ingresar 4 dígitos sin repetir. Intenta de nuevo.");
            validarCodigoUsuario();
        }
    })
}

// Función para comparar los códigos y dar pistas al usuario
function compararCodigos(codigoSecreto, codigoJugador) {
    let resultado = "";
    let correctos = 0; // Contador de números en la posición correcta
    let malPosicionados = 0; // Contador de números en posición equivocada

    // iteramos para evaluar cada valor de cada posición de los dos arrays
    for (let i = 0; i < 4; i++) {
        if (codigoJugador[i] === codigoSecreto[i]) {
            resultado += "*"; // Coincidencia exacta (número y posición)
            correctos++;
        } else if (codigoSecreto.includes(codigoJugador[i])) {
            resultado += "-"; // Coincidencia de número en diferente posición
            malPosicionados++;
        }
    }

    //aqui iremos imprimiendo en pantalla el resultado de la cantidad de numeros correctos
    console.log("\nResultado:", resultado);
    console.log(`✔ Hay ${correctos} número(s) en la posición correcta.`);
    console.log(`⚠ Hay ${malPosicionados} número(s) correcto(s) pero en la posición equivocada.`);
    
    return resultado;
}

// Función para preguntar al usuario si desea seguir intentando o rendirse
function preguntarContinuar() {
    rl.question("\n¿Quieres intentarlo de nuevo? (Escribe 'si' para continuar o 'salir' para rendirte): ", (respuesta) => {
        if (respuesta.toLowerCase() === "salir") {
            console.log("Te has rendido")
            rl.close();
        } else if (respuesta.toLowerCase() === "si") {
            validarCodigoUsuario(); // Volver a pedir código
        } else {
            console.log("\nRespuesta no válida. Escribe 'si' para seguir o 'salir' para rendirte.");
            preguntarContinuar(); // Volver a preguntar
        }
    });
}

// Iniciar el juego
validarCodigoUsuario();
