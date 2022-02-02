const SortType = {
  DEFAULT: 'default',
  DURATION: 'duration',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const MenuItem = {
  NEW_ITEM: 'new-point',
  TABLE: 'table',
  STATS: 'stats',
};

export {SortType, UserAction, UpdateType, FilterType, MenuItem};
