import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IItem, IItemList, ItemApi } from '../model';
import { ChangeEvent } from 'angular2-virtual-scroll';
import { select, select$ } from '@angular-redux/store';
import { ItemAPIActions } from '../api/actions';
import {sort, prop, descend} from 'ramda';

@Component({
  selector: 'item-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent {
  @Input() itemsName: string;
  @Input() itemType: string;
  @Input() items: Observable<IItem[]>;
  @Input() loading: Observable<boolean>;
  @Input() error: Observable<any>;
  @Input() page: Observable<number>;
  @Input() pages_count: Observable<number>;

  itemsArray: Array<any> = [];
  currentPage: number = 0;
  pagesCount: number = 1;

  ItemApi = ItemApi;

  actions : ItemAPIActions
  constructor(actions: ItemAPIActions){
    //actions.loadItems('movies', 1);
    this.actions = actions;
  }

  protected onListChange(event: ChangeEvent) {
    if (event.end !== this.itemsArray.length) return;
    if(this.currentPage+1>this.pagesCount) return;
    this.actions.loadItems(this.itemType, this.currentPage+1);
  }

  //byPopularity = descend(prop('popularity'));
  ngOnInit() {
    this.items.subscribe( data =>{
      //var dataByPopularity = sort(this.byPopularity, Object.values(data));
      this.itemsArray = Object.values(data);
    })

    this.page.subscribe( data =>{
      this.currentPage = data;
    })

    this.pages_count.subscribe( data =>{
      this.pagesCount = data;
    })
  }

  getKey(_, item: IItem) {
    return item.id;
  }

  getArray(obj){
    return Object.values(obj)
  }
}
