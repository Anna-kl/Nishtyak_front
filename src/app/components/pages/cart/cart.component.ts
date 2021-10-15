import {Component, Input, OnInit} from '@angular/core';
import {BacketServices} from '../../services/backet.service';
import {CookieService} from 'ngx-cookie-service';
import {Response} from '../../classes/Response';
import {Product} from '../../classes/Product';
import {IOrder} from '../../classes/IOrder';
import {DataServices} from '../../services/data.service';
import {Backet} from '../../classes/IBacket';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [BacketServices, CookieService]
})
export class CartComponent implements OnInit {

  private idBacket = 0;
  public products: IOrder[];
  public totalPrice: number;
  public session: string;
  public countOrders: number;
  constructor(private backetService: BacketServices,
              private cookieService: CookieService,
              private router: Router,
              private dataService: DataServices) { }

  ngOnInit(): void {
      this.session = this.cookieService.get('hichtyak_backet');
      if (this.session === ''){
          this.countOrders = 0;
      } else {
          this.backetService.getCountOrders(this.session).subscribe(
              (result: Response) => {
                  if (result.code === 200) {
                      this.countOrders = result.data;
                  }
              }
          );
      }
      if (this.session !== ''){
            this.backetService.getIdBacket(this.session).subscribe(
                (resultBacket: Response) => {
                    this.idBacket = resultBacket.data;
                }
            );
            this.backetService.getListProducts(this.session).subscribe(
                (result: Response) => {
                    if (result.code === 200){
                        this.products = result.data as IOrder[];
                        this.totalPrice = this.products.reduce((sum, a) =>
                            sum + a.price * a.count, 0);
                        }
                    });
      } else {
          this.products = [];
      }
  }

    DeleteProduct(product: IOrder) {
        this.products = this.products.filter(x => x !== product);
        const send = {idBacket: product.idBacket, idProduct: product.idProduct, dttmAdd: product.dttmAdd,
        id: product.id};
        this.backetService.deleteOrder(send).subscribe(
            (result: Response) => {
                if (result.code === 200){
                    this.totalPrice = this.products.reduce((sum, a) =>
                        sum + a.price * a.count, 0);
                }
            }
        );
    }

    SendBacket() {
      const backet = new Backet(this.session, -1, 'preorder', this.totalPrice, new Date());
      this.dataService.sendPriceBacket(this.totalPrice);
      this.dataService.sendIdBacket(this.idBacket);
      this.backetService.createBacket(backet).subscribe(
          (result: Response) => {
              if (result.code === 200){
                  this.router.navigate(['/address']);
              }
          }
      );
      // this.backetService.
    }
}
