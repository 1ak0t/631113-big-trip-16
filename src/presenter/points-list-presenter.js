import ListEmptyView from '../view/list-empty-view';
import PointsListView from '../view/points-list-view';
import SortView from '../view/sort-view';
import {render, RenderPosition} from '../render';
import PointPresenter from './point-presenter';
import {sortByPrice, sortByDuration, updateItem, sortByTime} from '../utils/utils';
import {SortType} from '../utils/consts';

export default class PointsListPresenter {
  #pointsListContainer = null;

  #emptyListComponent = new ListEmptyView();
  #pointsListComponent = new PointsListView();
  #sortPointsComponent = new SortView();

  #points = [];
  #offers = [];
  #destinations = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedPoints = [];

  constructor(pointsListContainer) {
    this.#pointsListContainer = pointsListContainer;
  }

  init = (points, offers, destinations) => {
    points.sort(sortByTime);
    this.#points = [...points];
    this.#sourcedPoints = [...points];
    this.#offers = [...offers];
    this.#destinations = [...destinations];
    this.#renderPointsListContainer();
  }

  #renderEmptyList = () => {
    render(this.#pointsListContainer, this.#emptyListComponent, RenderPosition.BEFORE_END);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DURATION:
        this.#points.sort(sortByDuration);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  }

  #renderSortComponent = () => {
    render(this.#pointsListComponent, this.#sortPointsComponent, RenderPosition.BEFORE_BEGIN);
    this.#sortPointsComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderPointsList = () => {
    render(this.#pointsListContainer, this.#pointsListComponent, RenderPosition.BEFORE_END);
    this.#points.forEach((point) => this.#renderPoint(point, this.#offers, this.#destinations));
  }

  #renderPointsListContainer = () => {
    if (this.#points.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderPointsList();
      this.#renderSortComponent();
    }
  }

  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #clearPointsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
