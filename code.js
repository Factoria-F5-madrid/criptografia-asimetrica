const crypto = require('crypto');

// Hash SHA-256
const texto = "Hola mundo";
const hashSha256 = crypto.createHash('sha256').update(texto).digest('hex');
console.log(`SHA-256: ${hashSha256}`);
