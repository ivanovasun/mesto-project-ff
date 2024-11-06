import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';
import {deleteCard, likeCard, createCard } from './scripts/card.js';
import {closeModal, functionsPopup} from './scripts//modal.js';

const container = document.querySelector('.places');
const cardContainer = container.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditCards = document.querySelector('.popup_type_new-card');
const popupShowImg = document.querySelector('.popup_type_image');
const popupImg = popupShowImg.querySelector('.popup__image');
const popupCaption = popupShowImg.querySelector('.popup__caption');
const profilePopup = document.querySelector('.profile__edit-button');
const addImgPopup = document.querySelector('.profile__add-button');
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescript = profileInfo.querySelector('.profile__description');
const formProfile = document.querySelector('form[name=edit-profile]');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const formImg = document.querySelector('form[name=new-place]');

//объект со всеми колбэк функциями карточки
const cardFunctions = {
    del: deleteCard,
    like: likeCard,
    popupwork: popupImgWorking,
};

// Вывести карточки на страницу
initialCards.forEach(function (item) {
    const addCardElemnt = createCard(item, cardFunctions);
    cardContainer.append(addCardElemnt);
});

// функция заполнения новых данных данных профиля
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescript.textContent = jobInput.value;
    closeModal(popupEditProfile);
}

// функционал папапа редактирования профиля
profilePopup.addEventListener('click', () => {
    functionsPopup(popupEditProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescript.textContent;
});

// обработчик события на отправку новых даннных профиля
formProfile.addEventListener('submit', handleFormSubmitProfile);

// //функция заполнения карточки для добавления новой карточки
function handleFormSubmitImg(evt) {
    evt.preventDefault();
    const newCardObj = {
        name: formImg.querySelector('.popup__input_type_card-name').value,
        link: formImg.querySelector('.popup__input_type_url').value,
    };
    cardContainer.prepend(createCard(newCardObj, cardFunctions));
    closeModal(popupEditCards);
    formImg.reset();
}

//функционал папапа для добавления новой карточки
addImgPopup.addEventListener('click', () => {
    functionsPopup(popupEditCards);
});

// обработчик события на добавление новой карточки
formImg.addEventListener('submit', handleFormSubmitImg);

//функционал роботы попапа для карточек
function popupImgWorking (evt) {
    functionsPopup(popupShowImg);
    popupImg.setAttribute('src', evt.target.src);
    popupImg.setAttribute('alt', evt.target.alt);
    popupCaption.textContent = evt.target.alt;
}