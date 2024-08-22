let shift = false;
let capsLock = false;

const row1Keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'];
const row2Keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const row3Keys = ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const row4Keys = ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Space'];

const keyboard = document.getElementById('keyboard');
const inputField = document.getElementById('inputField');

// Function to shuffle an array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Function to create a row of keys
function createRow(keys, rowClassName) {
    const row = document.createElement('div');
    row.className = rowClassName;
    shuffleArray(keys).forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = 'key';
        keyElement.textContent = key;
        
        if (key === 'Backspace') {
            keyElement.classList.add('special');
        } else if (key === 'CapsLock' || key === 'Shift') {
            keyElement.classList.add('special');
        } else if (key === 'Space') {
            keyElement.classList.add('space');
        }
        
        keyElement.addEventListener('click', () => {
            handleKeyPress(key);
        });
        
        row.appendChild(keyElement);
    });
    return row;
}

// Function to render the entire keyboard
function renderKeyboard() {
    keyboard.innerHTML = '';
    keyboard.appendChild(createRow(row1Keys, 'row1'));
    keyboard.appendChild(createRow(row2Keys, 'row2'));
    keyboard.appendChild(createRow(row3Keys, 'row3'));
    keyboard.appendChild(createRow(row4Keys, 'row4'));
}

// Function to handle key presses
function handleKeyPress(key) {
    if (key === 'Backspace') {
        inputField.value = inputField.value.slice(0, -1);
    } else if (key === 'CapsLock') {
        capsLock = !capsLock;
    } else if (key === 'Shift') {
        shift = !shift;
    } else if (key === 'Space') {
        inputField.value += ' ';
    } else {
        let character = key;
        
        if (shift) {
            character = character.toUpperCase();
            shift = false; // Reset shift after one key press
        } else if (capsLock) {
            character = character.toUpperCase();
        } else {
            character = character.toLowerCase();
        }
        
        inputField.value += character;
    }
    renderKeyboard(); // Shuffle keys after each press
}

// Initialize the keyboard with shuffled keys
renderKeyboard();

// document.addEventListener('DOMContentLoaded', () => {
//     const inputBoxes = document.querySelectorAll('.input-field');
//     const keyboard = document.getElementById('soft-keyboard');
//     const inputField = document.getElementById('inputField');
//     const keys = document.querySelectorAll('.key');

//     inputBoxes.forEach(input => {
//         input.addEventListener('focus', () => {
//             // Show the keyboard when an input box is focused
//             keyboard.style.display = 'grid';

//             // Position the keyboard
//             // const rect = input.getBoundingClientRect();
//             // keyboard.style.top = `${rect.bottom + window.scrollY + 10}px`;
//             // keyboard.style.left = `${rect.left + window.scrollX}px`;
//         });
        

//         // input.addEventListener('blur', () => {
//         //     // Hide the keyboard when the input box loses focus
//         //     setTimeout(() => {
//         //         keyboard.style.display = 'none';
//         //     }, 200); // Delay hiding to allow click event on keys
//         // });
//     });
//     keys.forEach(key => {
//         key.addEventListener('click', function() {
//             const keyValue = key.dataset.key;
//             if (keyValue === ' ') {
//                 inputField.value += ' ';
//             } else if (key.id === 'backspace') {
//                 inputField.value = inputField.value.slice(0, -1);
//             } else {
//                 inputField.value += keyValue;
//             }
//         });
//     });

//     // document.querySelectorAll('.key').forEach(key => {
//     //     key.addEventListener('click', () => {
//     //         // Get the focused input box
//     //         const focusedInput = document.querySelector('.input-box:focus');
//     //         if (focusedInput) {
//     //             // Insert the key's value into the input box
//     //             const start = focusedInput.selectionStart;
//     //             const end = focusedInput.selectionEnd;
//     //             const value = focusedInput.value;
//     //             const textToInsert = key.textContent;
//     //             focusedInput.value = value.slice(0, start) + textToInsert + value.slice(end);
//     //             focusedInput.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
//     //             focusedInput.focus();
//     //         }
//     //     });
//     // });
// });
