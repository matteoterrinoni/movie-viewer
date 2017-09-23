import { Injectable } from '@angular/core';

import { ITEM_TYPES } from '../items/model';
import { ItemAPIEpics } from '../items/api/epics';

@Injectable()
export class RootEpics {
  constructor(private itemEpics: ItemAPIEpics) {}

  public createEpics() {
    return [
      this.itemEpics.createEpic(ITEM_TYPES.MOVIES),
    ];
  }
}
