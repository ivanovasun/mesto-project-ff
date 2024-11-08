// функция удаления карточки
export function deleteCard(evt) {
    const deletElement = evt.target.closest('.card');
    deletElement.remove();
}

//функция лайка
export function likeCard(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

// Функция создания карточки
export function createCard(item, callbacks) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    // DOM узлы
    cardElement.querySelector('.card__title').textContent = item.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.setAttribute('src', item.link);
    cardImage.setAttribute('alt', item.name);

    // Обработчик клика для удаления карточки
    deleteButton.addEventListener('click', callbacks.del);
    cardElement.addEventListener('click', callbacks.like);
    cardImage.addEventListener('click', callbacks.popupwork);

    // Возврат готовой к выводу карточки
    return cardElement;
}