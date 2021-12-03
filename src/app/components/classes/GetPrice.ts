export class GetPrice {
    idBacket: number;
    idUser: number;
    isBonuses: boolean;
    selfPicker: boolean;

    constructor(idBacket: number, idUser: number, isBonuses: boolean, selfPicker: boolean) {
      this.idBacket = idBacket;
      this.idUser = idUser;
      this.isBonuses = isBonuses;
      this.selfPicker = selfPicker;
    }
}
