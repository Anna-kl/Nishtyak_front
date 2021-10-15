import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Backet, InfoOrder} from '../classes/IBacket';
import {Product} from '../classes/Product';
import {IOrder} from '../classes/IOrder';
import {GetPrice} from '../classes/GetPrice';
import {SendOrder} from '../classes/SendOrder';


@Injectable()

export  class BacketServices {
    private url = environment.Uri;

    constructor(private http: HttpClient) {

    }
    createBacket(backet: Backet){
        const  headers: HttpHeaders = new HttpHeaders();
        return this.http.post(this.url + 'backet',  backet, {headers } );
    }

    getCountOrders(session: string){
        const a = `${this.url}getCount/${session}`;
        return this.http.get(`${this.url}getCount/${session}`);
    }

    getIdBacket(session: string){
        return this.http.get(`${this.url}getIdBacket/${session}`);
    }

    getListProducts(session: string){
        return this.http.get(`${this.url}getListProducts/${session}`);
    }

    deleteOrder(order: any){
        const  headers: HttpHeaders = new HttpHeaders();
        return this.http.post(this.url + 'deleteOrder',  order, {headers } );
    }

    createOrder(order: SendOrder){
        const  headers: HttpHeaders = new HttpHeaders();
        return this.http.post(`${this.url}createOrder/`,  order, {headers } );
    }

    getTotalPrice(getPrice: GetPrice){
        const  headers: HttpHeaders = new HttpHeaders();
        return this.http.post(`${this.url}getTotalPrice`,  getPrice, {headers } );
    }

}
