export default class Card {
  constructor({data , handleCardClick}, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleFavorite = this._handleFavorite.bind(this);
    this._handleCardClick = handleCardClick;
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
    .addEventListener('click', this._handleFavorite);

    this._element.querySelector('.card__image')
    .addEventListener('click', () => this._handleCardClick(event));

    this._element.querySelector('.card__trash')
    .addEventListener('click',() => {
      this._removeCard();
    }, {once : true});
  }

  _handleFavorite() {
    this._element.querySelector('.card__favorite').classList.toggle('card__favorite_active');
  };

  _removeCard(){
    this._element.querySelector('.card__favorite').removeEventListener('click',this._handleFavorite);
    this._element.remove();
    this._element = null;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
  }
}

