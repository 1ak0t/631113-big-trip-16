import {RenderPosition, render} from './render.js';
import {generatePoint, offers, destinations} from './mock/point.js';
import TopRouteInfoView from './view/top-route-info-view';
import MenuView from './view/menu-view';
import FilterView from './view/filter-view';
import PointsListPresenter from './presenter/points-list-presenter';

const POINT_COUNT = 10;

const points = Array.from({length: POINT_COUNT},generatePoint);

const mainTripElement = document.querySelector('.trip-main');
const navigationElement = mainTripElement.querySelector('.trip-controls__navigation');
const filterElement = mainTripElement.querySelector('.trip-controls__filters');

render(mainTripElement, new TopRouteInfoView(points), RenderPosition.AFTER_BEGIN);
render(navigationElement, new MenuView(), RenderPosition.BEFORE_END);
render(filterElement, new FilterView(), RenderPosition.BEFORE_END);

const tripEventsContainerElement = document.querySelector('.trip-events');

const pointsListPresenter = new PointsListPresenter(tripEventsContainerElement);
pointsListPresenter.init(points, offers, destinations);
