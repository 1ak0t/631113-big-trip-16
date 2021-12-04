import {getRandomNumberInt} from '../utils/randomaizer.js';

const EventTypes = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-In',
  'Sightseeing',
  'restaurant'
];

const Cities = [
  'Vienna',
  'Tirana',
  'Minsk',
  'Brussels',
  'Sophia',
  'Sarajevo',
  'Vatican City',
  'London',
  'Budapest',
  'Berlin',
  'Gibraltar',
  'Athens',
  'Copenhagen',
  'Dublin',
  'Reykjavik',
  'Madrid',
  'Rome',
  'Riga',
  'Luxembourg',
  'Chisinau',
  'Monaco',
  'Amsterdam',
  'Oslo',
  'Warsaw',
  'Lisbon',
  'Bucharest',
  'Moscow',
  'San Marino',
  'Belgrade',
  'Bratislava',
  'Kiev',
  'Helsinki',
  'Paris',
  'Zagreb',
  'Prague',
  'Stockholm',
  'Tallinn',
];

const offersByType = {
  'taxi': {
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 100,
      },
      {
        'title': 'Choose radio station',
        'price': 40,
      },
      {
        'title': 'Big luggage',
        'price': 140,
      }
    ]
  },
  'bus': {
    'offers': [
      {
        'title': 'Top floor',
        'price': 30,
      },
      {
        'title': 'Conditioner',
        'price': 20,
      }
    ]
  },
  'train': {
    'offers': [
      {
        'title': 'Speed train',
        'price': 40,
      },
      {
        'title': 'Compartment',
        'price': 100,
      },
      {
        'title': 'Feeding',
        'price': 60,
      }
    ]
  },
  'ship': {
    'offers': []
  },
  'drive': {
    'offers': [
      {
        'title': 'Driver',
        'price': 150,
      },
      {
        'title': 'Elite car',
        'price': 1000,
      },
      {
        'title': 'Conditioner',
        'price': 30,
      },
      {
        'title': 'Cabriolet',
        'price': 220,
      }
    ]
  },
  'flight': {
    'offers': [
      {
        'title': 'Buisness class',
        'price': 200,
      },
      {
        'title': 'First class',
        'price': 800,
      }
    ]
  },
  'check-in': {
    'offers': [
      {
        'title': 'Suite',
        'price': 100,
      },
      {
        'title': 'Family',
        'price': 200,
      },
      {
        'title': 'Apartments ',
        'price': 220,
      },
      {
        'title': 'Executive',
        'price': 350,
      },
      {
        'title': 'President',
        'price': 1300,
      }
    ]
  },
  'sightseeing': {
    'offers': []
  },
  'restaurant': {
    'offers': [
      {
        'title': 'dinner',
        'price': 30,
      }
    ]
  },
};

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomNumberInt(0, array.length - 1);
  return array[randomIndex];
};

const getOffers = (type) => (offersByType[type.toLowerCase()].offers);

const getDescription = (text) => {
  const descriptionRandomArray = [];
  const descriptionArray = text.match(/[^.!?]+[.!?]+["']?|.+$/g);
  for (let i = 1; i <= getRandomNumberInt(1,5); i++) {
    descriptionRandomArray.push(getRandomArrayElement(descriptionArray));
  }
  return descriptionRandomArray.join('');
};

const getPhotos = () => {
  const photos = [];
  for (let i = 1; i <= getRandomNumberInt(1,5); i++) {
    photos.push(`http://picsum.photos/248/152?r=${getRandomNumberInt(0,100)}`);
  }
  return photos;
};

export const generatePoint = () => {
  const eventType = getRandomArrayElement(EventTypes);
  return {
    type: eventType,
    city: getRandomArrayElement(Cities),
    price: getRandomNumberInt(0, 2000),
    offers: getOffers(eventType),
    description: getDescription(description),
    photos: getPhotos(),
    isFavorite: Boolean(getRandomNumberInt(0,1)),
  };
};

export {Cities};
