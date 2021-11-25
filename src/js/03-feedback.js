import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name=message]'),
};

let formList = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(ontextAreaInput, 500));

populateTextarea();

////
function ontextAreaInput(e) {
  formList[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formList));
}
//////
function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(formList);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
///////
function populateTextarea() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    formList = savedData;
    refs.email.value = savedData.email || '';
    refs.message.value = savedData.message || '';
  }
}
