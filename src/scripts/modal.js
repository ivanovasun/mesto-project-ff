//функция закрытия попапа 
const handleEventKeyUp = (evt) => {
    const popup = document.querySelector('.popup_is-opened');
    //функция закрытия попапа по клавише Esc
    if (evt.key === 'Escape') {
        closeModal(popup);
        //функция закрытия попапа по нажатию по оверлею 
    } else if (evt.target.classList.contains('popup')) {
        closeModal(popup);
        //функция закрытия попапа при нажатии на крестик
    } else if (evt.target.classList.contains('popup__close')) {
        closeModal(popup)
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
    document.addEventListener('keydown', handleEventKeyUp);
    modal.addEventListener('mousedown', handleEventKeyUp);
    modal.addEventListener('click', handleEventKeyUp);
};

// механика закрытия попапа + добавление обработчика на Esc
export const closeModal = (modal) => {
    setTimeout(animationOff, 600, modal); 
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEventKeyUp);
    modal.removeEventListener('mousedown', handleEventKeyUp);
    modal.removeEventListener('click', handleEventKeyUp);
};

//функционал попапа обощенный
export function functionsPopup(modal) {
    setTimeout(openModal, 600, modal);
    animationOn(modal);
    handleEventKeyUp;
}