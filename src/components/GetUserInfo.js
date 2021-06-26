export class GetUserInfo {
  constructor({ name, about }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    return {name: this._name.textContent, about: this._about.textContent}
  }

  setUserInfo(userData) {
    this._name.textContent = userData.input_name;
    this._about.textContent = userData.input_about;
  }
}
