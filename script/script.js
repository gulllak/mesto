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

const elements = document.querySelector(".elements");
const popupInputCardName = document.querySelector('.popup__input_card-name');
const popupInputCardUrl = document.querySelector('.popup__input_card-url');

const fullscreenImage = document.getElementById('image');
const popupCloseFullscreenImage = document.querySelector('.popup__close_fullscreen-image');
const popupImageFull = document.querySelector('.popup__image_full');
const popupImageSignature = document.querySelector('.popup__image_signature');
const cardImage = document.querySelector('.element__image');

const cardsTemplate = document.querySelector('#cards').content;

const favorite = function(evt){
  evt.target.classList.toggle('element__favorite_active');
};

const openImage = function(event){
  popupImageFull.src = event.target.src;
  popupImageSignature.textContent = event.target.alt;
  openClosePopup(fullscreenImage);
};

const removeCard = function(event){
  event.target.removeEventListener('click',favorite);
  event.target.removeEventListener('click',openImage);
  event.target.removeEventListener("click",removeCard);
  event.target.closest('.element').remove();
};

const defaultSetCards = function(item) {
  elements.append(newElement(item.name, item.link));
};

//создание карточки
function newElement(name, image) {
  const elementTemplateCopy = cardsTemplate.cloneNode(true);
  //наполняем содержимым
  elementTemplateCopy.querySelector('.element__image').src = image;
  elementTemplateCopy.querySelector('.element__image').alt = name;
  elementTemplateCopy.querySelector('.element__title').textContent = name;
  //лайки
  elementTemplateCopy.querySelector('.element__favorite').addEventListener('click', favorite);
  //открытие фото
  elementTemplateCopy.querySelector('.element__image').addEventListener('click', openImage);
  //удаление элемента
  elementTemplateCopy.querySelector('.element__trash').addEventListener('click',removeCard);
  return elementTemplateCopy;
}

function openClosePopup(popup) {
    popup.classList.toggle('popup_opened');
  };

function editForm (){
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
function addForm (event) {
  event.preventDefault();
  openClosePopup(popupAdd);
  elements.prepend(newElement(popupInputCardName.value, popupInputCardUrl.value));
  popupInputCardName.value = '';
  popupInputCardUrl.value = '';
};

profileEditButton.addEventListener('click', editForm);
popupClose.addEventListener('click', () => openClosePopup(popupEdit));
formSubmitEdit.addEventListener('submit', saveEditForm);

profileAddButton.addEventListener('click',() => openClosePopup(popupAdd));
popupCloseFormAdd.addEventListener('click', () => openClosePopup(popupAdd));
formSubmitAdd.addEventListener('submit', addForm);
popupCloseFullscreenImage.addEventListener('click',() => openClosePopup(fullscreenImage));

initialCards.forEach(defaultSetCards);
