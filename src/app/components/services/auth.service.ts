import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable()

export  class AuthServices {
    private url = environment.Uri;
    constructor(private http: HttpClient) {

    }

    register(phone: string) {
        return this.http.get(`${this.url}register/${phone}`);
    }

    checkCode(phone: string, code: string ){
        const  headers: HttpHeaders = new HttpHeaders();
        const data = {phone, code};
        return this.http.post(this.url + 'register/check',  data, {headers } );
    }

    getAddress(phone: string){
        return this.http.get(`${this.url}getAddress/${phone}`);
    }
}

