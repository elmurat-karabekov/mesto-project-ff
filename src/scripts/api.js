const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '0ddfb11a-0000-455a-b938-17fd92a7c5cc',
    'Content-Type': 'application/json',
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const updateUser = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(handleResponse);
};

export const addNewCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResponse);
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

export const like = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(handleResponse);
};

export const dislike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

export const updateProfileImage = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then(handleResponse);
};
