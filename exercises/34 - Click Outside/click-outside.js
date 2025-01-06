const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

function handleButton(event) {
  const button = event.currentTarget;
  const card = button.closest('.card');
  // Grab the image source
  const imgSource = card.querySelector('img').src;
  const desc = card.dataset.description;
  const name = card.querySelector('h2').textContent;
  // Populate the modal with new info
  modalInner.innerHTML = `
    <img width=600 height=600 src="${imgSource.replace('200', '600')}" alt="${name}" />
    <p>${desc}</p>
  `;
  // Show the modal
  modalOuter.classList.add('open');
}

function closeModal() {
  modalOuter.classList.remove('open');
}

cardButtons.forEach((button) => button.addEventListener('click', handleButton));

modalOuter.addEventListener('click', (event) => {
  const isOutside = !event.target.closest('.modal-inner');
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
