const replaceWhitespace = (text) => (text.toLowerCase().replace(/ /g,'-'));

const makeOffersListTemplate = (offers) => {
  const pointOffers = [];
  offers.forEach((offer) => pointOffers.push(`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${replaceWhitespace(offer.title)}" type="checkbox" name="event-offer-${replaceWhitespace(offer.title)}" data-id="${offer.id}">
        <label class="event__offer-label" for="event-offer-${replaceWhitespace(offer.title)}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`));
  return pointOffers.join('');
};

const checkAvailableOffers = (offers) => offers.length > 0 ? 'event__section  event__section--offers' : 'event__section  event__section--offers visually-hidden';

const checkAvailablePhotos = (photos) => photos.length > 0 ? 'event__photos-container' : 'event__photos-container visually-hidden';

const makePhotosListTemplate = (photos) => {
  if (photos.length > 0) {
    const pointPhotos = [];
    photos.forEach((photo) => pointPhotos.push(`<img class="event__photo" src="${photo.src}" alt="${photo.description}">`));
    return pointPhotos.join('');
  }
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {makePhotosListTemplate, makeOffersListTemplate, checkAvailablePhotos, checkAvailableOffers, updateItem};
