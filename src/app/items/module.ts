import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/module';
import { ItemListComponent } from './item-list/component';
import { ItemAPIActions } from './api/actions';
import { ItemAPIEpics } from './api/epics';
import { ItemAPIService } from './api/service';
import { StoreModule } from '../store/module';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { ItemComponent } from './item/component';

import { appRoutes } from '../routes';

@NgModule({
  declarations: [ItemListComponent, ItemComponent],
  exports: [ItemListComponent, ItemComponent],
  imports: [RouterModule.forRoot(appRoutes), CoreModule, StoreModule, CommonModule, VirtualScrollModule],
  providers: [ItemAPIActions, ItemAPIEpics, ItemAPIService],
})
export class ItemModule {}
