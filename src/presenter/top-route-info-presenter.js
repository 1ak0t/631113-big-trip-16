import {remove, render, RenderPosition} from '../render';
import TopRouteInfoView from '../view/top-route-info-view';
import PointsModel from '../model/points-model';

export default class TopRouteInfoPresenter {
  #topRouteInfoContainer = null;
  #topRouteInfoComponent = new TopRouteInfoView();
  #pointsModel = null;

  constructor(topRouteInfoContainer, pointsModel) {
    this.#topRouteInfoContainer = topRouteInfoContainer;
    this.#pointsModel = pointsModel;
  }

  init = (points) => {
    render(this.#topRouteInfoContainer, new TopRouteInfoView(points), RenderPosition.AFTER_BEGIN);
    this.#pointsModel.addObserver(this.#handlePriceChange);
  }

  destroy = () => {
    remove(this.#topRouteInfoComponent);
  }

  #handlePriceChange = () => {
    this.destroy();
    this.init(this.#pointsModel.points);
  }
}
