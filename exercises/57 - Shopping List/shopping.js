const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// we need an array state to hold our items
let items = [];

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  // If It's empty, Don't submit it.
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  // push the items into our state
  items.push(item);
  console.log(
    `There are now ${items.length} item${items.length === 0 || items.length === 1 ? '' : 's'} in your state`,
  );
  // clear the form
  // e.currentTarget.item.value = '';
  e.target.reset();
  // fire off a custom event that will tell anyone else who cares that the items have been updated.
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  const html = items
    .map(
      (item) => `<li class="shopping-item">
      <input type="checkbox" value="${item.id}" ${item.complete && 'checked'} />
      <span class="itemName">${item.name}</span>
      <button value="${item.id}" aria-label="remove ${item.name}">&times;</button>
  </li>`,
    )
    .join('');
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  // pull the items from local storage
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems) {
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  // update our items array without this one
  items = items.filter((item) => item.id !== id);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
// Event delegation. we listen for the click on the <ul> but then delegate the click to the button if that was clicked.
list.addEventListener('click', (e) => {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) {
    deleteItem(id);
  }

  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();
