const signupForm = document.querySelector('[name="signup"]');

signupForm.addEventListener('submit', (event) => {
  console.log(event.currentTarget);
  event.preventDefault();
});
