export class UserInfo {
  constructor({ name, about, avatar }) {
    this._nameElement = document.querySelector(name);
    this._aboutElement = document.querySelector(about);
    this._avatarElement = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    }
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._aboutElement.textContent = userData.about;
    this._avatarElement.src = userData.avatar;
    this._avatarElement.alt = userData.name;
  }
}
