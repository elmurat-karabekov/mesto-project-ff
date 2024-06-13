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

  const cardId = cardData._id;

  cardImage.src = cardData.link;
  cardImage.alt = `Фотография из коллекции пейзажных фотографии. На фото ${cardData.name}`;
  cardImage.dataset.imageCaption = cardData.name;

  cardTitle.textContent = cardData.name;
  cardLikeCount.textContent = cardData.likes.length || '';

  if (cardData.likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => {
    showImagePopup(cardImage);
  });

  if (cardData.owner._id !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener('click', (e) => {
      deleteCard(cardId)
        .then(() => {
          const card = evt.target.closest('.places__item.card');
          card.remove();
        })
        .catch((err) => console.log(err));
    });
  }

  cardLikeButton.addEventListener('click', (e) => {
    likeCard(e, cardId)
      .then((card) => {
        e.target.classList.toggle('card__like-button_is-active');
        cardLikeCount.textContent = card.likes.length || '';
      })
      .catch((err) => console.log(err));
  });

  return cardElement;
}
