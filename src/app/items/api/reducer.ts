import { ItemAPIAction, ItemAPIActions } from './actions';
import { IItemList, ItemType, ItemApi } from '../model';
import { indexBy, prop, merge } from 'ramda';
import { Action } from 'redux';

const INITIAL_STATE: IItemList = {
  items: {},
  page: 0,
  pages_count: 1,
  loading: false,
  error: null
};

// A higher-order reducer: accepts an item type and returns a reducer
// that only responds to actions for that particular item type.
export function createItemAPIReducer(itemType: ItemType) {
  return function itemReducer(state: IItemList = INITIAL_STATE,
    a: Action): IItemList {

    const action = a as ItemAPIAction;
    if (!action.meta || action.meta.itemType !== itemType) {
      return state;
    }

    switch (action.type) {
      case ItemAPIActions.LOAD_STARTED:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ItemAPIActions.LOAD_SUCCEEDED:
        state = {
          ...state,
          items: merge(state.items, indexBy(prop('key'), action.payload.items)),
          page: action.payload.page,
          pages_count: action.payload.pages_count,
          loading: false,
          error: null,
        };
        break;
      case ItemAPIActions.LOAD_ITEM_SUCCEEDED:
        state = {
          ...state,
          items: merge(state.items, indexBy(prop('key'), [action.payload])),
          loading: false,
          error: null,
        };
        break;
      case ItemAPIActions.LOAD_FAILED:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
    }

    return state;
  };
}
