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

// элементы секции fullSizeCard
const fullSizeCard = document.querySelector('.popup_type_full-size-card');
const fullSizeCardImage = fullSizeCard.querySelector('.popup__full-size-card');
const fullSizeCardText = fullSizeCard.querySelector('.popup__paragraph');
const fullSizeCardCloseButton = fullSizeCard.querySelector('.popup__close-button_type_full-size-card');

// элемент секции с карточками
const cardsArea = document.querySelector('.cards');

function createCard(url, name) { //функция создания карточки
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = url;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
    })
    cardElement.querySelector('.card__remove').addEventListener('click', function (evt) {
        cardElement.remove()
    })
    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
        openPopup(fullSizeCard);
        fullSizeCardImage.setAttribute('src', url);
        fullSizeCardText.textContent = name;
    })
    return cardElement;
}

function cardAddForm(evt) { // Функция добавления карточки на страницу
    evt.preventDefault();
    url = popupAddCardUrl.value;
    cardName = popupAddCardName.value;
    newCard = createCard(url, cardName)
    cardsArea.prepend(newCard);
    popupAddCardName.value = '';
    popupAddCardUrl.value = '';
    closePopup(popupAddCard);
}

for (let i = 0; i < initialCards.length; i++) { //Цикл изначального добавления карточек на страницу
    const url = initialCards[i].link;
    const cardName = initialCards[i].name;
    newCard = createCard(url, cardName);
    cardsArea.prepend(newCard);
}

function openPopup(popupName) { //Функция открытия Попапа
    popupName.classList.add('popup_opened');
}

function closePopup(popupName) { //Функция закрытия Попапа
    popupName.classList.remove('popup_opened');
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
    popupEditProfileName.value = '';
    popupEditProfileJob.value = '';
    closePopup(popupEditProfile);
}

popupEditProfileFormElement.addEventListener('submit', handleProfileFormSubmit); //Слушатель для редактирования профиля

popupAddCardFormElement.addEventListener('submit', cardAddForm); //Слушатель для добавления карточки

//Обработчики попапа
profileButtonEdit.addEventListener('click', openPopupEditProfile)

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