import { TestBed, async } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { RouterTestingModule }  from '@angular/router/testing';

import { Component, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/do';

import { MoviePageComponent } from './page';
import { ItemListComponent } from '../items/item-list/component';
import { ItemComponent } from '../items/item/component';
import { RatingComponent } from '../core/rating/component';
import { ItemAPIActions } from '../items/api/actions';
import { ITEM_TYPES } from '../items/model';

@Component({
	selector: 'item-list',
	template: 'Mock Item List',
})
class MockItemListComponent {
	@Input() itemsName: string;
	@Input() items: Observable<any>;
	@Input() loading: Observable<boolean>;
	@Input() error: Observable<any>;
	@Input() page: Observable<number>;
	@Input() pages_count: Observable<number>;
};

describe('Movie Page Container', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MoviePageComponent, MockItemListComponent, ItemComponent, RatingComponent ],
			imports: [NgReduxTestingModule, RouterTestingModule],
			providers: [ItemAPIActions],
		}).compileComponents();

		MockNgRedux.reset();
	});

	it('should select some movies from the Redux store', done => {
		const fixture = TestBed.createComponent(MoviePageComponent);
		const moviePage = fixture.debugElement.componentInstance;
		const mockStoreSequence = [
			{ movie1:
				{ name: 'I am an Movie!', id: 'movie1' }
			},
			{
				movie1: { name: 'I am an Movie!', id: 'movie1' },
				movie2: { name: 'I am a second Movie!', id: 'movie2' },
			}
		];

		const expectedSequence = [
			{ movie1:
				{ name: 'I am an Movie!', id: 'movie1' }
			},
			{
				movie1: { name: 'I am an Movie!', id: 'movie1' },
				movie2: { name: 'I am a second Movie!', id: 'movie2' },
			}
		];

		const movieItemStub = MockNgRedux.getSelectorStub(['movie', 'items']);
		mockStoreSequence.forEach(value => movieItemStub.next(value));
		movieItemStub.complete();

		moviePage.items$
		.toArray()
		.subscribe(
			actualSequence => expect(actualSequence).toEqual(expectedSequence),
			null,
			done);
	});

	it('should know when the items are loading', done => {
		const fixture = TestBed.createComponent(MoviePageComponent);
		const moviePage = fixture.debugElement.componentInstance;

		const stub = MockNgRedux.getSelectorStub(['movie', 'loading']);
		stub.next(false);
		stub.next(true);
		stub.complete();

		moviePage.loading$
		.toArray()
		.subscribe(
			actualSequence => expect(actualSequence).toEqual([ false, true ]),
			null,
			done);
	});

	it('should know when there\'s an error', done => {
		const fixture = TestBed.createComponent(MoviePageComponent);
		const moviePage = fixture.debugElement.componentInstance;

		const stub = MockNgRedux.getSelectorStub(['movie', 'error']);
		stub.next(false);
		stub.next(true);
		stub.complete();

		moviePage.error$
		.toArray()
		.subscribe(
			actualSequence => expect(actualSequence).toEqual([ false, true ]),
			null,
			done);
	});

	it('should load movies on creation', () => {
		const spy = spyOn(MockNgRedux.mockInstance, 'dispatch');
		const fixture = TestBed.createComponent(MoviePageComponent);

		expect(spy).toHaveBeenCalledWith({
			type: ItemAPIActions.LOAD_ITEMS,
			meta: { itemType: ITEM_TYPES.MOVIES },
			payload: 1,
		});
	});
});
