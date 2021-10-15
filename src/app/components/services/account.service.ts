import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../classes/User';


@Injectable()

export  class AccountServices {
    private url = environment.Uri + 'user';

    constructor(private http: HttpClient) {}

    getAccount(token: string){
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url, {headers});
    }

    saveAccount(user: User, token: string){
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.post(this.url, user, {headers});
    }
}
