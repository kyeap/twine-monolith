import { combineReducers } from 'redux';
import logsReducer from './logs';
import volunteersReducer from './volunteers';

// General idea is to keep state in a "normalised" structure
// (see https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
// This means keeping model data (entities) well organised and separate from other system/ui state
export default combineReducers({
  entities: combineReducers({
    logs: logsReducer,
    volunteers: volunteersReducer,
  }),
});
