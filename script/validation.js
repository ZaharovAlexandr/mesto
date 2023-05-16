const showInputError = (formElement, inputElement, errorMessage) => { //Функция для вывода поля ошибки
    // Элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    // Выводим на экран пользователя ошибку
    inputElement.classList.add('popup__text-field_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__text-field-error_type_enable');
};

const hideInputError = (formElement, inputElement) => { // Функция, которая удаляет класс с ошибкой
    // Элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    // Убираем с экрана пользователя ошибку
    inputElement.classList.remove('popup__text-field_type_error');
    errorElement.classList.remove('popup__text-field-error_type_enable');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => { // Функция, которая проверяет валидность поля
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => { // Функия добавления слушателя
    // Массив форм и кнопок
    const inputList = Array.from(formElement.querySelectorAll('.popup__text-field'));
    const buttonElement = formElement.querySelector('.popup__submit-button');

    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => { // Цикл для наложения слушателя на каждый элемент
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement);
            isValid(formElement, inputElement)
        });
    });
};

const hasInvalidInput = (inputList) => { //Проверка на валидность целиком всей формы одновременно
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => { // Функция смены кнопки
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_type_disable');
    } else {
        buttonElement.classList.remove('popup__submit-button_type_disable');
    }
};

const enableValidation = () => { //Функция включения валидации формы
    // Массив всех форм
    const formList = Array.from(document.querySelectorAll('.popup__case'));

    formList.forEach((formElement) => { //Добавление слушателя для всех форм
        setEventListeners(formElement);
    });
};

enableValidation() //Вызов функции валидации
