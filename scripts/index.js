const container = document.querySelector('.places');
const cardContainer = container.querySelector('.places__list');

// функция удаления карточки
function deleteCard(evt) {
    const deletElement = evt.target.closest('.card');
    deletElement.remove();
};

// Функция создания карточки
function createCard(item, callback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

// DOM узлы
    cardElement.querySelector('.card__title').textContent = item.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.setAttribute('src', item.link);
    cardImage.setAttribute('alt', item.name);

// Обработчик клика для удаления карточки 
    deleteButton.addEventListener('click', callback);

// Возврат готовой к выводу карточки
    return cardElement
};

// Вывести карточки на страницу
initialCards.forEach(function (item) {
   const addCardElemnt = createCard(item, deleteCard);
   cardContainer.append(addCardElemnt);
});
