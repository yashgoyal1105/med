# encryption_utils.py

from Crypto.Cipher import Blowfish # type: ignore
from Crypto.Random import get_random_bytes # type: ignore
import base64

BS = Blowfish.block_size

def pad(text):
    padding_len = BS - len(text) % BS
    return text + (chr(padding_len) * padding_len)

def unpad(text):
    return text[:-ord(text[-1])]

def encrypt_blowfish(plain_text, key):
    key = key.encode("utf-8")[:56] 
    cipher = Blowfish.new(key, Blowfish.MODE_CBC)
    iv = cipher.iv
    padded_text = pad(plain_text)
    encrypted = cipher.encrypt(padded_text.encode('utf-8'))
    return base64.b64encode(iv + encrypted).decode('utf-8')

def decrypt_blowfish(encrypted_text, key):
    key = key.encode("utf-8")[:56]
    encrypted_data = base64.b64decode(encrypted_text)
    iv = encrypted_data[:BS]
    cipher = Blowfish.new(key, Blowfish.MODE_CBC, iv)
    decrypted = cipher.decrypt(encrypted_data[BS:]).decode('utf-8')
    return unpad(decrypted)


if __name__ == "__main__":
    secret_key = "supersecretkey"
    message = "Sensitive Medical Info"

    encrypted = encrypt_blowfish(message, secret_key)
    print("Encrypted:", encrypted)

    decrypted = decrypt_blowfish(encrypted, secret_key)
    print("Decrypted:", decrypted)
