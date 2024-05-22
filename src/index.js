import './pages/index.css';
import { initialCards } from "./scripts/cards";
import { createCardElement, deleteCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal';

// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const pagePopups = document.querySelectorAll('.popup');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

initialCards.forEach((card) =>
  placesList.append(createCardElement(cardTemplate, card, deleteCard))
);

editProfileBtn.addEventListener('click', () => {
  openModal(editProfilePopup);
})

addCardButton.addEventListener('click', () => {
  openModal(addCardPopup);
})

pagePopups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  })
})

