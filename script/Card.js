import {openPopup, fullSizeCard, fullSizeCardImage, fullSizeCardText} from './index.js'

class Card {
    constructor(link, name, template) {
        this._link = link;
        this._name = name;
        this._template = template;
        this._cardElement = document.querySelector(`#${this._template}`).content.querySelector(`.${this._template}`).cloneNode(true);
        this._cardElementImage = this._cardElement.querySelector('.card__image');
        this._cardElementTitle = this._cardElement.querySelector('.card__title');
    }

    _setEventListner(cardElement) {
        cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__like_active');
        })
        cardElement.querySelector('.card__remove').addEventListener('click', function (evt) {
            cardElement.remove();
        })
        cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
            openPopup(fullSizeCard);
            fullSizeCardImage.setAttribute('src', cardElement.querySelector('.card__image').src);
            fullSizeCardImage.setAttribute('alt', cardElement.querySelector('.card__title').textContent);
            fullSizeCardText.textContent = cardElement.querySelector('.card__title').textContent;
        })
    }

    _createCardClone() {
        this._setEventListner(this._cardElement);
        this._cardElementImage.src = this._link;
        this._cardElementImage.alt = this._name;
        this._cardElementTitle.textContent = this._name;
        return this._cardElement;
    }
}

export {Card}