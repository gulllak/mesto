export default class Popup {
    constructor(popupSelector){
        this._popupSelector = document.querySelector(popupSelector);
        //логика закрытия попапа клавишей Esc
        this._handleEscClose = (event) => {
            if(event.key === "Escape") {
                this.close();
            };
        };
        //логика закрытия попапа по оверлею
        this._hiddenPopupOverlay = (event) => {
            const overlay = this._popupSelector.closest('.popup_opened');
            if(event.target === overlay){
                this.close();
                };
        };
    };
    open(){
        this.setEventListeners();
        this._popupSelector.classList.add('popup_opened');
        
    };
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
        this._popupSelector.removeEventListener('click', this._hiddenPopupOverlay);
    };
    //добавляет слушатель клика иконке закрытия попапа
    setEventListeners(){
        document.addEventListener('keyup', this._handleEscClose);
        this._popupSelector.addEventListener('click', this._hiddenPopupOverlay);
        this.closeButton = this._popupSelector.querySelector('.popup__close');
        this.closeButton.addEventListener('click', ()=>this.close());
    };
}