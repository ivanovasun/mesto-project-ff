import './pages/index.css';
import { createCard } from './scripts/card.js';
import { closeModal, functionsPopup } from './scripts/modal.js';
import { configAPIBase, requestProfileChange, changeAvatar, requestAddImg, getInitialInfo, renderLoading, likeCard, deletLike } from './scripts/api.js';
import { enableValidation, clearValidation } from './scripts/validation.js';

const container = document.querySelector('.places');
const cardContainer = container.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditCards = document.querySelector('.popup_type_new-card');
const popupShowImg = document.querySelector('.popup_type_image');
const popupImg = popupShowImg.querySelector('.popup__image');
const popupCaption = popupShowImg.querySelector('.popup__caption');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const profilePopup = document.querySelector('.profile__edit-button');
const addImgPopup = document.querySelector('.profile__add-button');
const editBtnAvatar = document.querySelector('.profile__image_edit');
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescript = profileInfo.querySelector('.profile__description');
const formProfile = document.querySelector('form[name=edit-profile]');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const formImg = document.querySelector('form[name=new-place]');
const formAvatar = document.querySelector('form[name=new-avatar]');
const profileImg = document.querySelector('.profile__image');

//функционал роботы попапа для карточек
function popupImgWorking(evt) {
    functionsPopup(popupShowImg);
    popupImg.setAttribute('src', evt.target.src);
    popupImg.setAttribute('alt', evt.target.alt);
    popupCaption.textContent = evt.target.alt;
}

//объект со всеми колбэк функциями карточки
const cardFunctions = {
    like: likeCardElemt,
    popupwork: popupImgWorking,
};

//выведение основной информации с сервера на страницу
Promise.all(getInitialInfo)
    .then((initialArray) => {
        //подгрузка имени и описания с сервера
        profileTitle.textContent = initialArray[0].name;
        profileDescript.textContent = initialArray[0].about;
        profileImg.setAttribute('style', `background-image: url(${initialArray[0].avatar})`);
        const myId = initialArray[0]._id;
        //зарузка карточек с сервера
        initialArray[1].forEach(function (item) {
            const addCardElemnt = createCard(item, cardFunctions, item.owner._id, myId, item._id);
            cardContainer.append(addCardElemnt);
        });
    })
    .catch((err) => {
        console.log(err); // вывод ошибки в консоль
    });

//открытие и закрытие попапа редактирования аватара
editBtnAvatar.addEventListener('click', () => {
    functionsPopup(popupEditAvatar);
    clearValidation(popupEditAvatar, {
      errorMsgClear: false, 
      enableBtn: false, 
      inactiveButtonClass: 'popup__button__submit_inactive', 
      inputErrorClass: 'popup__input_error', errorClass: 'popup__input-error_active' });
});

//функционал смены аватара
function handleAvatarSubmit(evt) {
    evt.preventDefault();
    renderLoading({
      modal: popupEditAvatar, 
      popupBtn: '.popup__button', 
      isLoading: true, 
      createBtn: false });
    const newAvatarLink = popupEditAvatar.querySelector('.popup__input').value;
    changeAvatar(newAvatarLink, configAPIBase, profileImg, popupEditAvatar, closeModal, formAvatar);
}

//обработчик события на отправку нового аватара
popupEditAvatar.addEventListener('submit', handleAvatarSubmit);

// функционал папапа редактирования профиля
profilePopup.addEventListener('click', () => {
    functionsPopup(popupEditProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescript.textContent;
    clearValidation(popupEditProfile, {
        errorMsgClear: true,
        enableBtn: true,
        formSelector: '.popup__input',
        inactiveButtonClass: 'popup__button__submit_inactive',
        inputErrorClass: 'popup__input_error',
        errorClass: 'popup__input-error_active',
    });
});

//функция заполнения новых данных данных профиля
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    renderLoading({
      modal: popupEditProfile, 
      popupBtn: '.popup__button', 
      isLoading: true, 
      createBtn: false });
    profileTitle.textContent = nameInput.value;
    profileDescript.textContent = jobInput.value;
    requestProfileChange(nameInput, jobInput, configAPIBase, popupEditProfile, closeModal);
}

// обработчик события на отправку новых даннных профиля
formProfile.addEventListener('submit', handleFormSubmitProfile);

//функционал папапа для добавления новой карточки
addImgPopup.addEventListener('click', () => {
    functionsPopup(popupEditCards);
    clearValidation(popupEditCards, {
      errorMsgClear: false, 
      enableBtn: false, 
      inactiveButtonClass: 'popup__button__submit_inactive', 
      inputErrorClass: 'popup__input_error', 
      errorClass: 'popup__input-error_active' });
});

// //функция заполнения карточки для добавления новой карточки
function handleFormSubmitImg(evt) {
    evt.preventDefault();
    const newCardObj = {
        name: formImg.querySelector('.popup__input_type_card-name').value,
        link: formImg.querySelector('.popup__input_type_url').value,
    };
    renderLoading({ modal: popupEditCards, popupBtn: '.popup__button', isLoading: true, createBtn: true});
    //вывод карточки на страницу
    requestAddImg(newCardObj, configAPIBase, cardContainer, createCard, cardFunctions, popupEditCards, closeModal, formImg);
}

// обработчик события на добавление новой карточки
formImg.addEventListener('submit', handleFormSubmitImg);

//валидация всех форм
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputSelectorURL: 'popup__input_type_url',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button__submit_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active',
});

function likeCardElemt(cardElementLike, cardId, countLikes) {
    if (cardElementLike.classList.contains('card__like-button_is-active')) {
        cardElementLike.classList.remove('card__like-button_is-active');
        deletLike(cardId, countLikes, configAPIBase);
    } else {
        cardElementLike.classList.add('card__like-button_is-active');
        likeCard(cardId, countLikes, configAPIBase);
    }
}