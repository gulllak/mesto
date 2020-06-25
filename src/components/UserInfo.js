export default class UserInfo {
    constructor(userNameSelector, userDescriptionSelector){
        this._name = document.querySelector(userNameSelector);
        this._description= document.querySelector(userDescriptionSelector);
    }

    //возвращает объект с данными пользователя. Подставляем в форму при открытии.
    getUserInfo(){
        return {
            name: this._name.textContent,
            description: this._description.textContent
        }
    }
    //принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo(formData){
        this._name.textContent = formData.username;
        this._description.textContent = formData.signature;
    }
}