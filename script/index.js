import { initialCards, configFormSelector } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

// элементы секции profile:
const profile = document.querySelector('.profile');
const profileButtonEdit = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

// элементы секции popupEditProfile:
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileName = popupEditProfile.querySelector('.popup__text-field_type_name');
const popupEditProfileJob = popupEditProfile.querySelector('.popup__text-field_type_job');
const popupEditProfileButtonClose = popupEditProfile.querySelector('.popup__close-button_type_edit-profile');
const popupEditProfileFormElement = document.querySelector('.popup__case_type_edit-profile');

// элементы секции popupAddCard:
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardСloseButton = popupAddCard.querySelector('.popup__close-button_type_add-card');
const popupAddCardName = popupAddCard.querySelector('.popup__text-field_type_card-name');
const popupAddCardUrl = popupAddCard.querySelector('.popup__text-field_type_card-url');
const popupAddCardFormElement = popupAddCard.querySelector('.popup__case_type_add-card');
const popopAddCardSubmitButton = popupAddCard.querySelector('.popup__submit-button_type_add-card');

// элементы секции fullSizeCard
const fullSizeCard = document.querySelector('.popup_type_full-size-card');
const fullSizeCardImage = fullSizeCard.querySelector('.popup__full-size-card');
const fullSizeCardText = fullSizeCard.querySelector('.popup__paragraph');
const fullSizeCardCloseButton = fullSizeCard.querySelector('.popup__close-button_type_full-size-card');

// элемент секции с карточками
const cardsArea = document.querySelector('.cards');

// Создание новых переменных валидации формы
const enableValidationEditProfile = new FormValidator(configFormSelector, 'popup__case_type_edit-profile');
const enableValidationAddCard = new FormValidator(configFormSelector, 'popup__case_type_add-card');

// Включение валидации для отдельных секций
enableValidationEditProfile.enableValidation()
enableValidationAddCard.enableValidation()


function cardAddForm(evt) { // Функция добавления карточки на страницу
    evt.preventDefault();
    const url = popupAddCardUrl.value;
    const cardName = popupAddCardName.value;
    cardsArea.prepend(createCard(url, cardName, 'card'));
    popupAddCardName.value = '';
    popupAddCardUrl.value = '';
    popopAddCardSubmitButton.setAttribute('disabled', '');
    popopAddCardSubmitButton.classList.add('popup__submit-button_type_disable');
    closePopup(popupAddCard);
}

function createCard (url, name, temple) { // Функция для создания карточки
    const newCard = new Card(url, name, temple)
    return newCard._createCardClone()
}

initialCards.forEach(function(item){ // Цикл первоначального добавления карточек на страницу
    const url = item.link;
    const cardName = item.name;
    cardsArea.prepend(createCard(url, cardName, 'card'));
})

function openPopup(popupName) { //Функция открытия Попапа
    popupName.classList.add('popup_opened');
    addEscListner();
}

function closePopup(popupName) { //Функция закрытия Попапа
    popupName.classList.remove('popup_opened');
    removeEscListner();
}

function openPopupEditProfile() { //Функция открытия Попапа редактирования профиля
    openPopup(popupEditProfile);
    popupEditProfileName.value = profileName.textContent;
    popupEditProfileJob.value = profileJob.textContent;
}

function handleProfileFormSubmit(evt) { // Функция отправки формы редактирования профиля
    evt.preventDefault();
    profileName.textContent = popupEditProfileName.value;
    profileJob.textContent = popupEditProfileJob.value;
    popupEditProfileJob.value = '';
    closePopup(popupEditProfile);
}

function addEscListner() { // Функция добавления слушателя на закрытие попапа на кнопку 'ESC' //addEscListner
    document.addEventListener('keydown', createListnerEsc);
}

function createListnerEsc(evt) { // Функция которая отслеживает нажатие на кнопку 'ESC'
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
}

function removeEscListner() { // Функция добавления слушателя на закрытие попапа на кнопку 'ESC' removeEscListner
    document.removeEventListener('keydown', createListnerEsc);
}

popupEditProfileFormElement.addEventListener('submit', handleProfileFormSubmit); //Слушатель для редактирования профиля

popupAddCardFormElement.addEventListener('submit', cardAddForm); //Слушатель для добавления карточки

profileButtonEdit.addEventListener('click', openPopupEditProfile) //Обработчики попапа

popupEditProfileButtonClose.addEventListener('click', function () { // Слушатель закрытия попапа редактирования профиля
    closePopup(popupEditProfile);
});

profileAddButton.addEventListener('click', function () { // Слушатель открытия попапа добавления карточки
    openPopup(popupAddCard);
});

popupAddCardСloseButton.addEventListener('click', function () { // Слушатель закрытия попапа добавления карточки
    closePopup(popupAddCard);
});

fullSizeCardCloseButton.addEventListener('click', function () { // Слушатель закрытия попапа добавления карточки
    closePopup(fullSizeCard);
});

popupEditProfile.addEventListener('click', (evt) => { // Слушатель закрытия попапа редактирования профиля нажатием на оверлей
    if (evt.currentTarget === evt.target) {
        closePopup(popupEditProfile);
    }
});

popupAddCard.addEventListener('click', (evt) => { // Слушатель закрытия попапа добавления карточки нажатием на оверлей
    if (evt.currentTarget === evt.target) {
        closePopup(popupAddCard);
    }
});

fullSizeCard.addEventListener('click', (evt) => { // Слушатель закрытия попапа добавления карточки нажатием на оверлей
    if (evt.currentTarget === evt.target) {
        closePopup(fullSizeCard);
    }
});

export { openPopup, fullSizeCard, fullSizeCardImage, fullSizeCardText }









