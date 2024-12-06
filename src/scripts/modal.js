//функция закрытия попапа
export const handleEventKeyUp = (evt) => {
    //функция закрытия попапа по клавише Esc
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
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
    const popup = evt.target.closest('.popup');
    closeModal(popup);
};

// функция открытия попапа
export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    //слушатель на нажатие esc для закрытия попапа
    document.addEventListener('keydown', handleEventKeyUp);
};

// механика закрытия попапа + добавление обработчика на Esc
export const closeModal = (modal) => {
    modal.classList.remove('popup_is-opened');
    //снятие слушателя на нажатие esc для закрытия попапа
    document.removeEventListener('keydown', handleEventKeyUp);
};