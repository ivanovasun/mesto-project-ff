// Функция создания карточки
export function createCard(item, callbacks, personAddId, itemOwnerId, cardId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeElement = cardElement.querySelector('.card__like-button');
    const popupDelete = document.querySelector('.popup_type_delet_card');

    // DOM узлы
    cardElement.querySelector('.card__title').textContent = item.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.setAttribute('src', item.link);
    cardImage.setAttribute('alt', item.name);
    cardImage.setAttribute('data-card-db-id', item._id);
    const countLikes = cardElement.querySelector('.card__like-count');

    //отображение количества лайков
    const amountLikes = item.likes.length;
    if (amountLikes > 0) {
        countLikes.textContent = amountLikes;
    } else {
        countLikes.textContent = '0';
    }

    //показываем какие карточки я лайкнула
    item.likes.forEach((el) => {
        if (el._id === itemOwnerId) {
            likeElement.classList.add('card__like-button_is-active');
        }
    });

    //показывать мусорку только на моих карточках
    if (personAddId == itemOwnerId) {
        deleteButton.classList.remove('card__delete-button_non_active');
    }

    likeElement.addEventListener('click', () => {
        callbacks.like(likeElement, cardId, countLikes);
    });
    cardImage.addEventListener('click', callbacks.popupwork);

    // Возврат готовой к выводу карточки
    return cardElement;
}