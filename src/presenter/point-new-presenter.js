import EditCreatePointView from '../view/edit-create-point-view';
import {remove, render, RenderPosition} from '../render';
import {UpdateType, UserAction} from '../utils/consts';
import {blankPoint} from '../utils/utils';

class PointNewPresenter {
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

    this.#editCreatePointComponent.element.querySelector('.event__reset-btn').textContent = 'Cancel';
    this.#editCreatePointComponent.element.querySelector('.event__rollup-btn').style.display = 'none';

    render(this.#pointList, this.#editCreatePointComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener('keydown', this.#escKeydownHandler);
  }

  destroy = () => {
    document.removeEventListener('keydown', this.#escKeydownHandler);
    remove(this.#editCreatePointComponent);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  setSaving = () => {
    this.#editCreatePointComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#editCreatePointComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editCreatePointComponent.shake(resetFormState);
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

export default PointNewPresenter;
