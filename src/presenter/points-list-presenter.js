import ListEmptyView from '../view/list-empty-view';
import PointsListView from '../view/points-list-view';
import SortView from '../view/sort-view';
import {render, RenderPosition} from '../render';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/utils';

export default class PointsListPresenter {
  #pointsListContainer = null;

  #emptyListComponent = new ListEmptyView();
  #pointsListComponent = new PointsListView();
  #sortPointsComponent = new SortView();

  #points = [];
  #pointPresenters = new Map();

  constructor(pointsListContainer) {
    this.#pointsListContainer = pointsListContainer;
  }

  init = (points) => {
    this.#points = [...points];
    this.#renderPointsListContainer();
  }

  #renderEmptyList = () => {
    render(this.#pointsListContainer, this.#emptyListComponent, RenderPosition.BEFORE_END);
  }

  #renderSortComponent = () => {
    render(this.#pointsListComponent, this.#sortPointsComponent, RenderPosition.BEFORE_BEGIN);
  }

  #renderPointsList = () => {
    render(this.#pointsListContainer, this.#pointsListComponent, RenderPosition.BEFORE_END);
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderPointsListContainer = () => {
    if (this.#points.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderPointsList();
      this.#renderSortComponent();
    }
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
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
