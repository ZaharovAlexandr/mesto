const showInputError = (formElement, inputElement, errorMessage, config) => { //Функция для вывода поля ошибки
    // Элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    // Выводим на экран пользователя ошибку
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => { // Функция, которая удаляет класс с ошибкой
    // Элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    // Убираем с экрана пользователя ошибку
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement, config) => { // Функция, которая проверяет валидность поля
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const setEventListeners = (formElement, config) => { // Функия добавления слушателя
    // Массив форм и кнопок
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => { // Цикл для наложения слушателя на каждый элемент
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, config);
            isValid(formElement, inputElement, config)
        });
    });
};

const hasInvalidInput = (inputList) => { //Проверка на валидность целиком всей формы одновременно
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, config) => { // Функция смены кнопки
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const enableValidation = (config) => { //Функция включения валидации формы
    // Массив всех форм
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => { //Добавление слушателя для всех форм
        setEventListeners(formElement, config);
    });
};

const configFormSelector = {
    formSelector: '.popup__case',
    inputSelector: '.popup__text-field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_type_disable',
    inputErrorClass: 'popup__text-field_type_error',
    errorClass: 'popup__text-field-error_type_enable'
}

enableValidation(configFormSelector); //Вызов функции валидации
