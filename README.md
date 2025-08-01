![cifradoasimetrico](https://jorgebenitezlopez.com/tiddlywiki/pro/portadaciberseguridad.jpg)

# Bases de Seguridad en la Web
<br>
<br>
<br>
<br>

## 📋 Índice

1. [Introducción](#introducción)
2. [Conceptos Fundamentales](#1-conceptos-fundamentales)
   - [Función Hash](#-función-hash)
   - [Criptografía Asimétrica vs Simétrica](#-criptografía-asimétrica-vs-criptografía-simétrica)
   - [Certificado Digital](#-certificado-digital)
3. [Aplicaciones Prácticas](#2-aplicaciones-prácticas-de-estos-conceptos)
   - [Contraseñas en Base de Datos](#-contraseñas-en-base-de-datos)
   - [SSH (Secure Shell)](#-ssh-secure-shell)
   - [HTTPS (HTTP Secure)](#-https-http-secure)
   - [Tokens JWT](#-tokens-jwt-json-web-tokens)
4. [Reto Práctico](#4-reto-práctico)
5. [Información Adicional](#5-información-adicional)

<br>
<br>
<br>
<br>

## Introducción

En este documento aprenderemos los conceptos fundamentales de criptografía y cómo se aplican en el mundo real para garantizar la seguridad digital. Comprenderemos la diferencia entre cifrado simétrico y asimétrico, funciones hash, y sus aplicaciones prácticas.

> [!TIP]
> 🎯 ¿Cuál es el objetivo principal de la criptografía en seguridad digital?
> - 🔵 Hacer que los datos sean más rápidos de procesar
> - 🔴 Proteger la confidencialidad, integridad y autenticidad de la información
> - 🟢 Reducir el tamaño de los archivos
> - 🟡 Hacer que los datos sean más fáciles de compartir

<br>
<br>
<br>
<br>

## 1. Conceptos Fundamentales

### 🔐 Función Hash

Una función hash es un algoritmo matemático que convierte datos de entrada de cualquier tamaño en una cadena de texto de longitud fija. Es un proceso **unidireccional** - no se puede revertir para obtener los datos originales.

**Características principales:**
- **Determinista**: La misma entrada siempre produce la misma salida
- **Unidireccional**: No se puede revertir el proceso (Hay pérdida de información)
- **Resistente a colisiones**: Es muy difícil encontrar dos entradas que produzcan el mismo hash
- **Efecto avalancha**: Un pequeño cambio en la entrada produce un hash completamente diferente

**Ejemplos de algoritmos hash:**
- SHA-256 (Secure Hash Algorithm 256-bit)
- bcrypt - Especializado para contraseñas

**Aplicaciones:**
- Almacenamiento seguro de contraseñas
- Verificación de integridad de archivos
- Firmas digitales
- Blockchain y criptomonedas

**Herramienta online para experimentar:** https://emn178.github.io/online-tools/sha256.html

#### **Ejemplos Prácticos:**

**Python:**
```python
import hashlib

# Hash SHA-256
texto = "Hola mundo"
hash_sha256 = hashlib.sha256(texto.encode('utf-8')).hexdigest()
print(f"SHA-256: {hash_sha256}")
```

**Node.js:**
```javascript
const crypto = require('crypto');

// Hash SHA-256
const texto = "Hola mundo";
const hashSha256 = crypto.createHash('sha256').update(texto).digest('hex');
console.log(`SHA-256: ${hashSha256}`);
```

> [!TIP]
> 🔐 ¿Cuál es la característica más importante de una función hash criptográfica?
> - 🔵 Permite revertir el proceso para obtener los datos originales
> - 🔴 Es unidireccional y no se puede revertir
> - 🟢 Siempre produce una salida de longitud variable
> - 🟡 Solo funciona con datos de texto plano

<br>
<br>
<br>
<br>

### 🔑 Criptografía Asimétrica vs Criptografía Simétrica

#### **Criptografía Simétrica:**
- **Usa una sola clave** para cifrar y descifrar datos
- **Ejemplos de algoritmos:** AES, DES, 3DES, ChaCha20
- **Ventajas:** Más rápida y eficiente
- **Desventajas:** Requiere compartir la clave de forma segura
- **Uso típico:** Cifrado de archivos

#### **Criptografía Asimétrica:**
La criptografía asimétrica utiliza un par de claves matemáticamente relacionadas:

*   **Clave pública:** Puede compartirse libremente y se usa para cifrar datos o verificar firmas digitales.
*   **Clave privada:** Se mantiene en secreto y se usa para descifrar datos cifrados con la clave pública o para firmar digitalmente.

**Ventajas sobre la criptografía simétrica:**
- La clave privada nunca se transmite
- Mayor seguridad contra interceptación
- Permite autenticación sin revelar secretos
- No requiere un canal seguro para intercambiar claves

**Desventajas:**
- Más lenta que la criptografía simétrica
- Requiere más recursos computacionales

#### **Criptografía Híbrida (Mejor de ambos mundos):**
En la práctica, se suele combinar ambos tipos:
1. **Criptografía asimétrica** para intercambiar una clave simétrica de forma segura
2. **Criptografía simétrica** para cifrar los datos reales (más rápido)

| Característica | Criptografía Simétrica | Criptografía Asimétrica |
| :------------ | :------------------ | :------------------ |
| Número de claves | 1 (compartida) | 2 (pública + privada) |
| Velocidad | Alta | Media |
| Seguridad | Alta (si la clave está protegida y es larga) | Muy alta |
| Intercambio seguro | Requiere canal seguro | No requiere |
| Usabilidad | Moderada | Requiere software especializado |

![cifradoasimetrico](https://jorgebenitezlopez.com/tiddlywiki/pro/cifradoasimetrico.jpg)

> [!TIP]
> 🔑 ¿Cuál es la principal diferencia entre criptografía simétrica y asimétrica?
> - 🔵 La simétrica usa una sola clave, la asimétrica usa un par de claves
> - 🔴 La asimétrica es más rápida que la simétrica
> - 🟢 La simétrica es más segura que la asimétrica
> - 🟡 Ambas requieren compartir la clave de forma segura

<br>
<br>
<br>
<br>

### 🏛️ Certificado Digital

Un certificado digital es un documento electrónico que asocia una clave pública con una identidad específica. La función clave es que una Autoridad de Certificación (CA) verifica tu identidad y garantiza que la clave pública pertenece realmente a la persona o entidad declarada. Lo emite una Autoridad de Certificación (CA) y contiene:

*   La clave pública del usuario.
*   Datos identificativos del propietario.
*   Firma digital de la Certification Authority que garantiza la autenticidad del certificado.

**Ya tenemos los tres pilares de la seguridad digital:**

* 🔐 **Confidencialidad**: La criptografía simétrica y asimétrica garantizan el **secreto** de la información. Romper el cifrado de un archivo con clave pública y privada es computacionalmente imposible sin acceder a las claves.

* 🚫 **No repudio**: Una persona no puede negar haber realizado una acción, como firmar un documento o enviar un mensaje, ya que el certificado está asociado a una persona específica. Es como una identificación digital verificada por una autoridad.

* ✅ **Integridad**: Las funciones hash garantizan que los datos no han sido alterados durante la transmisión. Por ejemplo, al descargar un archivo, puedes verificar su hash para asegurarte de que no ha sido modificado.

> [!TIP]
> 🏛️ ¿Qué garantiza un certificado digital emitido por una Autoridad de Certificación?
> - 🔵 Que el contenido del certificado es confidencial
> - 🔴 Que la clave pública pertenece realmente a la identidad declarada
> - 🟢 Que el certificado nunca expirará
> - 🟡 Que el propietario puede usar cualquier clave privada

<br>
<br>
<br>
<br>

## 2. Aplicaciones Prácticas de estos Conceptos

### 💾 Contraseñas en Base de Datos

**Problema:** Almacenar contraseñas en texto plano es un riesgo de seguridad crítico.

**Solución:** Usar funciones hash para almacenar solo el hash de la contraseña.

```sql
-- ❌ INCORRECTO - Nunca almacenar contraseñas en texto plano
INSERT INTO users (username, password) VALUES ('usuario', 'miContraseña123');

-- ✅ CORRECTO - Almacenar solo el hash
INSERT INTO users (username, password_hash) VALUES ('usuario', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
```

Ver base de datos

**Proceso de verificación:**
1. Usuario introduce contraseña
2. Sistema genera hash de la contraseña introducida
3. Compara con el hash almacenado en la base de datos
4. Si coinciden, autenticación exitosa

> [!TIP]
> 💾 ¿Por qué es peligroso almacenar contraseñas en texto plano en una base de datos?
> - 🔵 Porque ocupan demasiado espacio de almacenamiento
> - 🔴 Porque si alguien accede a la base de datos, puede ver todas las contraseñas
> - 🟢 Porque las contraseñas se corrompen fácilmente
> - 🟡 Porque es más lento procesar texto plano

<br>
<br>
<br>
<br>

### 🖥️ SSH (Secure Shell)

SSH proporciona acceso seguro a servidores remotos usando **dos métodos de autenticación**:

#### **1. Autenticación por Contraseña:**
```bash
ssh usuario@servidor
# Te pide la contraseña del usuario en el servidor
```

#### **2. Autenticación por Claves (Recomendado):**
```bash
ssh -i /ruta/a/tu/clave_privada usuario@servidor
# No requiere contraseña, más seguro
```

**Ventajas de usar claves SSH:**
- ✅ No se transmiten contraseñas por la red
- ✅ Más resistente a ataques de fuerza bruta
- ✅ Permite automatización sin contraseñas
- ✅ Más seguro para acceso remoto

**Instalación de OpenSSH:**
```bash
# Linux
sudo apt update
sudo apt install openssh-client

# macOS
brew install openssh

# Windows (verificado)
ssh-keygen
```

**Generar par de claves SSH:**
```bash
ssh-keygen -t ed25519 -C "tu_email@example.com"
```

**Estructura del directorio SSH:**
```bash
ls -l ~/.ssh/
# Contiene:
# - Claves privadas: id_rsa, id_ed25519, etc.
# - Claves públicas: id_rsa.pub, id_ed25519.pub, etc.
# - Archivos de configuración: config, known_hosts, etc.
```

**Proceso de autenticación con claves:**
1. Cliente genera par de claves SSH
2. Clave pública se añade al servidor (`~/.ssh/authorized_keys`)
3. Conexión se autentica mediante verificación criptográfica
4. No se transmiten contraseñas por la red

> [!TIP]
> 🖥️ ¿Cuál es la principal ventaja de SSH con claves sobre SSH con contraseña?
> - 🔵 Es más rápido que usar contraseñas
> - 🔴 No requiere transmitir contraseñas por la red
> - 🟢 Es más fácil de configurar
> - 🟡 Permite acceder a más servidores simultáneamente

<br>
<br>
<br>
<br>

### 🔒 HTTPS (HTTP Secure)

HTTPS utiliza certificados SSL/TLS para cifrar la comunicación entre cliente y servidor.

**Proceso de SSL/TLS:**
1. Cliente solicita conexión HTTPS
2. Servidor envía su certificado digital (clave pública)
3. Cliente verifica la autenticidad del certificado. Depende de la autoridad certificadora. (Hay de pago y gratuitas)
4. Se establece una clave simétrica para cifrar la sesión
5. Toda la comunicación posterior está cifrada

**Verificar certificados en el navegador:**
- Hacer clic en el candado en la barra de direcciones
- Ver detalles del certificado
- Comprobar la autoridad certificadora

**⚠️ Importante:** HTTPS no garantiza seguridad total por sí solo. El contenido puede seguir siendo vulnerable a otros ataques como phishing, donde puedes estar enviando información cifrada a un sitio falso que imita al legítimo. No es lo mismo una validación de dominio que una validación de empresa. (Es más caro)

> [!TIP]
> 🔒 ¿Qué garantiza HTTPS en una comunicación web?
> - 🔵 Que el sitio web es completamente seguro contra todos los ataques
> - 🔴 Que la comunicación entre cliente y servidor está cifrada
> - 🟢 Que el servidor nunca puede ser hackeado
> - 🟡 Que el usuario es anónimo

<br>
<br>
<br>
<br>

### 🎫 Tokens JWT (JSON Web Tokens)

Los tokens JWT son un estándar para transmitir información de forma segura entre partes. En lugar de enviar usuario y contraseña en cada petición, te autenticas una vez y recibes un token. En las siguientes peticiones solo envías el token.

**Estructura de un JWT:**
```
header.payload.signature
```

**⚠️ Importante:** El header y el payload no están cifrados, solo codificados en Base64. Es fácil extraer la información. La criptografía se aplica solo a la firma, que verifica que el contenido no ha sido alterado y que proviene de la fuente correcta. La firma se crea así: signature = RSA-SHA256(header.payload, privateKey)

**Herramienta para analizar JWT:** https://www.jwt.io/ (Ve el contenido del token)

**Ejemplo de token JWT:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEyNjRhNWUyYzQ0MGM1ZDJhNjc4ZjIiLCJ1c2VybmFtZSI6Im1hdXJvODciLCJlbWFpbCI6Im1hdUBnbWFpbC5jb20iLCJpYXQiOjE3MjkyNTg2Nzh9.EholRD6IFwhW8XZxBhTzvqVqTzqindKqJUbPmVU7M34
```

Clave: 123456789 (Descifrada con un programa en JS dentro del repo ;)

**Algoritmos de firma:**

1. **HS256 (HMAC-SHA256)**: Firma simétrica
   - Usa la misma clave secreta para firmar y verificar
   - Rápido y sencillo
   - Requiere compartir la clave secreta

2. **RS256 (RSA-SHA256)**: Firma asimétrica
   - Firma con clave privada, verifica con clave pública
   - Más seguro para entornos distribuidos
   - Solo el emisor necesita la clave privada

**Vulnerabilidades:**
- **Fuerza bruta**: Si la clave secreta es débil. Si capturas el token puedes ir haciendo pruebas hasta conseguir la clave
- **Exposición de tokens**: Si se interceptan en tránsito

**⚠️ Importante:** Por eso es tan importante limitar el número de intentos de acceso a servicios, implementar rate limiting y monitorear intentos de acceso sospechosos.

> [!TIP]
> 🎫 ¿Cuál es la diferencia principal entre JWT con HS256 y RS256?
> - 🔵 HS256 es más rápido que RS256
> - 🔴 HS256 usa firma simétrica, RS256 usa firma asimétrica
> - 🟢 RS256 es más fácil de implementar
> - 🟡 HS256 es más seguro para entornos distribuidos

<br>
<br>
<br>
<br>

## 4. Reto Práctico

### 🎯 Objetivo
Enviar un archivo cifrado donde escribas "qué te llevas" de esta sesión con la clave pública de Jorge Benítez para que solo él pueda descifrarlo. También puedes hacer lo mismo con un compi.

### 🛠️ Instalación de GPG

**Paso 1: Instalar GPG en tu sistema**
```bash
# Linux
sudo apt install gnupg

# macOS
brew install gnupg

# Windows
# Descargar desde: https://www.gpg4win.org/get-gpg4win.html
```

### 🔑 Configuración Inicial

**Paso 2: Generar tu par de claves**
```bash
gpg --gen-key
# Te pedirá: nombre, apellido, correo electrónico y contraseña
```

**Paso 3: Verificar que las claves se crearon**
```bash
gpg --list-keys
```

### 📝 Pasos del Reto

**Paso 4: Importar la clave pública de Jorge directamente**
```bash
# Crear un archivo con la clave pública
cat > jorge_clave_publica.asc << 'EOF'
-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: GPGTools - https://gpgtools.org

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
=hMXW
-----END PGP PUBLIC KEY BLOCK-----
EOF

# Importar la clave desde el archivo
gpg --import jorge_clave_publica.asc
```

**Paso 5: Crear tu archivo de reflexión**
```bash
echo "Lo que me llevo de esta sesión..." > reto-minombre.txt
```

**Paso 6: Cifrar el archivo**
```bash
gpg --output reto-minombre.gpg --encrypt --recipient jorgebenitezlopez@gmail.com reto-minombre.txt
```

### 🔧 Comandos Adicionales Útiles

**Exportar tu clave pública para compartirla:**
```bash
gpg --export -a "TuNombre" > clave_publica.asc
```

**Cifrar archivo para ti mismo:**
```bash
gpg --output archivo_cifrado.gpg --encrypt --recipient TuCorreo archivo.txt
```

**Descifrar archivo:**
```bash
gpg -d archivo_cifrado.gpg
```

> [!TIP]
> 🎯 ¿Por qué es importante usar la clave pública correcta del destinatario al cifrar un archivo?
> - 🔵 Para que el archivo se cifre más rápido
> - 🔴 Para que solo el destinatario correcto pueda descifrarlo
> - 🟢 Para que el archivo sea más pequeño
> - 🟡 Para que el archivo se pueda abrir en cualquier sistema
<br>
<br>
<br>
<br>

## 5. Información Adicional

### 🔄 Diferencias entre GPG y OpenSSL

**GPG (GNU Privacy Guard):**
- Usa formato PGP (Pretty Good Privacy) basado en OpenPGP
- Principalmente para cifrar archivos y correos electrónicos
- Herramienta de usuario a usuario

**OpenSSL:**
- Usa claves en formato PEM basadas en estándares PKCS#1, PKCS#8, o X.509
- Principalmente para SSL/TLS, certificados digitales y firmas criptográficas
- Más estándar para certificados y comunicación SSL/TLS

### 🔧 Conversión entre Formatos

```bash
# Convertir clave GPG a formato PEM
gpg --dearmor < clave_privada.asc > clave_privada.gpg
openssl rsa -in clave_privada.gpg -out clave_privada.pem

# Generar claves directamente con OpenSSL
openssl genpkey -algorithm RSA -out clave_privada.pem -aes256
openssl rsa -in clave_privada.pem -pubout -out clave_publica.pem
```

### 📚 Recursos Adicionales

*   **Certificados digitales:** [FNMT](https://www.fnmt.es/)
*   **GnuPG:** [gnupg.org](https://gnupg.org/)
*   **OpenSSL:** [openssl.org](https://www.openssl.org/)
*   **Historia de Enigma:** [Wikipedia](https://es.wikipedia.org/wiki/Enigma_(máquina))
*   **JWT Debugger:** [jwt.io](https://www.jwt.io/)

## Conclusión

El uso de criptografía con claves pública y privada, junto con certificados digitales y funciones hash, es fundamental para la seguridad digital moderna. Comprender estos conceptos y saber utilizar herramientas como GPG, SSH y HTTPS nos permite proteger nuestra información y garantizar su autenticidad en un mundo cada vez más conectado.

La seguridad no es un producto, sino un proceso continuo que requiere comprensión de los fundamentos y práctica constante con las herramientas disponibles.
