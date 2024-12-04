export const configAPIBase = {
    baseURL: 'https://nomoreparties.co/v1/wff-cohort-27/',
    headers: {
        authorization: 'ddd596ee-85bf-4265-8de1-cba520c31b24',
        'Content-Type': 'application/json',
    },
  };
  
  function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  
  //обновление данных пользователя в профиле
  export function requestProfileChange(namePerson, descriptionJob, configAPIBase) {
    return fetch(`${configAPIBase['baseURL']}users/me`, {
        method: 'PATCH',
        headers: configAPIBase['headers'],
        body: JSON.stringify({
            name: namePerson.value,
            about: descriptionJob.value,
        }),
    })
    .then(getResponseData);
  }
  
  export function changeAvatar(avatarLink, configAPIBase) {
    return fetch(`${configAPIBase['baseURL']}users/me/avatar`, {
        method: 'PATCH',
        headers: configAPIBase['headers'],
        body: JSON.stringify({
            avatar: avatarLink,
        }),
    })
    .then(getResponseData);
  }
  
  //запрос на добавление карточки на сервер
  export function requestAddImg(objImg, configAPIBase) {
    return fetch(`${configAPIBase['baseURL']}cards`, {
        method: 'POST',
        headers: configAPIBase['headers'],
        body: JSON.stringify({
            name: objImg.name,
            link: objImg.link,
        }),
    })
    .then(getResponseData);
  }
  
  //запрос к серверу на отрисовку карточек и данных профиля
  const namesLink = ['users/me', 'cards'];
  
  export const getInitialInfo = namesLink.map((item) => {
    return fetch(`${configAPIBase['baseURL']}${item}`, {
        headers: configAPIBase['headers'],
    })
    .then(getResponseData);
  });
  
  export function renderLoading(configRender) {
    let btn = configRender.modal.querySelector(configRender['popupBtn']);
    if (configRender['isLoading']) {
        btn.textContent = 'Сохранение...';
    } else {
        if (configRender['createBtn']) {
            btn.textContent = 'Создать';
        } else {
            btn.textContent = 'Сохранить';
        }
    }
  }
  
  //функция удаления карточки с сервера
  export function deletCard(cardId, configAPIBase) {
    return fetch(`${configAPIBase['baseURL']}cards/${cardId}`, {
        method: 'DELETE',
        headers: configAPIBase['headers'],
    })
    .then(getResponseData);
  }
  
  //функция отправки лайка на сервер
  export function likeCard(cardId, configAPIBase) {
    return fetch(`${configAPIBase['baseURL']}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: configAPIBase['headers'],
    })
    .then(getResponseData);
  }
  
  //функция удаления лайка с сервера
  export function deletLike(cardId, configAPIBase) {
    return fetch(`${configAPIBase['baseURL']}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: configAPIBase['headers'],
    }).then(getResponseData);
  }
  
