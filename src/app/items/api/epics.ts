import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware, combineEpics } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';

import { IAppState } from '../../store/model';
import { ItemType } from '../model';
import { ItemAPIAction, ItemAPIActions } from './actions';
import { ItemAPIService } from './service';

const itemsNotAlreadyFetched = (itemType: ItemType, state: IAppState, page?:number): boolean => !(
    state[itemType] &&
    state[itemType].items &&
    Object.keys(state[itemType].items).length &&
    (!page || (page && page<=state[itemType].pages_count))
);

const actionIsForCorrectItemType = (itemType: ItemType) =>
  (action: ItemAPIAction): boolean =>
    action.meta.itemType === itemType;

@Injectable()
export class ItemAPIEpics {
  constructor(
    private service: ItemAPIService,
    private actions: ItemAPIActions,
  ) {}

  public createEpic(itemType: ItemType, page?:number) {
    return createEpicMiddleware(combineEpics(
      this.createLoadItemsEpic(itemType),
      this.createLoadItemEpic(itemType)
    ));
  }

  private createLoadItemsEpic(itemType: ItemType) {
    return (action$, store) => action$
      .ofType(ItemAPIActions.LOAD_ITEMS)
      //.filter(action => actionIsForCorrectItemType(itemType)(action))
      //.filter(() => itemsNotAlreadyFetched(itemType, store.getState(), page))
      .mergeMap(({payload}) => this.service.getItems(itemType, payload)
        .map(data => {
          return this.actions.loadSucceeded(itemType, data)
        })
        .catch(response => of(this.actions.loadFailed(itemType, {
          status: '' + response.status,
        })))
        .startWith(this.actions.loadStarted(itemType)));
  }

  private createLoadItemEpic(itemType: ItemType) {
    return (action$, store) => action$
      .ofType(ItemAPIActions.LOAD_ITEM)
      //.filter(action => actionIsForCorrectItemType(itemType)(action))
      //.filter(() => itemsNotAlreadyFetched(itemType, store.getState(), page))
      .mergeMap(({payload}) => this.service.getItem(itemType, payload)
        .map(data => {
          return this.actions.loadItemSucceeded(itemType, data)
        })
        .catch(response => of(this.actions.loadFailed(itemType, {
          status: '' + response.status,
        })))
        .startWith(this.actions.loadStarted(itemType)));
  }
}
