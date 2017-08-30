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

  getGlobalSearchData(searchTable: string, searchField?: string, searchValue?: string): Observable<any> {
    this.url = '';
    const requestOptions = new RequestOptions ({
      search: new URLSearchParams()
    });
    if ((searchField === '' && searchValue === '') || searchValue === '' || searchField === '') {
      this.url = this.baseUrl + searchTable;
    }
    if (searchTable !== '' && searchField !== '' && searchValue !== '') {
      this.url = this.baseUrl + searchTable;
      // This tells the API to find records starting with the provided search value. + '?' + searchField + '=' + searchValue
      requestOptions.search.set(searchField, JSON.stringify({ $like: `${searchValue}%` }));
    }
    console.log(this.url);
    return this.http.get(this.url, requestOptions)
                    .map(this.extractData)
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
