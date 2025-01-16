import { isValidColor } from './colors';

function logWords(results) {
  console.log(results[results.length - 1][0].transcript);
}

export function handleResult({ results }) {
  // logWords(results);
  const words = results[results.length - 1][0].transcript;
  // lowercase everything
  let color = words.toLowerCase();
  // Strip any space
  color = color.replace(/\s/g, '');
  // check if it is a valid color
  if (!isValidColor(color)) return;
  // If it is, then show the ui for that
  const colorSpan = document.querySelector(`.${color}`);
  colorSpan.classList.add('got');
  document.body.style.backgroundColor = color;
  console.log(colorSpan);
  console.log('This is a valid color');
  console.log(color);
}
