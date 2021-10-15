import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IOrder, Order} from '../classes/IOrder';
import {Product} from '../classes/Product';


@Injectable()

export  class ProductServices {
    private url = environment.Uri;
    constructor(private http: HttpClient) {

    }
    getProducts(){
        return this.http.get(`${this.url}product`);
    }

    getStock(){
        return this.http.get(`${this.url}stock`);
    }



    addProductInBacket(order: Order){
        const  headers: HttpHeaders = new HttpHeaders();
        return this.http.post(this.url + 'order',  order, {headers } );
    }
}
