//функция закрытия попапа по клавише Esc
const handleEscKeyUp = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
};

// функция анимации при октрытии попапа
const animationOn = (modal) => {
    modal.classList.add('popup_is-animated');
};

// функция анимации при закрытии попапа
const animationOff = (modal) => {
    modal.classList.remove('popup_is-animated');
};

// функция открытия попапа
const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKeyUp);
};

// механика закрытия попапа + добавление обработчика на Esc
export const closeModal = (modal) => {
    setTimeout(animationOff, 600, modal);
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKeyUp);
};

// функция закрытия попапа по всем событиям
const closePopupAll = (modal) => {
    const closePopup = modal.querySelector('.popup__close');
    closePopup.addEventListener('click', () => {
        const popupElementClose = closePopup.closest('.popup');
        closeModal(popupElementClose);
    });
    modal.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(modal);
        }
    });
};

//функционал попапа обощенный
export function functionsPopup(modal) {
    setTimeout(openModal, 600, modal);
    animationOn(modal);
    closePopupAll(modal);
};