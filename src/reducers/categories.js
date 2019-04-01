import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return [];
}

const initialState = getInitialState();

const mapDataSearch = categories =>
  categories.map(c => ({
    ...c._source,
    key: c._source.id
  }));

const mapData = categories => {
  const sorted = categories.sort((a, b) => (a.rank > b.rank ? 1 : -1));

  return sorted.map(category => ({
    key: category.id,
    ...category
  }));
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_DASHBOARD_CATEGORY_LIST:
      return mapDataSearch(action.value.results);
    case ActionTypes.UPDATE_CATEGORY_LIST:
      return mapData(action.value.categories);
    case ActionTypes.CLEAR_CATEGORY_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
