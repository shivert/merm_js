import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import fuelSavings from './fuelSavingsReducer';

const rootReducer = combineReducers({
  fuelSavings,
  router: connectRouter(history)
});

export default rootReducer;
