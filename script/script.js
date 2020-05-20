const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#edit');
const popupClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileSignature = document.querySelector('.profile__signature');
const formEditProfile = document.forms.edit_profile;
const popupInputUsername = formEditProfile.elements.username;
const popupInputSignature = formEditProfile.elements.signature;


const profileAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#add');
const popupCloseFormAdd = document.querySelector('.popup__close_form-add');
const formAddCard = document.forms.add_card;
const popupInputCardName = formAddCard.elements.card_name;
const popupInputCardUrl = formAddCard.elements.card_url;

const cardContainer = document.querySelector(".card-container");

const fullscreenImage = document.querySelector('#image');
const popupImage = document.querySelector('.popup__image');
const popupCloseFullscreenImage = document.querySelector('.popup__close_fullscreen-image');
const popupImageFull = document.querySelector('.popup__image_full');
const popupImageSignature = document.querySelector('.popup__image_signature');

const cardsTemplate = document.querySelector('#cards').content;

const hiddenPopupOverlayEsc = (event) =>{
  const clickInPopupEdit = formEditProfile.contains(event.target);
  const clickInPopupAdd = formAddCard.contains(event.target);
  const clickInPopupImage = popupImage.contains(event.target);

  const isOpenPopupEdit = Array.from(popupEdit.classList).indexOf("popup_opened") !== -1;
  const isOpenPopupAdd = Array.from(popupAdd.classList).indexOf("popup_opened") !== -1;
  const isOpenPopupImage = Array.from(fullscreenImage.classList).indexOf("popup_opened") !== -1;

  const isEsc = event.key === "Escape";

  if(isEsc){
    if(isOpenPopupEdit){
      openClosePopup(popupEdit);
    }
    if(isOpenPopupAdd){
      openClosePopup(popupAdd);
    }
    if(isOpenPopupImage){
      openClosePopup(fullscreenImage);
    }
  } else {
    if(!clickInPopupEdit && isOpenPopupEdit){
      openClosePopup(popupEdit);
    }
    if(!clickInPopupAdd && isOpenPopupAdd){
      openClosePopup(popupAdd);
    }
    if(!clickInPopupImage && isOpenPopupImage){
      openClosePopup(fullscreenImage);
    }
  };
};

popupEdit.addEventListener('click',hiddenPopupOverlayEsc);
popupAdd.addEventListener('click',hiddenPopupOverlayEsc);
fullscreenImage.addEventListener('click',hiddenPopupOverlayEsc);

const addEventListenerEsc = () => {
  document.addEventListener('keyup',hiddenPopupOverlayEsc, {once : true});
}

function openClosePopup(popup) {
  if(popup !== fullscreenImage) {
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    resetHandlerValidation (inputList, popup);
  }
  popup.classList.toggle('popup_opened');
  addEventListenerEsc();
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
  formEditProfile.checkForm();
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
  formAddCard.reset();
};

profileEditButton.addEventListener('click', openEditForm);
popupClose.addEventListener('click', () => openClosePopup(popupEdit));
formEditProfile.addEventListener('submit', saveEditForm);

profileAddButton.addEventListener('click',() => openClosePopup(popupAdd));
popupCloseFormAdd.addEventListener('click', () => openClosePopup(popupAdd));
formAddCard.addEventListener('submit', openAddForm);
popupCloseFullscreenImage.addEventListener('click',() => openClosePopup(fullscreenImage));

initialCards.forEach(defaultSetCards);
