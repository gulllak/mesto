export default class Popup {
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
        //this._element = this._popupElement.querySelector('.popup__form');
        //логика закрытия попапа клавишей Esc
        this._handleEscClose = (event) => {
            if(event.key === "Escape") {
                this.close();
            };
        };
        //логика закрытия попапа по оверлею
        this._hiddenPopupOverlay = (event) => {
            const overlay = this._popupElement.closest('.popup_opened');
            if(event.target === overlay){
                this.close();
                };
        };
    };
    open(){
        document.addEventListener('keyup', this._handleEscClose);
        this._popupElement.classList.add('popup_opened');
        
    };
    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
        this._popupElement.removeEventListener('click', this._hiddenPopupOverlay);
    };
    setEventListeners(){
        this._popupElement.addEventListener('click', this._hiddenPopupOverlay);
        this.closeButton = this._popupElement.querySelector('.popup__close');
        this.closeButton.addEventListener('click', ()=>this.close());
    };
}