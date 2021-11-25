import {renderTemplate, RenderPosition} from './render.js';
import {createRouteInfo} from './view/top-routeinfo-view.js';
import {createTopMenu} from './view/menu-view.js';
import {createFilter} from './view/filter-view.js';
import {createSortBlock} from './view/sort-view.js';
import {createEventEditCreateBlock} from './view/edit-create-event-view.js';
import {createEvent} from './view/event-view.js';

const mainTripElement = document.querySelector('.trip-main');
const navigationElement = mainTripElement.querySelector('.trip-controls__navigation');
const filterElement = mainTripElement.querySelector('.trip-controls__filters');

renderTemplate(mainTripElement, createRouteInfo(), RenderPosition.AFTERBEGIN);
renderTemplate(navigationElement, createTopMenu(), RenderPosition.BEFOREEND);
renderTemplate(filterElement, createFilter(), RenderPosition.BEFOREEND);

const tripEventsContainer = document.querySelector('.trip-events');
const tripEventsListContainer = document.querySelector('.trip-events__list');

renderTemplate(tripEventsContainer, createSortBlock(), RenderPosition.AFTERBEGIN);
renderTemplate(tripEventsListContainer, createEventEditCreateBlock(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsListContainer, createEvent(),RenderPosition.BEFOREEND);
renderTemplate(tripEventsListContainer, createEvent(),RenderPosition.BEFOREEND);
renderTemplate(tripEventsListContainer, createEvent(),RenderPosition.BEFOREEND);
