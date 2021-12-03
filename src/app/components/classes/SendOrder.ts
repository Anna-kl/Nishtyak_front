export class SendOrder {
    address: string;
    house: number;
    floor: number;
    idUser: number;
    selfPickup: boolean;
    intercom: number;
    apartment: number;
    entrance: number;
    comment: string;
    pay: string;
    idBacket: number;
    totalPrice: number;
    sale: string|null;
    appliances: number;
    constructor(address: any, idUser: number, totalPrice: number, selfPickup: boolean, sale: string| null) {
        this.address = address.address;
        this.pay = address.pay;
        this.idUser = idUser;
        this.comment = address.comment;
        this.entrance = address.entrance;
        this.apartment = address.apartment;
        this.idBacket = address.idBacket;
        this.intercom = address.intercom;
        this.floor = address.floor;
        this.house = address.house;
        this.totalPrice = totalPrice;
        this.selfPickup = selfPickup;
        this.sale = sale;
        this.appliances = address.appliances;
    }
}
