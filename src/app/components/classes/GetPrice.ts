export class GetPrice {
    idBacket: number;
    idUser: number;
    isBonuses: boolean;

    constructor(idBacket: number, idUser: number, isBonuses: boolean) {
      this.idBacket = idBacket;
      this.idUser = idUser;
      this.isBonuses = isBonuses;
    }
}
