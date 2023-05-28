export {Card}

class Card {
    constructor(link, name, template) {
        this._link = link;
        this._name = name;
        this._template = template;
    }

    _setEventListner(cardElement) {
        cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__like_active');
        })
        cardElement.querySelector('.card__remove').addEventListener('click', function (evt) {
            cardElement.remove();
        })
        cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
            const fullSizeCard = document.querySelector('.popup_type_full-size-card');
            fullSizeCard.classList.add('popup_opened');
            const fullSizeCardImage = fullSizeCard.querySelector('.popup__full-size-card');
            const fullSizeCardText = fullSizeCard.querySelector('.popup__paragraph');
            fullSizeCardImage.setAttribute('src', cardElement.querySelector('.card__image').src);
            fullSizeCardImage.setAttribute('alt', cardElement.querySelector('.card__title').textContent);
            fullSizeCardText.textContent = cardElement.querySelector('.card__title').textContent;
        })
    }

    _createCardClone() {
        const cardElement = document.querySelector(`#${this._template}`).content.querySelector(`.${this._template}`).cloneNode(true);
        this._setEventListner(cardElement);
        cardElement.querySelector('.card__image').src = this._link;
        cardElement.querySelector('.card__image').alt = this._name;
        cardElement.querySelector('.card__title').textContent = this._name;
        return cardElement;
    }

    returnCard() {
        return this._createCardClone();
    }
}