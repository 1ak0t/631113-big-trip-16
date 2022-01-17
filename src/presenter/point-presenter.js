import PointView from '../view/point-view';
import EditCreatePointView from '../view/edit-create-point-view';
import {remove, render, RenderPosition, replace} from '../render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointList = null;
  #point = null;
  #choosedOffers = [];
  #changeData = null;
  #changedMode = null;

  #mode = Mode.DEFAULT;

  #pointComponent = null;
  #editCreatePointComponent = null;

  constructor(pointList, changeData, changeMode) {
    this.#pointList = pointList;
    this.#changeData = changeData;
    this.#changedMode = changeMode;
  }

  init = (point) => {
    this.#point = point;
    this.#makeOfferPropsList();

    const prevPointComponent = this.#pointComponent;
    const prevEditCreatePointComponent = this.#editCreatePointComponent;

    this.#pointComponent = new PointView(this.#point);
    this.#editCreatePointComponent = new EditCreatePointView(this.#point);
    this.#pointComponent.setEditClickHandler(this.#openEditForm);
    this.#pointComponent.setLikeClickHandler(this.#clickLikeButton);
    this.#editCreatePointComponent.setCloseClickHandler(this.#closeEditForm);
    this.#editCreatePointComponent.setSubmitFormHandler(this.#submitForm);
    this.#editCreatePointComponent.setChooseOfferHandler(this.#clickOfferButton);

    if (prevPointComponent === null || prevEditCreatePointComponent === null) {
      render(this.#pointList, this.#pointComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editCreatePointComponent, prevEditCreatePointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditCreatePointComponent);
  }

  destroy = () => {
    document.removeEventListener('keydown', this.#escKeydownHandler);
    remove(this.#pointComponent);
    remove(this.#editCreatePointComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeEditForm();
    }
  }

  #makeOfferPropsList = () => {
    if (!this.#point.selectedOffers){
      this.#point.selectedOffers = [];
    }
  }

  #clickOfferButton = (button) => {
    const offerId = Number(button);
    if (this.#choosedOffers.includes(offerId)) {
      this.#choosedOffers.splice(this.#choosedOffers.indexOf(offerId),1);
      return;
    }
    this.#choosedOffers.push(offerId);
  }

  #clickLikeButton = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #openEditForm = () => {
    replace(this.#editCreatePointComponent, this.#pointComponent);
    this.#changedMode();
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.EDITING;
  };

  #closeEditForm = () => {
    replace(this.#pointComponent, this.#editCreatePointComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
    this.#choosedOffers = [];
  };

  #submitForm = () => {
    replace(this.#pointComponent, this.#editCreatePointComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replace(this.#pointComponent, this.#editCreatePointComponent);
      document.removeEventListener('keydown', this.#escKeydownHandler);
      this.#mode = Mode.DEFAULT;
      this.#choosedOffers = [];
    }
  };
}
