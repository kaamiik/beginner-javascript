import { handleResult } from './handlers';
import { colorsByLength, isDark } from './colors';

const colorsEl = document.querySelector('.colors');

function displayColors(colors) {
  return colors
    .map(
      (color) =>
        `<span class="color ${color} ${isDark(color) ? 'dark' : ''}" style="background: ${color}">${color}</span>`,
    )
    .join('');
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
/* eslint-disable */
  function start() {
  // See if the browser supports
  if (!('SpeechRecognition' in window)) {
    console.log('Sorry, speech recognition not supported');
    return;
  }
  // It does work
  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Do not stop listening
  recognition.interimResults = true; // Tell the results when specaking
  recognition.onresult = handleResult;
  recognition.start();
}
/* eslint-enable */

start();
colorsEl.innerHTML = displayColors(colorsByLength);
