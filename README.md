![cifradoasimetrico](https://jorgebenitezlopez.com/tiddlywiki/pro/portadaciberseguridad.jpg)

# Guía sobre Clave Privada, Clave Pública y Certificados Digitales

## Introducción

En este documento, explicaremos conceptos clave relacionados con la criptografía, incluyendo las diferencias entre claves privadas y públicas, certificados digitales y cómo utilizarlos en la práctica.

## Clave Privada y Clave Pública

La criptografía asimétrica se basa en el uso de dos claves:

*   **Clave pública:** Puede compartirse libremente y se usa para cifrar datos o verificar firmas digitales.
*   **Clave privada:** Se mantiene en secreto y se usa para descifrar datos cifrados con la clave pública o para firmar digitalmente.

El uso conjunto de estas claves permite garantizar la seguridad y autenticidad de la información.

A diferencia de una contraseña, la clave privada nunca se transmite, lo que la hace mucho más segura. Nadie puede interceptarla ni obtenerla de forma remota. ¡Descifrar Enigma es una película fascinante que ilustra muy bien los desafíos de la criptografía!

| Característica | Clave Pública/Privada | Contraseña |
| :------------ | :------------------ | :--------- |
| Seguridad      | Alta                | Depende de la complejidad y de que la puedan interceptar |
| Intercambio seguro | Sí                  | No         |
| Usabilidad     | Requiere software especializado | Fácil      |

![cifradoasimetrico](https://jorgebenitezlopez.com/tiddlywiki/pro/cifradoasimetrico.jpg)

## Certificado Digital

Un certificado digital es un documento electrónico que asocia una clave pública con una identidad específica. Lo emite una Autoridad de Certificación (CA) y contiene:

*   La clave pública del usuario.
*   Datos identificativos del propietario.
*   Firma digital de la CA que garantiza la autenticidad del certificado.

Elementos

* 🔐 Secreto: La **criptografía asimétrica**, con su par de claves (**pública y privada**), es fundamental para garantizar el **secreto**.   

* 🚫 No repudio: La **criptografía asimétrica** también permite el **no repudio** (Se refiere a que una persona no puede negar haber realizado una acción, como firmar un documento o enviar un mensaje).

* ✅ Integridad: Las **funciones hash** son esenciales para garantizar la **integridad**. https://emn178.github.io/online-tools/sha256.html  

* 🏛 No repudio: Las **autoridades identificadoras**, como las **Autoridades de Certificación (CA)**, juegan un papel crucial en el **no repudio**. 

## Ejemplo de cifrado con GnuPG:

    gpg -c archivo.txt  # Cifra el archivo con una contraseña

## Cómo podemos hacerlo

### Instalación y uso de GnuPG (GPG)

GnuPG es una herramienta de cifrado y firma digital de código abierto.

**Instalar GPG:**

*   En Linux/Mac: `sudo apt install gnupg` o `brew install gnupg`
*   En Windows: Descargar desde la página oficial

**Generar claves:**

    gpg --gen-key

Este comando genera un par de claves (pública y privada). (Si es la primera vez que lo utilizas, te pedirá configurar nombre, apellido, correo electrónico y contraseña)

**Exportar clave pública:** (se guarda en la carpeta raíz de tu ordenador)

    gpg --export -a "TuNombre" > clave_publica.asc

**Exportar clave privada:** (se guarda en la carpeta raíz de tu ordenador)

    gpg --export-secret-key -a "TuNombre" > clave_privada.asc

**Cifrar y descifrar archivos:**

- Crea un archivo, ejemplo un texto.txt con un "hola" dentro.
- Ejecuta en la terminal el siguiente comando, para cifrar el archivo texto.txt:
```
gpg --output doc.gpg --encrypt --recipient TuCorreo Ruta/de/tu/archivo/texto.txt
```
  
- El comando anterior va a crear un archivo doc.gpg cifrado en la carpeta raíz de nuestro ordenador.

Si intentamos abrir ese archivo, por ejemplo con VSC no nos va a dejar ver el contenido porque está cifrado.

- Para descifrarlo necesitamos el siguiente comando en la terminal:
```
gpg -d Ruta/de/tu/archivo/doc.gpg
```
Esto nos debería mostrar el "hola" que teníamos dentro del texto.txt

## Más información

*   Certificados digitales: [FNMT](https://www.fnmt.es/)
*   GnuPG: [gnupg.org](https://gnupg.org/)
*   Historia de Enigma: [Wikipedia](https://es.wikipedia.org/wiki/Enigma_(máquina))

## Conclusión

El uso de criptografía con claves pública y privada, junto con certificados digitales, es fundamental para la seguridad digital. Aprender a utilizar herramientas como GPG nos permite proteger nuestra información y garantizar su autenticidad.

## Preguntas de control

¿Cómo garantiza la criptografía asimétrica el secreto en la comunicación entre dos partes?

* a) Mediante el uso de una única clave compartida entre ambos
* b) Cifrando el mensaje con la clave privada del remitente
* c) Cifrando el mensaje con la clave pública del destinatario
* d) Mediante el uso de una función hash

¿Cuál es el propósito de una función hash en criptografía?

* a) Cifrar un mensaje para que solo el destinatario lo descifre
* b) Garantizar la integridad de los datos detectando cualquier alteración
* c) Verificar la identidad del remitente mediante certificados digitales
* d) Generar una clave privada a partir de una clave pública

¿Cómo contribuyen las Autoridades de Certificación (CA) al no repudio en la comunicación digital?

* a) Firmando digitalmente los mensajes enviados por los usuarios
* b) Almacenando las claves privadas de los usuarios para garantizar autenticidad
* c) Emitiendo certificados digitales que vinculan una identidad con una clave pública
* d) Cifrando los mensajes para garantizar la confidencialidad

Preguntas: https://app.sli.do/event/tGWC1DSZAtsjE84bcBxZm6

## Misión 

Enviar un archivo cifrado donde escribas "qué te llevas" de esta sesión  con la cláve pública de Jorge Benítez para que solo él pueda descifrarlo

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: GPGTools - https://gpgtools.org

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
S8w1
=35b5
-----END PGP PUBLIC KEY BLOCK-----
```

## Ayuda 💡

- Primero debemos de crear un archivo para guardar la información de la llave de Jorge, podemos crearla desde VSC y llamarlo "clave_publica_jorge.asc" y guardarlo en la carpeta raíz (o donde se encuentren nuestros archivos de clave pública y privada).
- Ahora debemos importar la clave pública de Jorge en tu llavero GnuPG. En la terminal, ejecutamos el siguiente comando:
```
gpg --import clave_publica_jorge.asc
```

- Ahora verificamos que esté guardada y con que nombre:
```
gpg --list-keys
```
Aquí verás la clave de Jorge con su identificador.

- Ahora podemos crear un archivo "retro-minombre.txt" y para cifrarlo utilizas el siguiente comando:
```
gpg --output doc.gpg --encrypt --recipient jorge.benitez@factoriaf5.org Ruta/de/tu/archivo/reto-minombre.txt
```

Ahora envía el archivo doc.gpg que se creó en tu carpeta raíz 







