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

  cardDeleteButton.addEventListener('click', (e) => {
    deleteCard(e, cardData._id);
  });

  if (cardData.likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardLikeButton.addEventListener('click', (e) => {
    likeCard(e, cardData, cardLikeCount);
  });
  cardLikeCount.textContent = cardData.likes.length || '';

  return cardElement;
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
