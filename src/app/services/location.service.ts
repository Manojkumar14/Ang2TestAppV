import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationService {
  baseUrl: any = 'https://apidev.vpdcs.com/';
  url: any;
  headers: Headers;
  requestOptions: RequestOptions;
  locationType = {};
  page: any = 1;
  perPage: any = 50;
  startIndex: any;
  EndIndex: any;
  totalRecords: any;
  totalPages: any;
  tempData: any = [];

  constructor(private http: Http) {
    // this.headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Accept': 'q=0.8;application/json;q=0.9'
    // });
    // this.requestOptions = new RequestOptions({ headers: this.headers });
  }

  getLocationOptions(): Observable<any> {
    if (this.baseUrl) {
      this.url = this.baseUrl + 'locations';
    }
    return this.http.options(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getLocationData(offsetIndex?, locationSearch?): Observable<any> {
    const page = 1;
    const perPage = 50;
    this.totalPages = 0;
    this.startIndex = 0;
    this.EndIndex = 0;
    this.totalRecords = 0;
    this.tempData = [];

    if (this.baseUrl) {
      this.url = this.baseUrl + 'locations';
    }
    const requestOptions = new RequestOptions({
      search: new URLSearchParams()
    });
    if (locationSearch) {
      requestOptions.search.set(locationSearch.fieldValue, JSON.stringify({ $like: `${locationSearch.textValue}%` }));
    }
    if (offsetIndex !== null) {
      requestOptions.search.set('offset', JSON.stringify(parseInt(offsetIndex, 0)));
      requestOptions.search.set('limit', JSON.stringify(perPage));
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
                        this.totalPages = Math.floor((this.totalRecords / perPage) + 1);
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
  addLocationData(locationData): Observable<any> {
    if (locationData) {
      this.url = this.baseUrl + 'locations';
      return this.http.post(this.url, locationData, this.requestOptions)
                      .map(this.extractData)
                      .catch(this.handleError);
    }
  }
  updateLocationData(locationData): Observable<any> {
    console.log(JSON.stringify(locationData));
    if (locationData) {
      this.url = this.baseUrl + 'locations' + '/' + locationData.location;
      return this.http.put(this.url, locationData)
                      .map(this.extractData)
                      .catch(this.handleError);
    }
  }
  getCurrentPageRecords(offsetIndex?): Observable<any> {
    const page = 1;
    const perPage = 50;
    this.totalPages = 0;
    this.startIndex = 0;
    this.EndIndex = 0;
    this.totalRecords = 0;
    this.tempData = [];
    const requestOptions = new RequestOptions({
      search: new URLSearchParams()
    });
    if (offsetIndex) {
      // requestOptions.search.set('offset', JSON.stringify((offsetIndex - 1) * perPage));
      requestOptions.search.set('offset', JSON.stringify(parseInt(offsetIndex, 0)));
      requestOptions.search.set('limit', JSON.stringify(perPage));
    } else {
      requestOptions.search.set('offset', JSON.stringify((page - 1) * perPage));
      requestOptions.search.set('limit', JSON.stringify(perPage));
    }
    this.url = this.baseUrl + 'locations';
    return this.http.get(this.url, requestOptions)
                    .map((response: Response) => {
                      const contentRange = response.headers.get('Content-Range');
                      if (contentRange) {
                        const pattern = /(\d+)-(\d+)\/(\d+)/g;
                        const match = pattern.exec(contentRange);
                        this.startIndex = +(match[1]);
                        this.EndIndex = +(match[2]);
                        this.totalRecords = +(match[3]);
                        this.totalPages = Math.floor((this.totalRecords / perPage) + 1);
                      }
                      // return this.tempData.push({
                      //   'data' : this.extractData(response),
                      //   'startIndex': this.startIndex,
                      //   'EndIndex': this.EndIndex,
                      //   'totalRecords': this.totalRecords,
                      //   'totalPages': this.totalPages,
                      // });
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
