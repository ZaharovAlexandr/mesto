class FormValidator { //Класс для проверки валидции формы
    constructor(config, formTemplate) {
        this._formElement = formTemplate;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formTemplate = formTemplate;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError(formElement, inputElement, errorMessage) { //Функция для вывода поля ошибки
        // Элемент ошибки
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        // Выводим на экран пользователя ошибку
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(formElement, inputElement) { // Функция, которая удаляет класс с ошибкой
        // Элемент ошибки
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        // Убираем с экрана пользователя ошибку
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _isValid(formElement, inputElement) { // Функция, которая проверяет валидность поля
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _setEventListeners() { // Функия добавления слушателя
        this._toggleButtonState(this._inputList, this._buttonElement);
        this._inputList.forEach((inputElement) => { // Цикл для наложения слушателя на каждый элемент
            inputElement.addEventListener('input', () => {
                this._toggleButtonState(this._inputList, this._buttonElement);
                this._isValid(this._formElement, inputElement)
            });
        });
    };

    _hasInvalidInput(inputList) { //Проверка на валидность целиком всей формы одновременно
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState(inputList, buttonElement) { // Функция смены кнопки
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', '');
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };

    enableValidation() { // Публичная функция включения валидации
        this._setEventListeners();
    }

    disableValidationButton () {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', '');
    }
}

export {FormValidator}


