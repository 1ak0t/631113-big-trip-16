import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {FilterType} from './consts';

const MAX_CITIES_IN_ROUTE = 3;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;

const nowDate = dayjs().toISOString();
const blankPoint = {
  type: 'taxi',
  price: 1,
  dateFrom: nowDate,
  dateTo: nowDate,
  offers: [],
  destination: {
    description: '',
    name: '',
    pictures: []
  }
  ,
  isFavorite: false,
};

dayjs.extend(duration);

const getCitiesListOnTopTemplate = (cities) => {
  if (cities.length > MAX_CITIES_IN_ROUTE) {
    return `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  }
  return `${cities.join(' &mdash; ')}`;
};

const replaceWhitespace = (text) => (text.toLowerCase().replace(/ /g,'-'));

const setOfferStatus = (currentsOffer, offers) => offers.some((offer) => currentsOffer.id === offer.id) ? 'checked' : '';

const makeOffersListTemplate = (offers, availableOffers) => {
  const pointOffers = [];
  if (availableOffers.length > 0) {
    availableOffers.forEach((offer) => pointOffers.push(`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${replaceWhitespace(offer.title)}" type="checkbox" name="event-offer-${replaceWhitespace(offer.title)}" data-id="${offer.id}" ${setOfferStatus(offer, offers)}>
        <label class="event__offer-label" for="event-offer-${replaceWhitespace(offer.title)}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`));
  }
  return pointOffers.join('');
};

const setOffersClassByAvailable = (offers) => offers.length > 0 ? 'event__section  event__section--offers' : 'event__section  event__section--offers visually-hidden';

const setPhotosClassByAvailable = (photos) => photos.length > 0 ? 'event__photos-container' : 'event__photos-container visually-hidden';

const setDescriptionClassByAvailable = (description, photos) => (description.length > 0 || photos.length > 0) ? 'event__section  event__section--destination' : 'event__section  event__section--destination visually-hidden';

const makePhotosListTemplate = (photos) => {
  if (photos.length > 0) {
    const pointPhotos = [];
    photos.forEach((photo) => pointPhotos.push(`<img class="event__photo" src="${photo.src}" alt="${photo.description}">`));
    return pointPhotos.join('');
  }
};

const getFormatedTime = (diffMinutes) => {
  if (diffMinutes < MINUTES_IN_HOUR) {
    return dayjs.duration(diffMinutes, 'minute').format('mm[M]');
  }
  if (diffMinutes < MINUTES_IN_DAY && diffMinutes >= MINUTES_IN_HOUR) {
    return dayjs.duration(diffMinutes, 'minute').format('HH[H] mm[M]');
  }
  return dayjs.duration(diffMinutes, 'minute').format('DD[D] HH[H] mm[M]');
};

const getDuration = (dateFrom, dateTo) => {
  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);
  const diffMinutes = dateEnd.diff(dateStart, 'minute');
  return getFormatedTime(diffMinutes);
};

const sortByTime = (pointA, pointB) => {
  const startTimeA = dayjs(pointA.dateFrom);
  const startTimeB = dayjs(pointB.dateFrom);
  if (startTimeB.isAfter(startTimeA)) {
    return -1;
  }
  if (startTimeA.isAfter(startTimeB)) {
    return 1;
  }
  return  0;
};

const sortByPrice = (pointA, pointB) => {
  if (pointB.price < pointA.price) {
    return -1;
  }
  if (pointA.price < pointB.price) {
    return 1;
  }
  return  0;
};

const sortByDuration = (pointA, pointB) => {
  const startTimeA = dayjs(pointA.dateFrom);
  const startTimeB = dayjs(pointB.dateFrom);
  const endTimeA = dayjs(pointA.dateTo);
  const endTimeB = dayjs(pointB.dateTo);
  const durationA = endTimeA.diff(startTimeA, 'minute');
  const durationB = endTimeB.diff(startTimeB, 'minute');
  if (durationA > durationB) {
    return -1;
  }
  if (durationB > durationA) {
    return 1;
  }
  return  0;
};

const filterPointsByPast = (points, dateNow) => points.filter(({ dateFrom }) => dateFrom < dateNow);
const filterPointsByFuture = (points, dateNow) => points.filter(({ dateFrom, dateTo }) => dateFrom > dateNow || (dateFrom < dateNow && dateTo > dateNow));

const filterTypeToFilterPoints = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.PAST]: (points) => filterPointsByPast(points, Date.now()),
  [FilterType.FUTURE]: (points) => filterPointsByFuture(points, Date.now()),
};

const isEqual = (dateA, dateB) => dateA === dateB;

export {blankPoint, getFormatedTime, makePhotosListTemplate, makeOffersListTemplate, setPhotosClassByAvailable, setOffersClassByAvailable,setDescriptionClassByAvailable, sortByPrice, sortByDuration, getDuration, sortByTime, getCitiesListOnTopTemplate, isEqual, filterTypeToFilterPoints, MINUTES_IN_DAY, MINUTES_IN_HOUR};
