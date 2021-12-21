import {RenderPosition, render} from './render.js';
import {createAndInsertElement} from './utils/create-and-insert-element.js';
import {generatePoint} from './mock/point.js';
import TopRouteInfoView from './view/top-routeinfo-view';
import MenuView from './view/menu-view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import EditCreateEventView from './view/edit-create-event-view';
import EventView from './view/event-view';

const POINT_COUNT = 15;

const points = Array.from({length: POINT_COUNT},generatePoint);

const mainTripElement = document.querySelector('.trip-main');
const navigationElement = mainTripElement.querySelector('.trip-controls__navigation');
const filterElement = mainTripElement.querySelector('.trip-controls__filters');

render(mainTripElement, new TopRouteInfoView(points).element, RenderPosition.AFTER_BEGIN);
render(navigationElement, new MenuView().element, RenderPosition.BEFORE_END);
render(filterElement, new FilterView().element, RenderPosition.BEFORE_END);

const tripEventsContainerElement = document.querySelector('.trip-events');

createAndInsertElement('ul', tripEventsContainerElement, 'trip-events__list');

const tripEventsListContainerElement = document.querySelector('.trip-events__list');

const renderPoints = (pointsListElement, point) => {
  const eventComponent = new EventView(point);
  const eventEditComponent = new EditCreateEventView(point);

  const replacePointToEdit = () => {
    pointsListElement.replaceChild(eventEditComponent.element, eventComponent.element);
  };

  const replaceEditToPoint = () => {
    pointsListElement.replaceChild(eventComponent.element, eventEditComponent.element);
  };

  eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replacePointToEdit);

  eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replaceEditToPoint);
  eventEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToPoint();
  });

  render(pointsListElement, eventComponent.element, RenderPosition.BEFORE_END);
};

render(tripEventsListContainerElement, new SortView().element, RenderPosition.BEFORE_BEGIN);
for (let i = 1; i < POINT_COUNT; i++) {
  renderPoints(tripEventsListContainerElement, points[i]);
}

