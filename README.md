![cifradoasimetrico](https://jorgebenitezlopez.com/tiddlywiki/pro/portadaciberseguridad.jpg)

# Bases de Seguridad en la Web

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
5. [Información Adicional](#6-información-adicional)

---

## Introducción

En este documento aprenderemos los conceptos fundamentales de criptografía y cómo se aplican en el mundo real para garantizar la seguridad digital. Comprenderemos la diferencia entre cifrado simétrico y asimétrico, funciones hash, y sus aplicaciones prácticas.

> [!TIP]
> 🎯 ¿Cuál es el objetivo principal de la criptografía en seguridad digital?
> - 🔵 Hacer que los datos sean más rápidos de procesar
> - 🔴 Proteger la confidencialidad, integridad y autenticidad de la información
> - 🟢 Reducir el tamaño de los archivos
> - 🟡 Hacer que los datos sean más fáciles de compartir

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

**⚠️ Importante:** HTTPS no garantiza seguridad total por sí solo. El contenido puede seguir siendo vulnerable a otros ataques como phishing, donde puedes estar enviando información cifrada a un sitio falso que imita al legítimo.

> [!TIP]
> 🔒 ¿Qué garantiza HTTPS en una comunicación web?
> - 🔵 Que el sitio web es completamente seguro contra todos los ataques
> - 🔴 Que la comunicación entre cliente y servidor está cifrada
> - 🟢 Que el servidor nunca puede ser hackeado
> - 🟡 Que el usuario es anónimo

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

**Paso 4: Importar la clave pública de Jorge**
```bash
gpg --keyserver hkps://keys.openpgp.org --recv-keys 85884EA092F85E44
```

**Paso 5: Crear tu archivo de reflexión**
```bash
echo "Lo que me llevo de esta sesión..." > reto-minombre.txt
```

**Paso 6: Cifrar el archivo**
```bash
gpg --output reto-minombre.gpg --encrypt --recipient jorgebenitezlopez@gmail.com reto-minombre.txt
```

**Paso 7: Enviar el archivo cifrado** a Jorge para que lo descifre 🔓

### 🌐 Alternativa: Usar Clave Pública Directa

Si tienes problemas con el servidor de claves, puedes usar esta clave pública de Jorge:

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: GPGTools - https://gpgtools.org

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
S8w1
=35b5
-----END PGP PUBLIC KEY BLOCK-----
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




## 6. Información Adicional

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
