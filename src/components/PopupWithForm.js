import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, formSubmit}){
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._formRender = (event) => {
            event.preventDefault();
            this._formSubmit(this._getInputValues());
          };
    };
    //собирает данные всех полей формы
    _getInputValues(){
        this._inputList = this._element.querySelectorAll('.popup__input');
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value
            }
            );
        return formValues;
    };
    setEventListeners(){
        super.setEventListeners();
        this._element = this._popupElement.querySelector('.popup__form');
        this._element.addEventListener('submit', (event)=>{
            this._formRender(event);
            this.close();          
            this._element.reset();
            });
    };
    close(){
        super.close();
    };
};