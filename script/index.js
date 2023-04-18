let profile = document.querySelector('.profile');
let buttonEdit = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job')
let popupName = popup.querySelector('.popup__form_name');
let popupJob = popup.querySelector('.popup__form_job')
let buttonClose = popup.querySelector('.popup__close-button')
let formElement = document.querySelector('.popup__case');

function openPopup() { //Функция открытия Попап контейнера
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
}

function closePopup() { //Функция закрытия Попап контейнера
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) { // Функция отправки формы
        evt.preventDefault();
        profileName.textContent = popupName.value;
        profileJob.textContent = popupJob.value;
        popupName.value = '';
        popupJob.value = '';
        closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
