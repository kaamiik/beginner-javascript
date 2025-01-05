// Make a div
const wrapper = document.createElement('div');
// add a class of wrapper to it
wrapper.classList.add('wrapper');
// put it into the body
document.body.append(wrapper);
// make an unordered list
const list = document.createElement('ul');
// add three list items with the words "one, two, three" in them
// put that list into the above wrapper
const liTwo = document.createElement('li');
liTwo.textContent = 'two';
list.append(liTwo);

const liOne = liTwo.cloneNode(true);
liOne.textContent = 'one';
list.insertAdjacentElement('afterbegin', liOne);

const liThree = liTwo.cloneNode(true);
liThree.textContent = 'three';
list.insertAdjacentElement('beforeend', liThree);

wrapper.append(list);

// create an image
const image = document.createElement('img');

// set the source to an image
// set the width to 250
// add a class of cute
// add an alt of Cute Puppy
// Append that image to the wrapper
image.setAttribute('src', '../../raspopova-marina-vD2yoP8_8ZY-unsplash.jpg');
image.setAttribute('width', '250');
image.classList.add('cute');
image.setAttribute('alt', 'cute poppy');
wrapper.append(image);

// with HTML string, make a div, with two paragraphs inside of it
// put this div before the unordered list from above
const paragraphDiv = `
  <div class="my-div">
    <p>Paragraph One</p>
    <p>Paragraph Two</p>
  </div>
`;

wrapper.insertAdjacentHTML('afterbegin', paragraphDiv);
// add a class to the second paragraph called warning
// remove the first paragraph
const myDiv = wrapper.querySelector('.my-div');
const paragraphs = myDiv.querySelectorAll('p');
paragraphs[1].classList.add('warning');
paragraphs[0].remove();

// lastParagraph.classList.add('warning');
// create a function called generatePlayerCard that takes in three arguments: name, age, and height
function generatePlayerCard(name, age, height) {
  const html = `
    <div class="playerCard">
      <h2>${name} — ${age}</h2>
      <p>They are ${height} and ${age} years old. In Dog years this person would be ${age * 7}. That would be a tall dog!</p>
      <button class="delete" type="button">&times; Delete</button>
    </div>
  `;

  return html;
}
// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>

// make a new div with a class of cards
const cards = document.createElement('div');
cards.classList.add('cards');
// make 4 player cards using generatePlayerCard
let cardsHtml = generatePlayerCard('snicker', 3, 10);
cardsHtml += generatePlayerCard('lucy', 4, 12);
cardsHtml += generatePlayerCard('esi', 6, 8);
cardsHtml += generatePlayerCard('kait', 1, 15);

// append those cards to the div
// put the div into the DOM just before the wrapper element
cards.innerHTML = cardsHtml;
wrapper.insertAdjacentElement('beforebegin', cards);
// Bonus, put a delete Button on each card so when you click it, the whole card is removed

// select all the buttons!
// make out delete function
// loop over them and attach a listener
const buttons = document.querySelectorAll('.delete');
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const targetButton = event.currentTarget;
    targetButton.closest('.playerCard').remove();
  });
});
