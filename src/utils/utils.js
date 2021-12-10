const replaceWhitespace = (text) => (text.toLowerCase().replace(/ /g,'-'));

const makeOffersListTemplate = (offers) => {
  const pointOffers = [];
  offers.forEach((offer) => pointOffers.push(`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${replaceWhitespace(offer.title)}" type="checkbox" name="event-offer-${replaceWhitespace(offer.title)}">
        <label class="event__offer-label" for="event-offer-${replaceWhitespace(offer.title)}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`));
  return pointOffers.join('');
};

const isOffers = (offers) => (offers.length > 0 ? 'event__section  event__section--offers' : 'event__section  event__section--offers visually-hidden');

const isPhotos = (photos) => (photos.length > 0 ? 'event__photos-container' : 'event__photos-container visually-hidden');

const makePhotosListTemplate = (photos) => {
  if (photos.length > 0) {
    const pointPhotos = [];
    photos.forEach((photo) => pointPhotos.push(`<img class="event__photo" src="${photo.src}" alt="${photo.description}">`));
    return pointPhotos.join('');
  }
};

export {makePhotosListTemplate, makeOffersListTemplate, isPhotos, isOffers};
