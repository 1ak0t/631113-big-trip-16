import PointView from '../view/point-view';
import EditCreatePointView from '../view/edit-create-point-view';
import {remove, render, RenderPosition, replace} from '../render';
import {UpdateType, UserAction} from '../utils/consts';
import {isEqual} from '../utils/utils';
import {State} from '../utils/consts';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class PointPresenter {
  #pointList = null;
  #point = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;

  #pointComponent = null;
  #editCreatePointComponent = null;

  #offers = [];
  #destinations = [];

  constructor(pointList, changeData, changeMode) {
    this.#pointList = pointList;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, offers, destinations) => {
    this.#point = point;
    this.#offers = [...offers];
    this.#destinations = [...destinations];

    const prevPointComponent = this.#pointComponent;
    const prevEditCreatePointComponent = this.#editCreatePointComponent;

    this.#pointComponent = new PointView(this.#point);
    this.#editCreatePointComponent = new EditCreatePointView(this.#point, this.#offers, this.#destinations);
    this.#pointComponent.setEditClickHandler(this.#openEditForm);
    this.#pointComponent.setLikeClickHandler(this.#clickLikeButton);
    this.#editCreatePointComponent.setCloseClickHandler(this.#closeEditForm);
    this.#editCreatePointComponent.setSubmitFormHandler(this.#submitForm);
    this.#editCreatePointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevEditCreatePointComponent === null) {
      render(this.#pointList, this.#pointComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevEditCreatePointComponent);
      this.#mode = Mode.DEFAULT;
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
      this.#editCreatePointComponent.reset(this.#point);
      this.#closeEditForm();
    }
  }

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#editCreatePointComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING: {
        this.#editCreatePointComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      }
      case State.DELETING: {
        this.#editCreatePointComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      }
      case State.ABORTING: {
        this.#pointComponent.shake(resetFormState);
        this.#editCreatePointComponent.shake(resetFormState);
        break;
      }
    }
  }

  #clickLikeButton = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  }

  #changeOpenToClosePoint = () =>  {
    replace(this.#pointComponent, this.#editCreatePointComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #openEditForm = () => {
    replace(this.#editCreatePointComponent, this.#pointComponent);
    this.#changeMode();
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.EDITING;
  };

  #closeEditForm = () => {
    this.#editCreatePointComponent.reset(this.#point);
    this.#changeOpenToClosePoint();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  }

  #submitForm = (point) => {
    const isMinorUpdate = isEqual(this.#point.dateFrom, point.dateFrom) && isEqual(this.#point.dateTo, point.dateTo) && isEqual(this.#point.price, point.price);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.PATCH: UpdateType.MINOR,
      point
    );
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editCreatePointComponent.reset(this.#point);
      this.#changeOpenToClosePoint();
    }
  };
}

export default PointPresenter;
