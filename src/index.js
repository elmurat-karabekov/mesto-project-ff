import './pages/index.css';
import { initialCards } from "./scripts/cards";
import { createCardElement, deleteCard, likeCard } from './scripts/card';
import { openModal, closeModal, closeModalOnOverlay } from './scripts/modal';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const pagePopups = document.querySelectorAll('.popup');

const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardForm = document.forms['new-place'];
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

const popup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

function showImagePopup(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;

  popupImageCaption.textContent = cardImage.dataset.imageCaption;

  openModal(popup);
}

initialCards.forEach((card) =>
  placesList.append(createCardElement(cardTemplate, card, showImagePopup, deleteCard, likeCard))
);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }

  placesList.prepend((createCardElement(cardTemplate, newCardData, showImagePopup, deleteCard, likeCard)))

  addCardForm.reset();
  closeModal(addCardPopup)
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleCardFormSubmit)

editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  openModal(addCardPopup);
});

pagePopups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  })

  popup.addEventListener('click', closeModalOnOverlay);
});
