import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name=message]'),
};

let formList = {};

refs.form.addEventListener('input', throttle(ontextAreaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);
populateTextarea();

////

function ontextAreaInput(e) {
  formList[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formList));
}

//////

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formList);
  formList = {};

  refs.form.reset();

  localStorage.clear();
  localStorage.removeItem(STORAGE_KEY);
}

///

function populateTextarea() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData !== null) {
    formList = savedData;
    refs.email.value = savedData.email;
    refs.message.value = savedData.message;
  } else {
    refs.email.value = '';
    refs.message.value = '';
  }
}
