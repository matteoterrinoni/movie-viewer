import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, select$ } from '@angular-redux/store';
import { pipe, values, sortBy, prop } from 'ramda';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ItemAPIActions } from '../items/api/actions';
import { ITEM_TYPES, IItem } from '../items/model';

@Component({
  templateUrl: './page.html',
  styleUrls: ['./page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviePageComponent {
  movieId$: Observable<string>;
  // Get movie-related data out of the Redux store as observables.
  @select(['movie', 'items'])
  readonly items$: Observable<IItem[]>;

  @select(['movie', 'loading'])
  readonly loading$: Observable<boolean>;

  @select(['movie', 'page'])
  readonly page$: Observable<boolean>;

  @select(['movie', 'pages_count'])
  readonly pages_count$: Observable<boolean>;

  @select(['movie', 'error'])
  readonly error$: Observable<any>;

  constructor(
    actions: ItemAPIActions,
    private route: ActivatedRoute,
    private router: Router) {
    actions.loadItems(ITEM_TYPES.MOVIES, 1);
  }

  ngOnInit() {
    this.movieId$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        let id = params.getAll('id')[0];
        console.log(id);
        return params.getAll('id');
      });
  }

  log(val) { console.log(val); }
}
