import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, formSubmit}){
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._formRender = (event) => {
            event.preventDefault();
            this._formSubmit(this._getInputValues());
            this.close();
            this._element.reset();
          };
    };
    _getTemplate(){
        const formElement = this._popupSelector
        .querySelector('.popup__form');
        return formElement;
    }
    //собирает данные всех полей формы
    _getInputValues(){
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value
            }
            );
        return this._formValues;
    };
    setEventListeners(){
        super.setEventListeners();
        this._element.addEventListener('submit', this._formRender, {once : true});
    };
    close(){
        super.close();
        //сброс формы добавления карточки
        if(this._popupSelector.classList.contains('popup__form_card')){ 
            const form = this._popupSelector.querySelector('.popup__form');
            form.reset();
        }
    };
    generateForm() {
        this._element = this._getTemplate();
        this.setEventListeners();
        return this._element;
      }
};