import tkinter as tk
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from os import urandom
import base64
import time
import keyboard
import pygetwindow as gw
from pywinauto.application import Application

# Password and salt for encryption
password = b'secure_password'  # Replace with your password
salt = urandom(16)
kdf = PBKDF2HMAC(
    algorithm=hashes.SHA256(),
    length=32,
    salt=salt,
    iterations=100000,
    backend=default_backend()
)
key = kdf.derive(password)

# AES encryption function
def encrypt_data(data):
    iv = urandom(16)  # Random initialization vector
    cipher = Cipher(algorithms.AES(key), modes.CFB(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    encrypted_data = encryptor.update(data.encode()) + encryptor.finalize()
    return base64.b64encode(iv + encrypted_data).decode()

# AES decryption function
def decrypt_data(encrypted_data):
    decoded_data = base64.b64decode(encrypted_data.encode())
    iv = decoded_data[:16]  # Extract the initialization vector
    encrypted_message = decoded_data[16:]  # Extract the encrypted message
    cipher = Cipher(algorithms.AES(key), modes.CFB(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(encrypted_message) + decryptor.finalize()
    return decrypted_data.decode()

# Bring Notepad to focus
def bring_notepad_to_focus():
    # Find all open windows with "Notepad" in their title
    all_windows = gw.getWindowsWithTitle('')
    
    # Focus on Google Chrome or Notepad based on the window title
    chrome_windows = [win for win in all_windows if 'chrome' in win.title.lower()]
    notepad_windows = [win for win in all_windows if 'notepad' in win.title.lower()]
    whats = [win for win in all_windows if 'WhatsApp' in win.title.lower()]
    
    # Try focusing on Google Chrome 
    if chrome_windows:
        chrome_window = chrome_windows[0]
        chrome_window.activate()  # Bring Chrome to focus
    # Try focusing on Notepad
    elif notepad_windows:
        notepad_window = notepad_windows[0]
        notepad_window.activate()  # Bring Notepad to focus
    else:
        print("Neither Google Chrome nor Notepad is open. Keystrokes will not be sent.")
        return False
    return True

# Tkinter Virtual Keyboard
def create_virtual_keyboard():
    shift_pressed = False  # Track shift key status

    def on_key_press(key):
        nonlocal shift_pressed
        
        # Handle capital letters and shift
        if key == 'Shift':
            shift_pressed = not shift_pressed
            return

        # If shift is pressed, make key uppercase
        if shift_pressed and key.isalpha():
            key = key.upper()
            shift_pressed = False  # Release shift after key press

        # Encrypt the key
        encrypted_key = encrypt_data(key)
        
        # Decrypt the key to display plaintext
        decrypted_key = decrypt_data(encrypted_key)
        
        # Log both encrypted and decrypted keys
        output.insert(tk.END, f"Encrypted: {decrypted_key}\n")
        print(f"Encrypted keystroke: {encrypted_key}, Decrypted keystroke: {decrypted_key}")
        # Bring Notepad to focus before typing
        if not bring_notepad_to_focus():
            return  
        
        # Send the plaintext key to Notepad
        if key == 'Space':
            keyboard.write(' ')  # Write a space character
        else:
            keyboard.write(key)  # Write the actual key

        # Save the encrypted keystroke to a log file (optional)
        with open("keystrokes.log", "a") as f:
            f.write(f"Encrypted: {encrypted_key}, Decrypted: {decrypted_key}\n")

        # Slight delay to ensure input is logged sequentially
        time.sleep(0.1)

    root = tk.Tk()
    root.title("Secure Virtual Keyboard")
    root.attributes('-topmost', True)

    # Display encrypted output
    output = tk.Text(root, height=10, width=50)
    output.pack()

    # Create keyboard buttons
    keyboard_frame = tk.Frame(root)
    keyboard_frame.pack()

    # Define the keyboard layout
    keys = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '$', '%', '^'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '&', '*', '(', ')', '_', '+'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '{', '}', ':', '"'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', ';', ':', '-', 'Shift'],
        ['Space']
    ]

    for row in keys:
        row_frame = tk.Frame(keyboard_frame)
        row_frame.pack()
        for key in row:
            button = tk.Button(
                row_frame, text=key, width=5, height=2,
                command=lambda k=key: on_key_press(' ' if k == 'Space' else k)
            )
            button.pack(side='left', padx=5, pady=5)

    root.mainloop()

if __name__ == "__main__":
    create_virtual_keyboard()
