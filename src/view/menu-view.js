import AbstractView from './abstract-view';

const createTopMenuTemplate = () => (
  `<div class="trip-controls__navigation">
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-link-type="table">Table</a>
        <a class="trip-tabs__btn" href="#" data-link-type="stats">Stats</a>
      </nav>
    </div>`
);

class MenuView extends AbstractView{
  get template() {
    return createTopMenuTemplate();
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.dataset.linkType === 'table') {
      document.querySelector('[data-link-type=table]').classList.add('trip-tabs__btn--active');
      document.querySelector('[data-link-type=stats]').classList.remove('trip-tabs__btn--active');
    }
    else {
      document.querySelector('[data-link-type=table]').classList.remove('trip-tabs__btn--active');
      document.querySelector('[data-link-type=stats]').classList.add('trip-tabs__btn--active');
    }
    this._callback.menuClick(evt.target.dataset.linkType);
  }
}

export default MenuView;
