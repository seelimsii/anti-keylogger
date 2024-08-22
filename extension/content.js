// Inject the keyboard HTML into the page
fetch(chrome.runtime.getURL('keyboard.html'))
  .then(response => response.text())
  .then(data => {
    const div = document.createElement('div');
    div.id = 'customKeyboard';
    div.innerHTML = data;
    div.style.position = 'absolute';
    document.body.appendChild(div);
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('script.js');
    document.body.appendChild(script);
  });

