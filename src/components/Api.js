export class Api {
  constructor({ baseUrl, token, cohort }) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._cohort = cohort;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      });
  }

  getInitialProfile() {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      });
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
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      });
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
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      });
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
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      });
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      });
  }

  removeLikeCard(id) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      });
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      });
  }
}
