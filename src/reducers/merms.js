import * as ActionTypes from "../constants/ActionTypes";
import { groupBy } from "../utils/groupBy";

export function getInitialState() {
  return {};
}

const initialState = getInitialState();

const mapData = rawData => {
  const favorites = rawData.favorites.map(merm => merm._source);
  const recent = rawData.recent.map(merm => merm._source);
  const shared = rawData.shared.map(share => {
    return {
      shared: true,
      id: share._source.merm.id,
      name: share._source.merm.name,
      user: share._source.sharer,
      last_accessed: share._source.created_at,
      content_type: share._source.merm.content_type,
      resource_url: share._source.merm.resource_url,
      tags: share._source.merm.get_tags.map(tag => ({ name: tag }))
    };
  });

  const data = groupBy(
    rawData.custom.map(merm => merm._source),
    merm => merm.category_id
  );

  const results = Object.assign(
    {},
    ...[...data.entries()].map(([k, v]) => ({ [k]: v }))
  );

  return {
    ...results,
    Favorites: favorites,
    Recent: recent,
    "Unread Resources": shared
  };
};

export default function merms(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_MERM_LIST:
      return mapData(action.value);
    case ActionTypes.CLEAR_MERM_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
