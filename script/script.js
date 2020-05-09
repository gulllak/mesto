const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.getElementById('edit');
const popupClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileSignature = document.querySelector('.profile__signature');
const popupInputUsername = document.querySelector('.popup__input_username');
const popupInputSignature = document.querySelector('.popup__input_signature');
const formSubmitEdit = document.querySelector('.popup__container');

const profileAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.getElementById('add');
const popupCloseFormAdd = document.querySelector('.popup__close_form-add');
const formSubmitAdd = document.querySelector('.popup__container_form-add');

const cardContainer = document.querySelector(".card-container");
const popupInputCardName = document.querySelector('.popup__input_card-name');
const popupInputCardUrl = document.querySelector('.popup__input_card-url');

const fullscreenImage = document.getElementById('image');
const popupCloseFullscreenImage = document.querySelector('.popup__close_fullscreen-image');
const popupImageFull = document.querySelector('.popup__image_full');
const popupImageSignature = document.querySelector('.popup__image_signature');

const cardsTemplate = document.querySelector('#cards').content;

function openClosePopup(popup) {
  popup.classList.toggle('popup_opened');
};

const favorite = (evt) => {
  evt.target.classList.toggle('card__favorite_active');
};

const openImage = (event) => {
  popupImageFull.src = event.target.src;
  popupImageSignature.textContent = event.target.alt;
  openClosePopup(fullscreenImage);
};

const removeCard = function(cardTemplateCopy, cardFavorite, cardImage){
  cardFavorite.removeEventListener('click',favorite);
  cardImage.removeEventListener('click',openImage);
  cardTemplateCopy.remove();
};

//создание карточки
function newCard(name, image) {
  const cardTemplateCopy = cardsTemplate.firstElementChild.cloneNode(true);
  const cardImage = cardTemplateCopy.querySelector('.card__image');
  const cardTitle = cardTemplateCopy.querySelector('.card__title');
  const cardFavorite = cardTemplateCopy.querySelector('.card__favorite');
  const cardTrash = cardTemplateCopy.querySelector('.card__trash');
  //наполняем содержимым
  cardImage.src = image;
  cardImage.alt = name;
  cardTitle.textContent = name;
  //лайки
  cardFavorite.addEventListener('click', favorite);
  //открытие фото
  cardImage.addEventListener('click', openImage);
  //удаление элемента
  cardTrash.addEventListener('click',() => removeCard(cardTemplateCopy, cardFavorite, cardImage),{once : true});
  return cardTemplateCopy;
}

const defaultSetCards = function(item) {
  cardContainer.append(newCard(item.name, item.link));
};

function openEditForm (){
  popupInputUsername.value = profileName.textContent;
  popupInputSignature.value = profileSignature.textContent;
  openClosePopup(popupEdit);
};

function saveEditForm(event) {
  event.preventDefault();
  profileName.textContent = popupInputUsername.value;
  profileSignature.textContent = popupInputSignature.value;
  openClosePopup(popupEdit);
};

//форма добавления карточки
function openAddForm (event) {
  event.preventDefault();
  openClosePopup(popupAdd);
  cardContainer.prepend(newCard(popupInputCardName.value, popupInputCardUrl.value));
  popupInputCardName.value = '';
  popupInputCardUrl.value = '';
};

profileEditButton.addEventListener('click', openEditForm);
popupClose.addEventListener('click', () => openClosePopup(popupEdit));
formSubmitEdit.addEventListener('submit', saveEditForm);

profileAddButton.addEventListener('click',() => openClosePopup(popupAdd));
popupCloseFormAdd.addEventListener('click', () => openClosePopup(popupAdd));
formSubmitAdd.addEventListener('submit', openAddForm);
popupCloseFullscreenImage.addEventListener('click',() => openClosePopup(fullscreenImage));

initialCards.forEach(defaultSetCards);
