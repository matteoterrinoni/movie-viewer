import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, select, select$ } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import {IAppState} from '../../store/model';
import { ItemAPIActions } from '../api/actions';

import { IItem, ItemApi } from '../model';

@Component({
  selector: 'item',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class ItemComponent {

  baseImagePath = 'assets/cinema.jpg';

  Item$: Observable<IItem>
  actions : ItemAPIActions

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    actions: ItemAPIActions){
    this.actions = actions;
  }

  @Input() itemType: string;
  @Input() itemKey: Observable<string>;
  @select() readonly name$: Observable<string>;
  @Input() loading: Observable<boolean>;
  @Input() error: Observable<any>;

  itemKeyString :string = '0';
  ngOnInit() {
    this.itemKey.subscribe( data =>{
      this.actions.fetchItem(this.itemType, data+'');
      this.itemKeyString = data;
      this.Item$ = this.ngRedux.select([this.itemType, 'items', ItemApi.getKey(data)]);
    })
  }

  getName(item){
    return item ? item.name : 'no name';
  }

  getCurrentItem(state, itemId){
    return state[this.itemType].items[ItemApi.getKey(itemId)];
  }

  ItemApi = ItemApi;
}

