import EditCreatePointView from '../view/edit-create-point-view';
import {remove, render, RenderPosition} from '../render';
import {UpdateType, UserAction} from '../utils/consts';
import dayjs from 'dayjs';

const nowDate = dayjs().toISOString();

const blankPoint = {
  type: 'taxi',
  price: 1,
  dateFrom: nowDate,
  dateTo: nowDate,
  offers: [],
  destination: {
    description: '',
    name: '',
    pictures: []
  }
  ,
  isFavorite: false,
};

export default class PointNewPresenter {
  #pointList = null;
  #changeData = null;
  #editCreatePointComponent = null;

  #offers = [];
  #destinations = [];

  constructor(pointList, changeData) {
    this.#pointList = pointList;
    this.#changeData = changeData;
  }

  init = (offers, destinations) => {
    this.#offers = [...offers];
    this.#destinations = [...destinations];

    this.#editCreatePointComponent = new EditCreatePointView(blankPoint, this.#offers, this.#destinations);
    this.#editCreatePointComponent.setSubmitFormHandler(this.#submitForm);
    this.#editCreatePointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointList, this.#editCreatePointComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener('keydown', this.#escKeydownHandler);
  }

  destroy = () => {
    document.removeEventListener('keydown', this.#escKeydownHandler);
    remove(this.#editCreatePointComponent);
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #submitForm = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
    this.destroy();
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
