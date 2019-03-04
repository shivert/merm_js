import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return [];
}

const initialState = getInitialState();

export default function categories(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_CATEGORY_LIST:
      const sorted = action.value.categories.sort((a, b) =>
        a.rank > b.rank ? 1 : -1
      );

      return sorted.map(category => ({
        key: category.id,
        ...category
      }));
    case ActionTypes.CLEAR_CATEGORY_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
