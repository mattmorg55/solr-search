import { Component, Input } from '@angular/core';

@Component({
  selector: 'review-status',
  templateUrl: './review-status.component.html',
  styleUrls: ['./review-status.component.css']
})
export class ReviewStatusComponent {

	@Input() status: string;

	approved = "APPROVED";
	unknown = "UNKNOWN";
	toBeReviewed = "TO_BE_REVIEWED";
	checkedOut = "CHECKED_OUT";
	preQA = "PRE_QA";
	reviewed = "REVIEWED";

  constructor() { }

}
