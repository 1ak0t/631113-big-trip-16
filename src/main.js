import {RenderPosition, render} from './render.js';
import {generatePoint, offers, destinations} from './mock/point.js';
import TopRouteInfoView from './view/top-route-info-view';
import MenuView from './view/menu-view';
import PointsListPresenter from './presenter/points-list-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const POINT_COUNT = 10;

const points = Array.from({length: POINT_COUNT},generatePoint);

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const mainTripElement = document.querySelector('.trip-main');
const navigationElement = mainTripElement.querySelector('.trip-controls__navigation');
const filterElement = mainTripElement.querySelector('.trip-controls__filters');

render(mainTripElement, new TopRouteInfoView(points), RenderPosition.AFTER_BEGIN);
render(navigationElement, new MenuView(), RenderPosition.BEFORE_END);

const filterPresenter = new FilterPresenter(filterElement, filterModel);
filterPresenter.init();

const tripEventsContainerElement = document.querySelector('.trip-events');

const pointsListPresenter = new PointsListPresenter(tripEventsContainerElement, pointsModel, filterModel);
pointsListPresenter.init(offers, destinations);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  pointsListPresenter.createPoint();
});
