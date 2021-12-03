export class Order {
    id: number | undefined;
    dttmAdd: Date;
    idProduct: number;
    idBacket: number;
    count: number;
    price: number;
    constructor(dttmAdd: Date, idProduct: number, idBacket: number, count: number, price: number) {
        this.dttmAdd = dttmAdd;
        this.idBacket = idBacket;
        this.count = count;
        this.idProduct = idProduct;
        this.price = price;
    }
}

export interface IOrder {
    id: number;
    dttmAdd: Date;
    idProduct: number;
    idBacket: number;
    count: number;
    name: string;
    structure: string;
    price: number;
    weight: number;
}
