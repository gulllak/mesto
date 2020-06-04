const fullscreenImage = document.querySelector('#image');

export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
    .content
    .firstElementChild
    .cloneNode(true)

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.card__favorite')
    .addEventListener('click', () => {
      this._handleFavorite();
    });

    this._element.querySelector('.card__image')
    .addEventListener('click', () => {
      this._openImage();
    });

    this._element.querySelector('.card__trash')
    .addEventListener('click',() => {
      this._removeCard();
    }, {once : true});

    fullscreenImage.querySelector('.popup__close_fullscreen-image').addEventListener('click',() => this._closeImage());
  }

  _handleFavorite() {
    this._element.querySelector('.card__favorite').classList.toggle('card__favorite_active');
  };

  _openImage() {
    document.querySelector('.popup__image_full').src = this._image;
    document.querySelector('.popup__image_signature').textContent = this._title;
    this._openPopup(fullscreenImage);
  };

  _closeImage(){
    this._closePopup (fullscreenImage)
  };

  _hiddenPopupOverlay (event) {
    if(event.target === fullscreenImage){
      this._closePopup(fullscreenImage);
    };
  };

  _hiddenPopupEscape (event) {
    const isEsc = (event.key === "Escape");
    if(!isEsc) return;
    this._closePopup(fullscreenImage);
  };

  _openPopup (popup) {
    popup.addEventListener('click', () => {this._hiddenPopupOverlay(event);});
    document.addEventListener('keydown', () => {this._hiddenPopupEscape(event);});
    popup.classList.add('popup_opened');
  };

  _closePopup (popup){
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', () => {this._hiddenPopupOverlay(event);});
    document.removeEventListener('keydown', () => {this._hiddenPopupEscape(event);});
  };

  _removeCard(){
    this._element.querySelector('.card__favorite').removeEventListener('click',() => {
      this._handleFavorite();
    });
    this._element.querySelector('.card__image').removeEventListener('click',() => {
      this._openImage();
    });
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
  }
}

