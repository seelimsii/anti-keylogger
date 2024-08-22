// Inject the keyboard HTML into the page
fetch(chrome.runtime.getURL('keyboard.html'))
  .then(response => response.text())
  .then(data => {
    const div = document.createElement('div');
    div.id = 'customKeyboard';
    div.innerHTML = data;
    document.body.appendChild(div);
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('script.js');
    document.body.appendChild(script);
  });

// Function to focus on input field when clicking the custom keyboard
document.addEventListener('click', (event) => {
  const inputField = document.activeElement;
  if (event.target.classList.contains('key')) {
    const keyPressed = event.target.textContent.trim();
    if (inputField && (inputField.tagName === 'INPUT' || inputField.tagName === 'TEXTAREA')) {
      if (keyPressed === 'Backspace') {
        inputField.value = inputField.value.slice(0, -1);
      } else if (keyPressed === 'Space') {
        inputField.value += ' ';
      } else {
        inputField.value += keyPressed;
      }
    }
  }
});
