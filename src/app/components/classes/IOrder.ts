export class Order {
    id: number;
    dttmAdd: Date;
    idProduct: number;
    idBacket: number;
    count: number;
    constructor(dttmAdd: Date, idProduct: number, idBacket: number, count: number) {
        this.dttmAdd = dttmAdd;
        this.idBacket = idBacket;
        this.count = count;
        this.idProduct = idProduct;
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
