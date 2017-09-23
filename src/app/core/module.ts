import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spinner/component';
import { ErrorWellComponent } from './error-well/component';
import { RatingComponent } from './rating/component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorWellComponent,
    RatingComponent
  ],
  imports: [ CommonModule ],
  exports: [
    SpinnerComponent,
    ErrorWellComponent,
    RatingComponent
  ],
})
export class CoreModule {}
