import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PromosCodesItemsService {
  baseUrl: any = 'https://apidev.vpdcs.com/';
  url: any;
  headers: Headers;
  requestOptions: RequestOptions;
  locationType = {};
  page: any = 1;
  startIndex: any;
  EndIndex: any;
  totalRecords: any;
  totalPages: any;
  tempData: any = [];

  constructor(private http: Http) { }

  getVpCustomersData(): Observable<any> {
    const perPage = 350;
    const offsetIndex = 0;
    const requestOptions = new RequestOptions({
      search: new URLSearchParams()
    });
    if (this.baseUrl) {
      this.url = this.baseUrl + 'vpcustomers';
    }
    requestOptions.search.set('offset', JSON.stringify(0));
    requestOptions.search.set('limit', JSON.stringify(350));
    return this.http.get(this.url, requestOptions)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getPromotionOptions(): Observable<any> {
    if (this.baseUrl) {
      this.url = this.baseUrl + 'promotions';
    }
    return this.http.options(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getPromotionData(offsetIndex?, promotionSearch?): Observable<any> {
    const page = 1;
    const perPage = 50;
    this.totalPages = 0;
    this.startIndex = 0;
    this.EndIndex = 0;
    this.totalRecords = 0;
    this.tempData = [];

    if (this.baseUrl) {
      this.url = this.baseUrl + 'promotions';
    }
    const requestOptions = new RequestOptions({
      search: new URLSearchParams()
    });
    if (promotionSearch) {
      requestOptions.search.set(promotionSearch.fieldValue, JSON.stringify({ $like: `${promotionSearch.textValue}%` }));
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
  addPromotionData(promotionData): Observable<any> {
    if (promotionData) {
      this.url = this.baseUrl + 'promotions';
      return this.http.post(this.url, promotionData)
                      .map(this.extractData)
                      .catch(this.handleError);
    }
  }
  updatePromotionData(promotionData, promId ): Observable<any> {
    console.log(JSON.stringify(promotionData));
    if (promotionData) {
      this.url = this.baseUrl + 'promotions' + '/' + promId;
      return this.http.put(this.url, promotionData)
                      .map(this.extractData)
                      .catch(this.handleError);
    }
  }
  getPromotionCodeOptions(promId): Observable<any> {
    if (this.baseUrl) {
      this.url = this.baseUrl + 'promotions' + '/' + promId + '/' + 'codes';
    }
    return this.http.options(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getPromotionCodeData(offsetIndex?, promId?): Observable<any> {
    const page = 1;
    const perPage = 50;
    this.totalPages = 0;
    this.startIndex = 0;
    this.EndIndex = 0;
    this.totalRecords = 0;
    const tempCodeData: any = [];

    if (this.baseUrl) {
      this.url = this.baseUrl + 'promotions' + '/' + promId + '/' + 'codes';
    }
    const requestOptions = new RequestOptions({
      search: new URLSearchParams()
    });
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
                    tempCodeData.push(
                        this.extractData(response),
                        this.startIndex,
                        this.EndIndex,
                        this.totalRecords,
                        this.totalPages
                    );
                    return tempCodeData;
                    })
                    .catch(this.handleError);
  }
  getPromotionItemOptions(promId): Observable<any> {
    if (this.baseUrl) {
      this.url = this.baseUrl + 'promotions' + '/' + promId + '/' + 'items';
    }
    return this.http.options(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getPromotionItemData(offsetIndex?, promId?): Observable<any> {
    const page = 1;
    const perPage = 50;
    this.totalPages = 0;
    this.startIndex = 0;
    this.EndIndex = 0;
    this.totalRecords = 0;
    const tempItemData: any = [];

    if (this.baseUrl) {
      this.url = this.baseUrl + 'promotions' + '/' + promId + '/' + 'codes';
    }
    const requestOptions = new RequestOptions({
      search: new URLSearchParams()
    });
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
                      tempItemData.push(
                        this.extractData(response),
                        this.startIndex,
                        this.EndIndex,
                        this.totalRecords,
                        this.totalPages
                    );
                    return tempItemData;
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
