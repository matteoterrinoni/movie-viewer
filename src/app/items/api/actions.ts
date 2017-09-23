import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IItem, ItemType, IItemList } from '../model';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = any;
interface MetaData { itemType: ItemType; page?:number};
export type ItemAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ItemAPIActions {
  static readonly LOAD_ITEM = 'LOAD_ITEM';
  static readonly LOAD_ITEMS = 'LOAD_ITEMS';
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_ITEM_SUCCEEDED = 'LOAD_ITEM_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  @dispatch()
  loadItems = (itemType: ItemType, page?:number): ItemAPIAction => ({
    type: ItemAPIActions.LOAD_ITEMS,
    meta: { itemType },
    payload: page,
  })

  @dispatch()
  loadStarted = (itemType: ItemType): ItemAPIAction => ({
    type: ItemAPIActions.LOAD_STARTED,
    meta: { itemType },
    payload: null,
  })

  @dispatch()
  loadSucceeded = (itemType: ItemType, payload: Payload): ItemAPIAction => ({
    type: ItemAPIActions.LOAD_SUCCEEDED,
    meta: { itemType },
    payload,
  });

  @dispatch()
  loadItemSucceeded = (itemType: ItemType, payload: Payload): ItemAPIAction => ({
    type: ItemAPIActions.LOAD_ITEM_SUCCEEDED,
    meta: { itemType },
    payload,
  });

  @dispatch()
  loadFailed = (itemType: ItemType, error): ItemAPIAction => ({
    type: ItemAPIActions.LOAD_FAILED,
    meta: { itemType },
    payload: null,
    error,
  })

  @dispatch()
  fetchItem = (itemType: ItemType, itemId?:string): ItemAPIAction => ({
    type: ItemAPIActions.LOAD_ITEM,
    meta: { itemType },
    payload: itemId,
  })
}
