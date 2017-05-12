import { Injectable } from '@angular/core';
import { SearchCriteria } from './search/searchCriteria';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class SearchService {

	query = '';

  constructor(private _http: Http) { }

	getQuery(s: SearchCriteria) {
		var q = {
			s: ""	
		};
		this.addTextFilter(q, "firstName_t", s.firstName);
		this.addTextFilter(q, "lastName_t", s.lastName);
		this.addTextFilter(q, "ssn_t", s.ssn);
		this.addTextFilter(q, "formResultId_t", s.formResultId);
		this.addMultiTextFilter(q, "enterprise_t", s.enterprises);
		this.addMultiTextFilter(q, "group_t", s.groups);
		this.addMultiTextFilter(q, "interviewerUsername_t", s.interviewers);
		this.addMultiTextFilter(q, "trackingNumber_t", s.trackingNumbers.split('\n'));
		this.addDateRangeFilter(q, "interviewed_dt", s.updatedFrom, s.updatedTo);
		this.addDateRangeFilter(q, "interviewed_dt", s.interviewedFrom, s.interviewedTo);
		if (q.s == "") {
			q.s = "*:*";
		}
		console.log("Query: " + q.s);
		this.query = q.s;
		return this.query;
	}
	
	getData(s: SearchCriteria) {
		let _query = this.getQuery(s);
		var body = {
			query: _query,
			limit: 10
		};
		return this._http
			.post("http://localhost:8983/solr/assessments/select?indent=on&wt=json", body)
			.map(res => res.json());
	}

	getPage(q: string, pageNumber: number, rows: number) {
		var body = {
			query: q,
			limit: rows
		}
		let start = (pageNumber - 1) * rows;
		return this._http
			.post("http://localhost:8983/solr/assessments/select?indent=on&wt=json&start=" + start, body)
			.map(res => res.json());
	}

	private addDateRangeFilter(q, name: string, from: string, to: string) {
		var fromDate: Date;
		var toDate: Date;
		fromDate = this.tryParseDate(from);
		toDate = this.tryParseDate(to);
		if (!fromDate && !toDate) {
			return;
		}
		if (q.s != "") {
			q.s += " AND ";
		}
		var fromString: string;
		if (fromDate) {
			fromString = "\"" + fromDate.toISOString() + "\"";
		} else {
			fromString = "*";
		}
		var toString: string;
		if (toDate) {
			toString = "\"" + toDate.toISOString() + "\"";
		} else {
			toString = "*";
		}
		q.s += name + ":[" + fromString + " TO " + toString + "]";
	}

	private addTextFilter(q, name: string, value: string) {
		if (!this.isNullOrWhiteSpace(value)) {
			if (q.s != "") {
				q.s += " AND ";
			}
			q.s += name + ":\"" + value.trim() + "\"";
		}
	}

	private addMultiTextFilter(q, name: string, value: string[]) {
		var values = new Array();
		value.forEach((v) => {
			if (!this.isNullOrWhiteSpace(v)) {
				values.push(v.trim());
			}
		});
		if (values !== null && values.length > 0) {
			if (q.s != "") {
				q.s += " AND ";
			}
			if (values.length == 1) {
				q.s += name + ":\"" + values[0] + "\"";
			} else {
				q.s += "(";
				values.forEach((v,i) => {
					if (i != 0) {
						q.s += " OR ";
					}
					q.s += name + ":\"" + v + "\"";
				});
				q.s += ")";
			}
		}
	}

	private tryParseDate(value: string) {
		if (this.isNullOrWhiteSpace(value)) {
			return undefined;
		}
		var ticks = Date.parse(value.trim());
		if (isNaN(ticks)) {
			return undefined;
		}
		return new Date(ticks);
	}

	private isNullOrWhiteSpace(value: string) {
		return value === null || value.match(/^ *$/) !== null;
	}
}
