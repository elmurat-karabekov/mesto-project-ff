export function openModal(modal) {
  modal.classList.add('popup_is-opened');

  document.addEventListener('keydown', closeModalOnESC)
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closeModalOnESC);
}

function closeModalOnESC(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}
