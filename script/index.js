let profile = document.querySelector('.profile');
let buttonEdit = profile.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let popupName = popup.querySelector('.popup__text-field_type_name');
let popupJob = popup.querySelector('.popup__text-field_type_job');
let buttonClose = popup.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__case');

let popupCards = document.querySelector('.popup-card')
let CloseButtonCardPop = popupCards.querySelector('.popup-card__close-button');
let popupCardsName = popupCards.querySelector('.popup-card__text-field_type_name');
let popupCardsUrl = popupCards.querySelector('.popup-card__text-field_type_url');
let cardForm = popupCards.querySelector('.popup-card__case');

let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

let fullSizeCard = document.querySelector('.full-size-card');
let fullSizeCardImage = fullSizeCard.querySelector('.full-size-card__image');
let fullSizeCardText = fullSizeCard.querySelector('.full-size-card__text');
let fullSizeCardCloseButton = fullSizeCard.querySelector('.full-size-card__close-button')

const cardsArea = document.querySelector('.cards');
const addButton = profile.querySelector('.profile__add-button');

const initialCards = [ //Массив с изначальными карточками
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


for (let i = 0; i < initialCards.length; i++) { //Цикл изначального добавления карточек на страницу
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = initialCards[i].link;
    cardElement.querySelector('.card__title').textContent = initialCards[i].name;
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
    })
    cardElement.querySelector('.card__remove').addEventListener('click', function (evt) {
        cardElement.remove()
    })
    cardElement.addEventListener('click', function (evt) {
        fullSizeCard.classList.add('full-size-card_opened');
        fullSizeCardImage.setAttribute('src', initialCards[i].link);
        fullSizeCardText.textContent = initialCards[i].name;
    })
    cardsArea.append(cardElement);
}

function openPopupCards() { //Функция открытия Попапа добавления карточки 
    popupCards.classList.add('popup-card_opened')
}

function closePopupCards() { //Функция закрытия Попапа добавления карточки 
    popupCards.classList.remove('popup-card_opened');
}

function openPopup() { //Функция открытия Попапа редактирования профился
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
}

function closePopup() { //Функция закрытия Попап редактирования профился
    popup.classList.remove('popup_opened');
}

function closeFullsizePopup() {
    fullSizeCard.classList.remove('full-size-card_opened');
}

function handleFormSubmit(evt) { // Функция отправки формы редактирования профиля
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    popupName.value = '';
    popupJob.value = '';
    closePopup();
}

function CardAddForm (evt) { // Функция отправки формы добавления карточки
    evt.preventDefault();
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = popupCardsUrl.value;
    cardElement.querySelector('.card__title').textContent = popupCardsName.value;
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
    })
    cardElement.querySelector('.card__remove').addEventListener('click', function (evt) {
        cardElement.remove()
    })
    cardElement.addEventListener('click', function (evt) {
        fullSizeCard.classList.add('full-size-card_opened');
        fullSizeCardImage.setAttribute('src', popupCardsUrl.value);
        fullSizeCardText.textContent = popupCardsName.value;
    })
    cardsArea.prepend(cardElement);
    closePopupCards();
    closePopupCards();
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
cardForm.addEventListener('submit', CardAddForm);

//Обработчики попапа
buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
addButton.addEventListener('click', openPopupCards);
CloseButtonCardPop.addEventListener('click', closePopupCards);
fullSizeCardCloseButton.addEventListener('click', closeFullsizePopup)


