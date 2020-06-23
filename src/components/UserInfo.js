export default class UserInfo {
    constructor(userNameSelector, userDescriptionSelector){
        this._name = document.querySelector(userNameSelector);
        this._description= document.querySelector(userDescriptionSelector);
    }

    //возвращает объект с данными пользователя. Подставляем в форму при открытии.
    getUserInfo(){
        this._nameInput = document.querySelector('.popup__input_username');
        this._descriptionInput = document.querySelector('.popup__input_signature');
        this._nameInput.value = this._name.textContent;
        this._descriptionInput.value = this._description.textContent;

        return {
            name: this._nameInput.value,
            description: this._descriptionInput.value
        }
    }
    //принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo(formData){
        this._name.textContent = formData.username;
        this._description.textContent = formData.signature;
    }
}