export function createCardElement(cardTemplate, cardData, deleteCard) {
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

export function deleteCard(evt) {
  const card = evt.target.closest('.places__item.card');

  card.remove();
}

export function like() {

}
