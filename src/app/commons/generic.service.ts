import { Injectable } from '@angular/core';
import { AbstractHttpService } from './abstract-http.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GenericService extends AbstractHttpService {

    constructor(http: HttpClient) {
        super(http);
    }

    save (value: any, url: string = '') {
        return this.postMethod(url, value);
    }

    delete(value: any, url: string = '') {
        return this.deleteMethod(url, value);
    }

    findAll(url: string = '') {
        return this.getMethod(url + '/findAll');
    }

    findOne(value: string, url: string = '') {
        return this.getMethod(url + value);
    }

}
