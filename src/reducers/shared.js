import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return [];
}

const initialState = getInitialState();

const mapData = rawData => {
  return rawData.results.map(share => {
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
};

export default function shared(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_SHARED_MERMS_LIST:
      return mapData(action.value);
    case ActionTypes.CLEAR_SHARED_MERMS_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
