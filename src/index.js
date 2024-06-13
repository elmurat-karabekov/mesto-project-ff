import './pages/index.css';
import { createCardElement } from './scripts/card';
import { openModal, closeModal, closeModalOnOverlay } from './scripts/modal';
import { clearValidation, enableValidation } from './scripts/validation';
import {
  addNewCard,
  deleteCard,
  dislike,
  getInitialCards,
  getUser,
  like,
  updateProfileImage,
  updateUser,
} from './scripts/api';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const pagePopups = document.querySelectorAll('.popup');

const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector(
  '.popup__input_type_description'
);

const profileImage = document.querySelector('.profile__image');
const updateProfileImagePopup = document.querySelector(
  '.popup_type_update-avatar'
);
const updateProfileImageForm = document.forms['update-avatar'];
const newProfileImageInput = updateProfileImageForm.querySelector(
  '.popup__input_type_avatar-url'
);
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardForm = document.forms['new-place'];
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

const popup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const likeCard = (e, cardId) => {
  return e.target.classList.contains('card__like-button_is-active')
    ? dislike(cardId)
    : like(cardId);
};

const showImagePopup = (cardImage) => {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;

  popupImageCaption.textContent = cardImage.dataset.imageCaption;

  openModal(popup);
};

let userId;

// initial loading of user, card datas
Promise.all([getUser(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;

    initialCards.forEach((card) => {
      placesList.append(
        createCardElement(
          cardTemplate,
          card,
          showImagePopup,
          deleteCard,
          likeCard,
          userId
        )
      );
    });
  })
  .catch((err) => console.log(err));

// Handlign of all page forms
const handleProfileImageFromSubmit = (e) => {
  e.preventDefault();

  const submitButton = updateProfileImageForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  updateProfileImage(newProfileImageInput.value)
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      updateProfileImageForm.reset();
      clearValidation(updateProfileImageForm, validationConfig);
      closeModal(updateProfileImagePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => (submitButton.textContent = 'Сохранить'));
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = editProfileForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  updateUser(nameInput.value, jobInput.value)
    .then((user) => {
      profileName.textContent = user.name;
      profileDescription.textContent = user.about;
      closeModal(editProfilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => (submitButton.textContent = 'Сохранить'));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const submitButton = addCardForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  addNewCard(newCardData)
    .then((card) => {
      placesList.prepend(
        createCardElement(
          cardTemplate,
          card,
          showImagePopup,
          deleteCard,
          likeCard,
          userId
        )
      );

      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(addCardPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
}

updateProfileImageForm.addEventListener('submit', handleProfileImageFromSubmit);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleCardFormSubmit);

/** Opening/closing page popups */
profileImage.addEventListener('click', (e) => {
  openModal(updateProfileImagePopup);
});

editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(editProfileForm, validationConfig);
  openModal(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  openModal(addCardPopup);
});

pagePopups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });

  popup.addEventListener('mousedown', closeModalOnOverlay);
});

/** Enable Validation for all forms */
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);
