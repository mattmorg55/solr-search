import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchCriteria } from './searchCriteria';
import { SearchService } from '../search.service';
import { LevelOfCompletionComponent } from '../level-of-completion/level-of-completion.component';
import { ReviewStatusComponent } from '../review-status/review-status.component';
import * as _ from 'underscore';
import 'rxjs/add/operator/debounceTime'; //Wait for sometime in between request
import 'rxjs/add/operator/distinctUntilChanged'; //check whether value changed, does not respond to keyup, keydown etc..

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
	providers: [ SearchService ],
})
export class SearchComponent implements OnInit {

	criteria = this.newCriteria();
	url = '';
	displayUrl = '';
	query = '';
	queryMs = -1;
	numFound = 0;
	formResults = [];
	//Paging
	currentPage = 1;
	rows = 10;
	totalPages = 0;
	startPage = 0;
	endPage = 0;
	pages: number[] = [];

  constructor(private _searchService: SearchService) { }

	ngOnInit() {
	}

	search() {
		this.query = this._searchService.getQuery(this.criteria);
		this.url = "http://localhost:8983/solr/assessments/select?indent=on&wt=json&q=" + encodeURI(this.query);
		this.displayUrl = "http://localhost:8983/solr/assessments/select?indent=on&wt=json&q=" + this.query;
		this.page(1);
	}

	page(pageNumber: number) {
		this._searchService.getPage(this.query, pageNumber, this.rows)
			.subscribe(data => {
				this.queryMs = data.responseHeader.QTime;
				this.formResults = data.response.docs;
				this.numFound = data.response.numFound;
				this.pagingCalculations(pageNumber, this.numFound, this.rows);
			});
	}

	pagingCalculations(currentPage: number, totalItems: number, pageSize: number) {
		// calculate total pages
		this.totalPages = Math.ceil(totalItems / pageSize);

		if (this.totalPages <= 10) {
				// less than 10 total pages so show all
				this.startPage = 1;
				this.endPage = this.totalPages;
		} else {
				// more than 10 total pages so calculate start and end pages
				if (currentPage <= 6) {
						this.startPage = 1;
						this.endPage = 10;
				} else if (currentPage + 4 >= this.totalPages) {
						this.startPage = this.totalPages - 9;
						this.endPage = this.totalPages;
				} else {
						this.startPage = currentPage - 5;
						this.endPage = currentPage + 4;
				}
		}

		// calculate start and end item indexes
		//let startIndex = (currentPage - 1) * pageSize;
		//let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

		// create an array of pages to ng-repeat in the pager control
		this.pages = _.range(this.startPage, this.endPage + 1);
		this.currentPage = currentPage;
	}

	clear() {
		this.criteria = this.newCriteria();
		this.queryMs = -1;
		this.numFound = 0;
		this.formResults = [];
		this._searchService.query = '';
		this.query = '';
		this.url = '';
		this.displayUrl = '';
		//Paging
		this.currentPage = 1;
		this.rows = 10;
		this.totalPages = 0;
		this.startPage = 0;
		this.endPage = 0;
		this.pages = [];
	}

	private newCriteria() {
		return new SearchCriteria('','','','',[],[],[],'', '', '','','');
	}
}
