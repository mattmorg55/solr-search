import { Component, Input } from '@angular/core';

@Component({
  selector: 'level-of-completion',
  templateUrl: './level-of-completion.component.html',
  styleUrls: ['./level-of-completion.component.css']
})
export class LevelOfCompletionComponent {

	@Input() level: string;

	_new = "NEW";
	inProgress = "IN_PROGRESS";
	unknown = "UNKNOWN";
	abandoned = "ABANDONED";
	completed = "COMPLETED";

	constructor() { }

}
