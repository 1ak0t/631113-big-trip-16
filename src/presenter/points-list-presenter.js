import ListEmptyView from '../view/list-empty-view';
import PointsListView from '../view/points-list-view';
import SortView from '../view/sort-view';
import {remove, render, RenderPosition} from '../render';
import PointPresenter from './point-presenter';
import {sortByPrice, sortByDuration, sortByTime, filterTypeToFilterPoints} from '../utils/utils';
import {FilterType, SortType, UpdateType, UserAction} from '../utils/consts';
import PointNewPresenter from './point-new-presenter';
import LoadingView from '../view/loading-view';
import {State} from '../utils/consts';

class PointsListPresenter {
  #pointsModel = null;
  #pointsListContainer = null;
  #filterModel = null;
  #currentFilter = null;
  #pointNewPresenter = null;

  #emptyListComponent = null;
  #pointsListComponent = new PointsListView();
  #sortPointsComponent = new SortView();
  #loadingComponent = new LoadingView();

  #offers = [];
  #destinations = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(pointsListContainer, pointsModel, filterModel) {
    this.#pointsListContainer = pointsListContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#pointsListComponent, this.#handleViewAction);
  }

  get points() {
    if (this.#currentFilter !== this.#filterModel.filter) {
      this.#currentFilter = this.#filterModel.filter;
      this.#currentSortType = SortType.DEFAULT;
      remove(this.#sortPointsComponent);
      this.#renderSortComponent();
    }

    const points = this.#pointsModel.points;
    const filteredPoints = filterTypeToFilterPoints[this.#currentFilter](points);

    switch (this.#currentSortType) {
      case SortType.DURATION: {
        return filteredPoints.sort(sortByDuration);
      }
      case SortType.PRICE: {
        return filteredPoints.sort(sortByPrice);
      }
    }

    return filteredPoints.sort(sortByTime);
  }

  init = (offers, destinations) => {
    this.#offers = [...offers];
    this.#destinations = [...destinations];
    this.#renderPointsListContainer();

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  destroy = () => {
    remove(this.#pointsListComponent);
    remove(this.#sortPointsComponent);
    remove(this.#emptyListComponent);

    this.#clearPointsList();

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createPoint = () => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    remove(this.#emptyListComponent);
    render(this.#pointsListContainer, this.#pointsListComponent, RenderPosition.BEFORE_END);
    this.#pointNewPresenter.init(this.#offers, this.#destinations);
  }

  #handleViewAction = async (actionType, updateType, updatedPoint) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT: {
        this.#pointPresenters.get(updatedPoint.id).setViewState(State.SAVING);
        try {
          await this.#pointsModel.updatePoint(updateType, updatedPoint);
        } catch (error) {
          this.#pointPresenters.get(updatedPoint.id).setViewState(State.ABORTING);
        }
        break;
      }
      case UserAction.ADD_POINT: {
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, updatedPoint);
        } catch (error) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      }
      case UserAction.DELETE_POINT: {
        this.#pointPresenters.get(updatedPoint.id).setViewState(State.DELETING);
        try {
          await this.#pointsModel.deletePoint(updateType, updatedPoint);
        } catch (error) {
          this.#pointPresenters.get(updatedPoint.id).setViewState(State.ABORTING);
        }
        break;
      }
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH: {
        this.#pointPresenters.get(data.id).init(data, this.#offers, this.#destinations);
        break;
      }
      case UpdateType.MINOR: {
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      }
    }
  }

  #renderEmptyList = () => {
    this.#emptyListComponent = new ListEmptyView(this.#currentFilter);
    render(this.#pointsListContainer, this.#emptyListComponent, RenderPosition.BEFORE_END);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  }

  #renderSortComponent = () => {
    render(this.#pointsListComponent, this.#sortPointsComponent, RenderPosition.BEFORE_BEGIN);
    this.#sortPointsComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderPointsList = () => {
    if (this.points.length === 0) {
      this.#renderEmptyList();
    } else {
      render(this.#pointsListContainer, this.#pointsListComponent, RenderPosition.BEFORE_END);
      this.points.forEach((point) => this.#renderPoint(point));
    }
  }

  #renderPointsListContainer = () => {
    this.#renderPointsList();
    this.#renderSortComponent();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#offers, this.#destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #clearPointsList = () => {
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
    remove(this.#loadingComponent);
    this.#pointNewPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}

export default PointsListPresenter;
