//функция закрытия попапа
export const handleEventKeyUp = (evt) => {
    const popup = document.querySelector('.popup_is-opened');
    //функция закрытия попапа по клавише Esc
    if (evt.key === 'Escape') {
        closeModal(popup);
    }
};

//функция закрытия попапа по нажатию по оверлею
export const handleCloseOnOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        const popup = evt.target;
        closeModal(popup);
    }
};

//функция закрытия попапа при нажатии на крестик
export const handleCloseClickBtn = (evt) => {
    if (evt.target.classList.contains('popup__close')) {
        const popup = evt.target.closest('.popup');
        closeModal(popup);
    }
};

// функция открытия попапа
export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
};

// механика закрытия попапа + добавление обработчика на Esc
export const closeModal = (modal) => {
    modal.classList.remove('popup_is-opened');
};

//функционал попапа обощенный
export function functionsPopup(modal) {
    openModal(modal);
    handleEventKeyUp;
    handleCloseOnOverlay;
    handleCloseClickBtn;
};