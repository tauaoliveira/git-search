import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AbstractHttpService {


    protected http: HttpClient;
    private extractData;
    private handleError;

    constructor(http: HttpClient) {
        this.http = http;
    }

    protected getMethod<T>(url: string = '', params: any = null) {
        console.log(url);

        console.log('Param: ' + params);

        if (params != null) {
            return this.http.get<T>(url, {
                params: params
            });
        } else {
            return this.http.get<T>(url);
        }


    }

    protected async getMethodPromise<T>(url: string = '', params: any = null): Promise<T> {

        if (params != null) {

            return await this.http.get<T>(url, { params: params }).toPromise();
        } else {

            return await this.http.get<T>(url).toPromise();
        }
    }


    protected postMethod<T>(value: any, url: string = '') {

        console.log('Post Method: ' + url);

        return this.http.post<T>(url, value, { headers: this.getHeaders() });
    }

    protected putMethod(value: any, url: string = '') {
        return this.http.put(url, JSON.stringify(value), { headers: this.getHeaders() })
            .map(res => this.extractData = res).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    protected deleteMethod(value: any, url: string = '') {
        return this.http.delete(url + '/' + value, { headers: this.getHeaders() })
        .map(res => this.extractData = res).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    protected getHeaders() {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return headers;
    }

}
