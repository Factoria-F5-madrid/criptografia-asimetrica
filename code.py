import hashlib

# Hash SHA-256
texto = "Hola mundo"
hash_sha256 = hashlib.sha256(texto.encode('utf-8')).hexdigest()
print(f"SHA-256: {hash_sha256}")