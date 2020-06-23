import '../pages/index.css';
import {
  initialCards,
  validationConfig,
  profileEditButton,
  popupEdit,
  profileAddButton,
  popupAdd,
  cardContainer} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

//карточки по умолчанию
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: ()=> {
        popupWithImage.open(item)
      }}, '#cards'
      );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
},
cardContainer
);
cardList.renderItems();

//редактирование профиля
const defaultUserInfo = new UserInfo('.profile__name', '.profile__signature');

const createProfile = new PopupWithForm({
  popupSelector: '#edit',
  formSubmit: (formData) => {
    defaultUserInfo.setUserInfo(formData);
  }
});
createProfile.generateForm();
const popupWithImage = new PopupWithImage('#image');

//создание карточек
const createCard = new PopupWithForm({
  popupSelector: '#add',
  formSubmit: (formData) => {
    const card = new Card({
      data: formData,
      handleCardClick: ()=> {
        popupWithImage.open(formData)
      }}, '#cards'
      );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}) 
const formRenderer = new Section({data: []}, '#add');
const formElement = createCard.generateForm();
formRenderer.addItem(formElement);

//валидация форм
const profileFormValidator =  new FormValidator(validationConfig, popupEdit);
const newCardFormValidator =  new FormValidator(validationConfig, popupAdd);

function validation() {
  profileFormValidator.enableValidation();
  newCardFormValidator.enableValidation();
}
validation();

profileEditButton.addEventListener('click', ()=> {
  defaultUserInfo.getUserInfo();
  profileFormValidator.resetValidation();
  createProfile.open()
});
profileAddButton.addEventListener('click', () => {
  newCardFormValidator.resetValidation();
  createCard.open()
});