import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';

import { ITEM_TYPES, ItemType, IItem, IItemList, fromServer, fromServerItem } from '../model';

const API_KEY = {
	[ITEM_TYPES.MOVIES]:environment.apiKeys[ITEM_TYPES.MOVIES]
}

const GET_ALL_URLS = {
	[ITEM_TYPES.MOVIES]: 'https://api.themoviedb.org/3/discover/movie?api_key='+API_KEY[ITEM_TYPES.MOVIES]+'&sort_by=popularity.desc',
};

const getItemsUrl = (itemType: ItemType, page?:number) => {
	return `${GET_ALL_URLS[itemType]}&page=${page||1}`;
}

const getItemUrl = (itemType: ItemType, itemId:string) => {
	switch (itemType) {
		case ITEM_TYPES.MOVIES:
			return `https://api.themoviedb.org/3/movie/${itemId}?api_key=${API_KEY[ITEM_TYPES.MOVIES]}`;
		default:
			// code...
			break;
	}
}

@Injectable()
export class ItemAPIService {
	constructor(private http: Http) {}

	getItems = (itemType: ItemType, page?:number): Observable<IItemList> =>
	this.http.get(getItemsUrl(itemType, page))
	.map(resp => resp.json())
	.map(data => fromServer(data));

	getItem = (itemType: ItemType, itemId:string): Observable<IItem> =>
	this.http.get(getItemUrl(itemType, itemId))
	.map(resp => resp.json())
	.map(data => fromServerItem(data));
}
