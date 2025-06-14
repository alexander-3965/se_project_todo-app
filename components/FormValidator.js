class FormValidator {
  constructor(settings, formElement) {
    this._formEl = formElement;
    this._inputEl = settings.inputSelector;
    this._SubmitButtonEl = this._formEl.querySelector(
      settings.submitButtonSelector
    );
    this._errorClass = settings.errorClass;
    this._inputError = settings.inputErrorClass;
    this._inactiveBtn = settings.inactiveButtonClass;
    this._inputList = Array.from(this._formEl.querySelectorAll(this._inputEl));
  }
  //private methods for checking validity,
  _showInputError(inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.add(this._inputError);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableSubmitBtn() {
    this._SubmitButtonEl.classList.add(this._inactiveBtn);
    this._SubmitButtonEl.disabled = true;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitBtn();
    } else {
      this._SubmitButtonEl.classList.remove(this._inactiveBtn);
      this._SubmitButtonEl.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._formEl.reset();
    this._disableSubmitBtn();
  }
}
export default FormValidator;
