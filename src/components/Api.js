export class Api {
  constructor({ baseUrl, token, cohort }) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._cohort = cohort;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
  }


  getInitialCards() {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(response => this._getResponseData(response));
  }

  getInitialProfile() {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(response => this._getResponseData(response));
  }

  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardData.input_title,
        link: cardData.input_link
      })
    })
    .then(response => this._getResponseData(response));
  }

  updateUserInfo(userData) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.input_name,
        about: userData.input_about
      })
    })
    .then(response => this._getResponseData(response));
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link.input_link
      })
    })
    .then(response => this._getResponseData(response));
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => this._getResponseData(response));
  }

  removeLikeCard(id) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => this._getResponseData(response));
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => this._getResponseData(response));
  }
}
