const popup = document.querySelector('.popup');
const popupOpened = popup.querySelector('.popup_opened');
const closeButton = popup.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const saveButton = document.querySelector('.popup__btn-save');

const popupUsername = document.querySelector('.popup__username');
const popupSignature = document.querySelector('.popup__signature');
const profileName = document.querySelector('.profile__name');
const profileSignature = document.querySelector('.profile__signature');

function editForm() {
  if (popup.classList.contains('popup_opened') === false) {
    popup.classList.add('popup_opened');
    popupUsername.value = profileName.textContent;
    popupSignature.value = profileSignature.textContent;
  } else {
    popup.classList.remove('popup_opened');
  }
}

function saveForm (event) {
  event.preventDefault();
  profileName.textContent = popupUsername.value;
  profileSignature.textContent = popupSignature.value;
  editForm();
}

editButton.addEventListener("click", editForm);
closeButton.addEventListener("click", editForm);
saveButton.addEventListener('click', saveForm);
