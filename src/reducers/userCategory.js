import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return {
    data: [
      {
        key: "1",
        name: "Colin VanderGlas1",
        order: 1
      },
      {
        key: "2",
        name: "Colin VanderGlas2",
        order: 2
      },
      {
        key: "3",
        name: "Colin VanderGlas3",
        order: 3
      },
      {
        key: "4",
        name: "Colin VanderGlas4",
        order: 4
      }
    ]
  };
}


const initialState = getInitialState();

export default function userCategory(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_CATEGORY_LIST:
      return action.value;
    case ActionTypes.CLEAR_USER_CATEGORY_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
