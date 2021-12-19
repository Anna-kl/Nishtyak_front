import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Backet, InfoOrder} from '../classes/IBacket';
import {Product} from '../classes/Product';
import {IOrder} from '../classes/IOrder';
import {GetPrice} from '../classes/GetPrice';
import {SendOrder} from '../classes/SendOrder';


@Injectable()

export  class RaffleServices {
    private url = environment.Uri;

    constructor(private http: HttpClient) {

    }

    getLastGift() {
        return this.http.get(`${this.url}LastRaffle`);
    }

}
