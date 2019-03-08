import * as ActionTypes from "../constants/ActionTypes";
import { groupBy } from "../utils/groupBy";

export function getInitialState() {
  return {};
}

const initialState = getInitialState();

const mapData = data =>
  groupBy(data.results.map(merm => merm._source), merm => merm.category_id);

export default function merms(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_MERM_LIST:
      const data = mapData(action.value);
      return Object.assign(
        {},
        ...[...data.entries()].map(([k, v]) => ({ [k]: v }))
      );
    case ActionTypes.CLEAR_MERM_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
