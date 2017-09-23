import { Component, Input } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './component.html',
  styleUrls: [ './component.scss' ],
})
export class RatingComponent {
	@Input() rating: number;
	@Input() votes: number;

	counter = Array;

	getRating(){
		let num = this.rating/2;
		return Math.round(num);
	}
}
