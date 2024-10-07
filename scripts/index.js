const container = document.querySelector(".places");
const cardContainer = container.querySelector(".places__list");

function deletCard(evt) {
    const deletElement = evt.target.closest(".card");
    deletElement.remove();
}

// @todo: Темплейт карточки
function addCard(item) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    // @todo: DOM узлы
    cardElement.querySelector(".card__title").textContent = item.name;
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.setAttribute("src", item.link);
    cardImage.setAttribute("alt", item.name);

    // @todo: Функция удаления карточки
    const deletButton = cardElement.querySelector(".card__delete-button");
    deletButton.addEventListener("click", deletCard);

    // @todo: Добавить карточку на страницу
    cardContainer.append(cardElement);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => addCard(item));
