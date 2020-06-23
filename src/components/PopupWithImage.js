import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    open(item){
        document.querySelector('.popup__image_full').src = item.link;
        document.querySelector('.popup__image_signature').alt = item.name;
        super.open();
    }
}