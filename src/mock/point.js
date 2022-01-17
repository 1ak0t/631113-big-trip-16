import dayjs from 'dayjs';
import {getRandomNumberInt} from './randomaizer.js';
import {nanoid} from 'nanoid';

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

const offers = [
  {
    'type' : 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 100,
      },
      {
        'id': 2,
        'title': 'Choose radio station',
        'price': 40,
      },
      {
        'id': 3,
        'title': 'Big luggage',
        'price': 140,
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 1,
        'title': 'Top floor',
        'price': 30,
      },
      {
        'id': 2,
        'title': 'Conditioner',
        'price': 20,
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 1,
        'title': 'Speed train',
        'price': 40,
      },
      {
        'id': 2,
        'title': 'Compartment',
        'price': 100,
      },
      {
        'id': 3,
        'title': 'Feeding',
        'price': 60,
      }
    ]
  },
  {
    'type': 'ship',
    'offers': []
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 1,
        'title': 'Driver',
        'price': 150,
      },
      {
        'id': 2,
        'title': 'Elite car',
        'price': 1000,
      },
      {
        'id': 3,
        'title': 'Conditioner',
        'price': 30,
      },
      {
        'id': 4,
        'title': 'Cabriolet',
        'price': 220,
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'Buisness class',
        'price': 200,
      },
      {
        'id': 2,
        'title': 'First class',
        'price': 800,
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': 1,
        'title': 'Suite',
        'price': 100,
      },
      {
        'id': 2,
        'title': 'Family',
        'price': 200,
      },
      {
        'id': 3,
        'title': 'Apartments ',
        'price': 220,
      },
      {
        'id': 4,
        'title': 'Executive',
        'price': 350,
      },
      {
        'id': 5,
        'title': 'President',
        'price': 1300,
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 1,
        'title': 'dinner',
        'price': 30,
      }
    ]
  },
];

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomNumberInt(0, array.length - 1);
  return array[randomIndex];
};

const getPointTypes = (types) => {
  const pointTypes = [];
  types.forEach((item) => pointTypes.push(item.type));
  return pointTypes;
};

const getOffers = (offersDatas, type) => offersDatas.filter((offer) => offer['type'] === type)[0].offers;

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
    const photoSpecification = {};
    photoSpecification.src = `http://picsum.photos/248/152?r=${getRandomNumberInt(0,100)}`;
    photoSpecification.description = getDescription(description);
    photos.push(photoSpecification);
  }
  return photos;
};

const makeCityDatalistTemplate = (cities) => {
  const pointCities = [];
  cities.forEach((city) => pointCities.push(`<option value="${city}"></option>`));
  return pointCities.join('');
};

const getDate = () => (dayjs().add(getRandomNumberInt(0,10), 'day').add(getRandomNumberInt(0,24), 'hour'));
const getSecondDate = (firstDate) => {
  let secondDate = getDate();

  while (secondDate.isBefore(firstDate)) {
    secondDate = getDate();
  }
  return secondDate;
};

export const generatePoint = () => {
  const eventType = getRandomArrayElement(getPointTypes(offers));
  const dateFrom = getDate();
  return {
    id: nanoid(),
    type: eventType,
    price: getRandomNumberInt(0, 2000),
    dateFrom: dateFrom,
    dateTo: getSecondDate(dateFrom),
    offers: getOffers(offers ,eventType),
    destination: {
      description: getDescription(description),
      name: getRandomArrayElement(Cities),
      pictures: getPhotos(),
    },
    isFavorite: Boolean(getRandomNumberInt(0,1)),
    cityList: makeCityDatalistTemplate(Cities),
  };
};
