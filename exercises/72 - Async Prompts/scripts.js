/* eslint-disable */
function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/* eslint-enable */
async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(1000);
  // Remove the popup entirely
  popup.remove();
}

function ask(options) {
  return new Promise(async (resolve) => {
    // First we need to create the popup with all the fields in it
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      ` <fieldset>
          <label>${options.title}</label>
          <input type="text" name="input" id="" />
          <button type="submit">Submit</button>
        </fieldset>
      `,
    );
    // Check if they want a cancel button.
    if (options.cancel) {
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      popup.firstElementChild.appendChild(skipButton);
      // TODO: Listen for a click for that cancel
      skipButton.addEventListener(
        'click',
        () => {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true },
      );
    }
    // Listen for the submit event on the inputs
    popup.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        resolve(e.currentTarget.input.value);
        // Remove it from the DOM entirely
        destroyPopup(popup);
      },
      { once: true },
    );
    // When someone does submit it, resolve the data that was in the input box!

    // Insert that popup into the dom
    document.body.appendChild(popup);
    // put a very small timeout befor we add the open class
    await wait(50);
    popup.classList.add('open');
  });
}

async function askQuestion(e) {
  const button = e.currentTarget;
  console.log(button.dataset.cancel === '');
  const answer = await ask({
    title: button.dataset.question,
    cancel: button.dataset.cancel === '',
  });
  console.log(answer);
}

// Select all buttons that have a question
const buttons = document.querySelectorAll('[data-question]');
buttons.forEach((button) => button.addEventListener('click', askQuestion));
