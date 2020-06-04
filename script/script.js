import {initialCards} from './elements.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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
const popup = Array.from(document.querySelectorAll('.popup'));

const hiddenPopupOverlay = (event) => {
  popup.forEach(elem =>{
    elem.closest('.popup_opened');
    if(event.target === elem){
      closePopup(elem);
      };
    });
};

const hiddenPopupEscape = (event) => {
  const isEsc = event.key === "Escape";
  if(!isEsc) return;
  const checkClass = popup.find((item) => item.classList.contains('popup_opened'));
  if (checkClass) closePopup(checkClass);
};

function hideInputError (object, formElement, input) {
  const errorClass = formElement.querySelector(`#${input.id}-error`);
  input.classList.remove(object.inputErrorClass);
  errorClass.classList.remove(`${object.errorClass}_active`);
  errorClass.textContent = '';
};

function resetHandlerValidation(object, popup) {
  const submitButton = popup.querySelector(object.submitButtonSelector);
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  inputList.forEach(elem => {
       hideInputError(object,popup,elem);
   });
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(object.inactiveButtonClass);
};

function openPopup (popup) {
  resetHandlerValidation (object, popup);
  popup.addEventListener('click', hiddenPopupOverlay);
  document.addEventListener('keydown', hiddenPopupEscape);
  popup.classList.add('popup_opened');
};

function closePopup (popup){
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', hiddenPopupOverlay);
  document.removeEventListener('keydown', hiddenPopupEscape);
};

function buttonActive(){
  const submitButton = popupEdit.querySelector(object.submitButtonSelector);
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove(object.inactiveButtonClass);
}

function openEditForm (){
  popupInputUsername.value = profileName.textContent;
  popupInputSignature.value = profileSignature.textContent;
  openPopup(popupEdit);
  buttonActive();
};

function saveEditForm(event) {
  event.preventDefault();
  profileName.textContent = popupInputUsername.value;
  profileSignature.textContent = popupInputSignature.value;
  closePopup(popupEdit);
};

function openAddForm (event) {
  event.preventDefault();
  closePopup(popupAdd);
  const item = {
    name: popupInputCardName.value,
    link: popupInputCardUrl.value
  }
  const card = new Card(item, '#cards');
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
  formAddCard.reset();
};

profileEditButton.addEventListener('click', openEditForm);
popupClose.addEventListener('click', () => closePopup(popupEdit));
formEditProfile.addEventListener('submit', saveEditForm);

profileAddButton.addEventListener('click',() => openPopup(popupAdd));
popupCloseFormAdd.addEventListener('click', () => closePopup(popupAdd));
formAddCard.addEventListener('submit', openAddForm);

initialCards.forEach((item)=>{
  const card = new Card(item, '#cards');
  const cardElement = card.generateCard();
  cardContainer.append(cardElement)
});

function validation() {
  popup.forEach((form) => {
      const openForm = new FormValidator(object, form);
      openForm.enableValidation();
  });
}

validation();
