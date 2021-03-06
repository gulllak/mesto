import '../pages/index.css';
import {
  initialCards,
  validationConfig,
  profileEditButton,
  popupEdit,
  profileAddButton,
  popupAdd,
  cardContainer,
  nameInput,
  descriptionInput,
  form} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const openImage = (item) => {
        popupWithImage.open(item)
      };

const popupWithImage = new PopupWithImage('#image');
//карточки по умолчанию
const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: ()=> openImage(item)}, '#cards'
      );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
},
cardContainer
);
cardList.renderItems();

//создание карточек
const createCard = new PopupWithForm({
  popupSelector: '#add',
  formSubmit: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: ()=> openImage(item)}, '#cards'
      );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}) 
createCard.setEventListeners();
//редактирование профиля
const defaultUserInfo = new UserInfo('.profile__name', '.profile__signature');

const createProfile = new PopupWithForm({
  popupSelector: '#edit',
  formSubmit: (formData) => {
    defaultUserInfo.setUserInfo(formData);
  }
});
createProfile.setEventListeners();

const openProfileForm = () => {
  const infoProfile = defaultUserInfo.getUserInfo();
  nameInput.value = infoProfile.name;
  descriptionInput.value = infoProfile.description;    
  profileFormValidator.resetValidation();
  createProfile.open()       
}

//валидация форм
const profileFormValidator =  new FormValidator(validationConfig, popupEdit);
const newCardFormValidator =  new FormValidator(validationConfig, popupAdd);

function validation() {
  profileFormValidator.enableValidation();
  newCardFormValidator.enableValidation();
}
validation();

profileEditButton.addEventListener('click', openProfileForm);
profileAddButton.addEventListener('click', () => {
  newCardFormValidator.resetValidation();
  createCard.open()
  form.reset();
});