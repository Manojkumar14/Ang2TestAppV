import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaginationService {
  baseUrl: any = 'https://apidev.vpdcs.com/';
  url: any;
  constructor(private http: Http) { }

  getPaginationData(searchTable: string) {
    this.url = '';
    const requestOptions = new RequestOptions({
      search: new URLSearchParams()
    });
    // Paging variables
    const page = 1;
    const perPage = 50;
    // let totalPages = 0 ;

    // Set the offset
    requestOptions.search.set('offset', JSON.stringify((page - 1) * perPage));

    // Set the limit
    requestOptions.search.set('limit', JSON.stringify(perPage));

    // Set the URL
    const url = this.baseUrl + searchTable;

    return this.http.get(this.url, requestOptions)
      .map((response: Response) => {
        this.extractData(response);
        // Retrieve the header
        const contentRange = response.headers.get('Content-Range');

        if (contentRange) {
            // Regular expression to get the values
            const pattern = /(\d+)-(\d+)\/(\d+)/g;
            const match = pattern.exec(contentRange);

            // Get the pagination values
            // const start = parseInt(match[1]);
            // const end = parseInt(match[2]);
            // const count = parseInt(match[3]);

            // Calculate the total pages
            // totalPages = Math.floor((count / perPage) + 1);
        }
    })
      .catch(this.handleError);
  }
  private extractData(response: Response) {
    const body = response.json();
    return body || {};
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
