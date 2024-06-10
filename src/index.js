import './pages/index.css';
import { createCardElement } from './scripts/card';
import { openModal, closeModal, closeModalOnOverlay } from './scripts/modal';
import { clearValidation, enableValidation } from './scripts/validation';
import {
  addNewCard,
  deleteCardRequest,
  dislike,
  getInitialCards,
  getUser,
  like,
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
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const deleteCard = (evt, cardId) => {
  const card = evt.target.closest('.places__item.card');
  card.remove();

  deleteCardRequest(cardId);
};

const likeCard = (e, cardData, cardLikeCount) => {
  if (e.target.classList.contains('card__like-button_is-active')) {
    e.target.classList.remove('card__like-button_is-active');
    dislike(cardData._id);
  } else {
    e.target.classList.add('card__like-button_is-active');
    like(cardData._id);
  }
  cardLikeCount.textContent = cardData.likes.length || '';
};

Promise.all([getUser(), getInitialCards()])
  .then(([userData, initialCards]) => {
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
          userData._id
        )
      );
    });
  })
  .catch((err) => console.log(err));

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

const addCardForm = document.forms['new-place'];
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

const popup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

function showImagePopup(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;

  popupImageCaption.textContent = cardImage.dataset.imageCaption;

  openModal(popup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  updateUser(nameInput.value, jobInput.value).catch((err) => console.log(err));
  closeModal(editProfilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  Promise.all([getUser(), addNewCard(newCardData)])
    .then(([userData, newCardData]) => {
      placesList.prepend(
        createCardElement(
          cardTemplate,
          newCardData,
          showImagePopup,
          deleteCard,
          likeCard,
          userData._id
        )
      );

      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(addCardPopup);
    })
    .catch((err) => console.log(err));
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleCardFormSubmit);

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
