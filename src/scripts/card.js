export function createCardElement(
  cardTemplate,
  cardData,
  showImagePopup,
  deleteCard,
  likeCard,
  userId
) {
  const cardElement = cardTemplate
    .querySelector('.places__item.card')
    .cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  if (cardData.owner._id !== userId) {
    cardDeleteButton.remove();
  }

  cardImage.src = cardData.link;
  cardImage.alt = `Фотография из коллекции пейзажных фотографии. На фото ${cardData.name}`;
  cardImage.dataset.imageCaption = cardData.name;

  cardTitle.textContent = cardData.name;

  cardImage.addEventListener('click', () => {
    showImagePopup(cardImage);
  });
  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', likeCard);
  cardLikeCount.textContent = cardData.likes.length || '';

  return cardElement;
}

export function deleteCard(evt) {
  const card = evt.target.closest('.places__item.card');

  card.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
