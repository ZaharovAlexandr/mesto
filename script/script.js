let profile = document.querySelector('.profile');
let buttonEdit = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job')
let popupName = popup.querySelector('.popup__form-name');
let popupJob = popup.querySelector('.popup__form-job')
let buttonClose = popup.querySelector('.popup__close-button')
let buttonSubmit = popup.querySelector('.popup__subnit-button')

function openPopup() {
    popup.classList.add('popup_active');
    popupName.setAttribute('placeholder', profileName.textContent);
    popupJob.setAttribute('placeholder', profileJob.textContent);
}

function closePopup() {
    popup.classList.remove('popup_active');
}

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__case');


let nameInput = formElement.querySelector('.popup__form-name')
let jobInput = formElement.querySelector('.popup__form-job')

function handleFormSubmit (evt) {
        evt.preventDefault();
        profileName.textContent = popupName.value;
        profileJob.textContent = popupJob.value;
        popupName.value = '';
        popupJob.value = "";
        popup.classList.remove('popup_active');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);