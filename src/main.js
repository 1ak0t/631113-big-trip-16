import {renderTemplate, RenderPosition} from './render.js';
import {createRouteInfoTemplate} from './view/top-routeinfo-view.js';
import {createTopMenuTemplate} from './view/menu-view.js';
import {createFilterTemplate} from './view/filter-view.js';
import {createSortBlockTemplate} from './view/sort-view.js';
import {createEventEditTemplate} from './view/edit-create-event-view.js';
import {createEventTemplate} from './view/event-view.js';
import {createAndInsert} from './utils/create-and-insert.js';

const mainTripElement = document.querySelector('.trip-main');
const navigationElement = mainTripElement.querySelector('.trip-controls__navigation');
const filterElement = mainTripElement.querySelector('.trip-controls__filters');

renderTemplate(mainTripElement, createRouteInfoTemplate(), RenderPosition.AFTER_BEGIN);
renderTemplate(navigationElement, createTopMenuTemplate(), RenderPosition.BEFORE_END);
renderTemplate(filterElement, createFilterTemplate(), RenderPosition.BEFORE_END);

const tripEventsContainerElement = document.querySelector('.trip-events');

createAndInsert('ul', tripEventsContainerElement, 'trip-events__list');

const tripEventsListContainerElement = document.querySelector('.trip-events__list');

renderTemplate(tripEventsListContainerElement, createSortBlockTemplate(), RenderPosition.BEFORE_BEGIN);
renderTemplate(tripEventsListContainerElement, createEventEditTemplate(), RenderPosition.BEFORE_END);
renderTemplate(tripEventsListContainerElement, createEventTemplate(),RenderPosition.BEFORE_END);
renderTemplate(tripEventsListContainerElement, createEventTemplate(),RenderPosition.BEFORE_END);
renderTemplate(tripEventsListContainerElement, createEventTemplate(),RenderPosition.BEFORE_END);
