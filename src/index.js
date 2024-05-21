import './pages/index.css';
import { initialCards } from "./scripts/cards";
import { createCardElement, deleteCard } from './scripts/card';

// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

initialCards.forEach((card) =>
  placesList.append(createCardElement(cardTemplate, card, deleteCard))
);
