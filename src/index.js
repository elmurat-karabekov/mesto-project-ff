import './pages/index.css';
import { initialCards } from "./scripts/cards";

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCardElement(cardData, deleteCard) {
  const cardElement = cardTemplate
    .querySelector('.places__item.card')
    .cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = `Фотография из коллекции пейзажных фотографии. На фото ${cardData.name}`;

  cardTitle.textContent = cardData.name;

  cardDeleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const card = evt.target.closest('.places__item.card');

  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) =>
  placesList.append(createCardElement(card, deleteCard))
);
