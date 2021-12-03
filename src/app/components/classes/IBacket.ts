export class Backet {
    id: number | undefined;
    dttmCreate: Date;
    session: string;
    idUser: number;
    status: string;
    price: number;
    constructor(session: string, idUser: number, status: string, price: number,
                dttmCreate: Date ) {
        this.session = session;
        this.idUser = idUser;
        this.status = status;
        this.price = price;
        this.dttmCreate = dttmCreate;
    }
}

export interface InfoOrder{
    address: string;
    floor: number;
    house: number;
    intercom: number;
    apartment: number;
    entrance: number;
    idBacket: number;
    appliances: number;
    pay: string;
    comment: string;
    isBalls: boolean;
}
