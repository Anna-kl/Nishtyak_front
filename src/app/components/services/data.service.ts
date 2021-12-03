import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class DataServices {
    private user = new BehaviorSubject<string|null>(null);
    private userpic = new BehaviorSubject<any>(null);
    private backet = new BehaviorSubject<any>(null);
    private id = new BehaviorSubject<any>(null);
    private price = new BehaviorSubject<any>(null);

    users = this.user.asObservable();
    userpics = this.userpic.asObservable();
    backetCount = this.backet.asObservable();
    Id = this.id.asObservable();
    prices = this.price.asObservable();

    constructor(private  http: HttpClient) {

    }
    SendToken(User: string) {
        this.user.next(User);
    }

    sendBacket(countOrder: number){
        this.backet.next(countOrder);
    }

    sendIdBacket(id: number){
        this.id.next(id);
    }

    sendPriceBacket(price: number){
        this.price.next(price);
    }

}
