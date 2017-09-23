import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';

import { createItemAPIReducer } from '../items/api/reducer';
import { ITEM_TYPES } from '../items/model';

// Define the global store shape by combining our application's
// reducers together into a given structure.
export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    movie: createItemAPIReducer(ITEM_TYPES.MOVIES),
    router: routerReducer,
  }));
