import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviePageComponent } from './page';
import { ItemModule } from '../items/module';
import { CoreModule } from '../core/module';
import { StoreModule } from '../store/module';

@NgModule({
  declarations: [MoviePageComponent],
  exports: [MoviePageComponent],
  imports: [ItemModule, CoreModule, StoreModule, CommonModule],
})
export class MovieModule {}
