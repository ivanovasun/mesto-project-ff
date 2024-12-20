import './pages/index.css';
import { createCard, likeCardElemt } from './scripts/card.js';
import {handleCloseOnOverlay, handleCloseClickBtn, closeModal, openModal } from './scripts/modal.js';
import { configAPIBase, requestProfileChange, changeAvatar, requestAddImg, getInitialInfo, deletCard, likeCard, deletLike } from './scripts/api.js';
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
const editBtnAvatar = document.querySelector('.profile__image');
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescript = profileInfo.querySelector('.profile__description');
const formProfile = document.querySelector('form[name=edit-profile]');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const formImg = document.querySelector('form[name=new-place]');
const formAvatar = document.querySelector('form[name=new-avatar]');
const profileImg = document.querySelector('.profile__image');
const popupAll = document.querySelectorAll('.popup');
const popupCloseBtns = document.querySelectorAll('.popup__close')

//селекторы для работы функций валидации
const formSelectorsForFunct = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputSelectorURL: 'popup__input_type_url',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button__submit_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active',
};

//слушатель для закрытия попапов по оверлею
popupAll.forEach((item) => {
    item.addEventListener('mousedown', handleCloseOnOverlay);
});

//слуцшатель для закрытия попапов по крестику
popupCloseBtns.forEach((item) => {
    item.addEventListener('click', handleCloseClickBtn);
});

//улучшение UX
function renderLoading(configRender) {
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

//функционал роботы попапа для карточек
function popupImgWorking(evt) {
    openModal(popupShowImg);
    popupImg.setAttribute('src', evt.target.src);
    popupImg.setAttribute('alt', evt.target.alt);
    popupCaption.textContent = evt.target.alt;
}

//объект со всеми колбэк функциями карточки
const cardFunctions = {
    del: deletCard,
    like: likeCardElemt,
    popupwork: popupImgWorking,
    delAPI: deletLike,
    likeAPI: likeCard,
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
            const addCardElemnt = createCard(item, cardFunctions, item.owner._id, myId, item._id, configAPIBase);
            cardContainer.append(addCardElemnt);
        });
    })
    .catch((err) => {
        console.log(err); // вывод ошибки в консоль
    });

//открытие и закрытие попапа редактирования аватара
editBtnAvatar.addEventListener('click', () => {
    openModal(popupEditAvatar);
    clearValidation(popupEditAvatar, {errorMsgClear: false}, formSelectorsForFunct);
});

//функционал смены аватара
function handleAvatarSubmit(evt) {
    evt.preventDefault();
    renderLoading({ modal: popupEditAvatar, popupBtn: '.popup__button', isLoading: true, createBtn: false });
    const newAvatarLink = popupEditAvatar.querySelector('.popup__input').value;
    changeAvatar(newAvatarLink, configAPIBase)
        .then((ans) => {
            profileImg.setAttribute('style', `background-image: url(${ans.avatar}`);
        })
        .then(() => {
            closeModal(popupEditAvatar);
            formAvatar.reset();
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
        .finally(() => {
            renderLoading({ modal: popupEditAvatar, popupBtn: '.popup__button', isLoading: false, createBtn: false });
        });
};

//обработчик события на отправку нового аватара
popupEditAvatar.addEventListener('submit', handleAvatarSubmit);

// функционал папапа редактирования профиля
profilePopup.addEventListener('click', () => {
    openModal(popupEditProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescript.textContent;
    clearValidation(popupEditProfile, {errorMsgClear: true}, formSelectorsForFunct);
});

//функция заполнения новых данных данных профиля
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    renderLoading({ modal: popupEditProfile, popupBtn: '.popup__button', isLoading: true, createBtn: false });
    requestProfileChange(nameInput, jobInput, configAPIBase)
        .then((answ) => {
            profileTitle.textContent = answ.name;
            profileDescript.textContent = answ.about;
        })
        .then(() => {
            closeModal(popupEditProfile);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
        .finally(() => {
            renderLoading({ modal: popupEditProfile, popupBtn: '.popup__button', isLoading: false, createBtn: false });
        });
}

// обработчик события на отправку новых даннных профиля
formProfile.addEventListener('submit', handleFormSubmitProfile);

//функционал папапа для добавления новой карточки
addImgPopup.addEventListener('click', () => {
    openModal(popupEditCards);
    clearValidation(popupEditCards, {errorMsgClear: false}, formSelectorsForFunct);
});

// //функция заполнения карточки для добавления новой карточки
function handleFormSubmitImg(evt) {
    evt.preventDefault();
    const newCardObj = {
        name: formImg.querySelector('.popup__input_type_card-name').value,
        link: formImg.querySelector('.popup__input_type_url').value,
    };
    renderLoading({ modal: popupEditCards, popupBtn: '.popup__button', isLoading: true, createBtn: true });
    //вывод карточки на страницу
    requestAddImg(newCardObj, configAPIBase)
        //вывод карточки на страницу
        .then((cardInfo) => {
            cardContainer.prepend(createCard(cardInfo, cardFunctions, cardInfo.owner._id, cardInfo.owner._id, cardInfo._id, configAPIBase));
        })
        .then(() => {
            closeModal(popupEditCards);
            formImg.reset();
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
        .finally(() => {
            renderLoading({ modal: popupEditCards, popupBtn: '.popup__button', isLoading: false, createBtn: true });
        });
}

// обработчик события на добавление новой карточки
formImg.addEventListener('submit', handleFormSubmitImg);

//валидация всех форм
enableValidation(formSelectorsForFunct);