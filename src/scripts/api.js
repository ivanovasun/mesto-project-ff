export const configAPIBase = {
  baseURL: 'https://nomoreparties.co/v1/wff-cohort-27/',
  authorizationIDe: 'ddd596ee-85bf-4265-8de1-cba520c31b24',
};

//обновление данных пользователя в профиле
export function requestProfileChange(namePerson, descriptionJob, configAPIBase, modal, closeModal) {
  return fetch(`${configAPIBase['baseURL']}users/me`, {
      method: 'PATCH',
      headers: {
          authorization: configAPIBase['authorizationIDe'],
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: namePerson.value,
          about: descriptionJob.value,
      }),
  })
      .catch((err) => {
          console.log(err); // выводим ошибку в консоль
      })
      .finally(() => {
          renderLoading({ modal: modal, popupBtn: '.popup__button', isLoading: false, createBtn: false });
          closeModal(modal);
      });
}

export function changeAvatar(avatarLink, configAPIBase, profileImg, modal, closeModal, formReset) {
  fetch(`${configAPIBase['baseURL']}users/me/avatar`, {
      method: 'PATCH',
      headers: {
          authorization: configAPIBase['authorizationIDe'],
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          avatar: avatarLink,
      }),
  })
      .then((res) => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Ошибка: ${res.status}`);
          }
      })
      .then((ans) => {
          profileImg.setAttribute('style', `background-image: url(${ans.avatar}`);
      })
      .catch((err) => {
          console.log(err); // выводим ошибку в консоль
      })
      .finally(() => {
          renderLoading({ modal: modal, popupBtn: '.popup__button', isLoading: false, createBtn: false });
          closeModal(modal);
          formReset.reset();
      });
}

//запрос на добавление карточки на сервер
export function requestAddImg(objImg, configAPIBase, cardContainer, createCard, cardFunctions, modal, closeModal, formReset) {
  fetch(`${configAPIBase['baseURL']}cards`, {
      method: 'POST',
      headers: {
          authorization: configAPIBase['authorizationIDe'],
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: objImg.name,
          link: objImg.link,
      }),
  })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
      //вывод карточки на страницу
      .then((cardInfo) => {
          cardContainer.prepend(createCard(cardInfo, cardFunctions, cardInfo.owner._id, cardInfo.owner._id, cardInfo._id));
      })
      .catch((err) => {
          console.log(err); // выводим ошибку в консоль
      })
      .finally(() => {
          renderLoading({ modal: modal, popupBtn: '.popup__button', isLoading: false, createBtn: true });
          closeModal(modal);
          formReset.reset();
      });
}

//запрос к серверу на отрисовку карточек и данных профиля
export const namesLink = ['users/me', 'cards'];

export const getInitialInfo = namesLink.map((item) =>
  fetch(`https://nomoreparties.co/v1/wff-cohort-27/${item}`, {
      headers: {
          authorization: 'ddd596ee-85bf-4265-8de1-cba520c31b24',
      },
  }).then((res) => {
      return res.json();
  })
);

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
  fetch(`${configAPIBase['baseURL']}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
          authorization: configAPIBase['authorizationIDe'],
      },
  });
}

//функция отправки лайка на сервер
export function likeCard(cardId, countLikes, configAPIBase) {
  fetch(`${configAPIBase['baseURL']}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
          authorization: configAPIBase['authorizationIDe'],
          'Content-Type': 'application/json',
      },
  })
      .then((res) => {
          return res.json();
      })
      //обновление количества лайков
      .then((ans) => {
          const count = ans.likes.length;
          countLikes.textContent = count;
      });
}

//функция удаления лайка с сервера
export function deletLike(cardId, countLikes, configAPIBase) {
  fetch(`${configAPIBase['baseURL']}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
          authorization: configAPIBase['authorizationIDe'],
          'Content-Type': 'application/json',
      },
  })
      .then((res) => {
          return res.json();
      })
      //обновление количества лайков
      .then((ans) => {
          const count = ans.likes.length;
          countLikes.textContent = count;
      });
}