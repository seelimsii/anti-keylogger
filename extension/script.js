var shift = false;
var capsLock = false;

const row1Keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'];
const row2Keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const row3Keys = ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const row4Keys = ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Space'];

const keyboard = document.getElementById('keyboard');
var focusedElement = null;
document.addEventListener('focusin', function(event) {
    focusedElement = event.target;
    if (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA') {
        console.log('Focused element:', focusedElement);
    }
    renderKeyboard(focusedElement);
});

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
    inputField.foc
    return row;
}

var inputField = null;
// Function to render the entire keyboard
function renderKeyboard(elem) {
    inputField = elem;
    keyboard.innerHTML = '';
    keyboard.appendChild(createRow(row1Keys, 'row1'));
    keyboard.appendChild(createRow(row2Keys, 'row2'));
    keyboard.appendChild(createRow(row3Keys, 'row3'));
    keyboard.appendChild(createRow(row4Keys, 'row4'));
    inputField.focus();
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
    renderKeyboard(focusedElement); // Shuffle keys after each press
}

