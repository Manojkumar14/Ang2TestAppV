import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalSearchService {

  baseUrl: any = 'https://apidev.vpdcs.com/';
  url: any;

  page: any = 1;
  perPage: any = 50;
  startIndex: any;
  EndIndex: any;
  totalRecords: any;
  totalPages: any;
  tempData: any = [];

  constructor(private http: Http) { }

  getGlobalSearchOptions(searchTable: string): Observable<any> {
    this.url = '';
    if (searchTable !== '') {
      this.url = this.baseUrl + searchTable;
    }
    return this.http.options(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json')
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'GET');
    // headers.append('Access-Control-Allow-Origin', '*');

    // const options = new RequestOptions({ headers: headers });
    // return this.http.options(this.url, options)
  }

  getGlobalSearchData(offsetIndex?, searchTable?: string, searchField?: string, searchValue?: string ): Observable<any> {
    this.url = '';
    this.page = 1;
    this.perPage = 50;
    this.totalPages = 0;
    this.startIndex = 0;
    this.EndIndex = 0;
    this.totalRecords = 0;
    this.tempData = [];
    const requestOptions = new RequestOptions ({
      search: new URLSearchParams()
    });
    if ((searchField === '' && searchValue === '') || searchValue === '' || searchField === '') {
      this.url = this.baseUrl + searchTable;
    }
    if (searchTable !== '' && searchField !== '' && searchValue !== '') {
      this.url = this.baseUrl + searchTable;
      // This tells the API to find records starting with the provided search value...
      requestOptions.search.set(searchField, JSON.stringify({ $like: `${searchValue}%` }));
    }
    if (offsetIndex !== null) {
      // This tells the API to find records based on offset and limit values...
      requestOptions.search.set('offset', JSON.stringify(parseInt(offsetIndex, 0)));
      requestOptions.search.set('limit', JSON.stringify(this.perPage));
    }
    return this.http.get(this.url, requestOptions)
                    .map((response: Response) => {
                      const contentRange = response.headers.get('Content-Range');
                      if (contentRange) {
                        const pattern = /(\d+)-(\d+)\/(\d+)/g;
                        const match = pattern.exec(contentRange);
                        this.startIndex = +(match[1]);
                        this.EndIndex = +(match[2]);
                        this.totalRecords = +(match[3]);
                        this.totalPages = Math.floor((this.totalRecords / this.perPage) + 1);
                      }
                    this.tempData.push(
                        this.extractData(response),
                        this.startIndex,
                        this.EndIndex,
                        this.totalRecords,
                        this.totalPages
                    );
                    return this.tempData;
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
