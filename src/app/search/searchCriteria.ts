export class SearchCriteria {
	constructor(
		public firstName: string,
		public lastName: string,
		public ssn: string,
		public formResultId: string,
		public enterprises: string[],
		public groups: string[],
		public interviewers: string[],
		public trackingNumbers: string,
		public updatedFrom: string,
		public updatedTo: string,
		public interviewedFrom: string,
		public interviewedTo: string
	){}
}