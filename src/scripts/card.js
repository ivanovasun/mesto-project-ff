// Функция создания карточки
export function createCard(item, callbacks, personAddId, itemOwnerId, cardId, configAPIBase) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeElement = cardElement.querySelector('.card__like-button');

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
    deleteButton.addEventListener('click', () => {
        callbacks
            .del(cardId, configAPIBase)
            .then(() => {
                cardElement.remove();
            })
            .catch((err) => {
                console.log(err); // выводим ошибку в консоль
            });
    });
    likeElement.addEventListener('click', () => {
        callbacks.like(likeElement, cardId, countLikes, configAPIBase, callbacks);
    });
    cardImage.addEventListener('click', callbacks.popupwork);

    // Возврат готовой к выводу карточки
    return cardElement;
};

export function likeCardElemt(cardElementLike, cardId, countLikes, configAPIBase, callbacks) {
    if (cardElementLike.classList.contains('card__like-button_is-active')) {
        callbacks
            .delAPI(cardId, configAPIBase)
            //обновление количества лайков
            .then((ans) => {
                const count = ans.likes.length;
                countLikes.textContent = count;
                cardElementLike.classList.remove('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err); // выводим ошибку в консоль
            });
    } else {
        callbacks
            .likeAPI(cardId, configAPIBase)
            .then((ans) => {
                //обновление количества лайков
                const count = ans.likes.length;
                countLikes.textContent = count;
                cardElementLike.classList.add('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err); // выводим ошибку в консоль
            });
    }
};