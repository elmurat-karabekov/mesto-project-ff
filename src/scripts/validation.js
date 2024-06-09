function checkInputValidity(form, input, config) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  const errorElement = form.querySelector(`.${input.id}-error`);

  if (!input.validity.valid) {
    showInputError(input, input.validationMessage, errorElement, config);
  } else {
    hideInputError(input, errorElement, config);
  }
}

function showInputError(input, errorMessage, errorElement, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(inputs, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputs)) {
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => !input.validity.valid);
}

export function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    const inputs = Array.from(form.querySelectorAll(inputSelector));

    const submitButton = form.querySelector(submitButtonSelector);

    toggleButtonState(inputs, submitButton, inactiveButtonClass);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, { inputErrorClass, errorClass });

        toggleButtonState(inputs, submitButton, inactiveButtonClass);
      });
    });
  });
}

export function clearValidation(
  form,
  {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));

  const submitButton = form.querySelector(submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    checkInputValidity(form, input, { inputErrorClass, errorClass });
    hideInputError(input, errorElement, { inputErrorClass, errorClass });
  });
  toggleButtonState(inputs, submitButton, inactiveButtonClass);
}
