import { IItemList } from '../items/model';

export interface IAppState {
  [itemType: string]: IItemList;
  routes?: any;
  feedback?: any;
}
