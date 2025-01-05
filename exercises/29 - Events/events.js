// const butts = document.querySelector('.butts');

// function handleClick() {
//   console.log('IT GOT CLICKED!!');
// }

// butts.addEventListener('click', handleClick);

const buyButtons = document.querySelectorAll('button.buy');

function handleBuyButtonClick(event) {
  console.log(event.target);
  console.log(event.currentTarget);
}

buyButtons.forEach((buyButton) => {
  buyButton.addEventListener('click', handleBuyButtonClick);
});
