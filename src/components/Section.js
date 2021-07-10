export class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;

    this._element = document.querySelector(containerSelector);
  }

  renderInitialCards(data) {
    data.forEach(cardData => {
      // this.addItem(cardData);
      this._element.append(this._renderer(cardData));
    });
  }

  addItem(cardData) {
    this._element.prepend(this._renderer(cardData));
  }
}
