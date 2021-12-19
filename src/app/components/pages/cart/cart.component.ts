import {Component, Input, OnInit} from '@angular/core';
import {BacketServices} from '../../services/backet.service';
import {CookieService} from 'ngx-cookie-service';
import {Response} from '../../classes/Response';
import { Product } from '../../classes/Product';
import { IOrder, Order } from '../../classes/IOrder';
import {DataServices} from '../../services/data.service';
import {Backet} from '../../classes/IBacket';
import {Router} from '@angular/router';
import {ChooseOptionalComponent} from '../../modals/choose-optional/choose-optional.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductWithCount} from '../../classes/ProductWithCount';
import {ProductServices} from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [BacketServices, CookieService, ProductServices]
})
export class CartComponent implements OnInit {

    private idBacket = 0;
    public products: IOrder[] | undefined;
    public totalPrice: number | undefined;
    public session: string | undefined;
    public countOrders = 0;

    constructor(private backetService: BacketServices,
                private cookieService: CookieService,
                private router: Router,
                private dataService: DataServices,
                private modalService: NgbModal,
                private productService: ProductServices) {
    }

    ngOnInit(): void {
        this.session = this.cookieService.get('hichtyak_backet');
        if (this.session === '') {
            this.countOrders = 0;
        } else {
            this.backetService.getCountOrders(this.session).subscribe(
                (result: any) => {
                    if (result.code === 200) {
                        this.countOrders = result.data;
                    }
                }
            );
        }
        if (this.session !== '') {
            this.backetService.getIdBacket(this.session).subscribe(
                (resultBacket: any) => {
                    this.idBacket = resultBacket.data;
                }
            );
            this.backetService.getListProducts(this.session).subscribe(
                (result: any) => {
                    if (result.code === 201) {
                        const modalRef = this.modalService.open(ChooseOptionalComponent);
                        modalRef.componentInstance.setter = 'gift';
                        modalRef.componentInstance.id = this.totalPrice;
                        modalRef.componentInstance.session = this.session;
                        modalRef.componentInstance.passEntry.subscribe((receivedEntry: any[]) => {
                            receivedEntry.forEach(item => {
                                const order = new Order(new Date(), item.id, this.idBacket,
                                    1, 0);
                                this.productService.addGiftInBacket(order).subscribe(
                                    (tempResult: any) => {
                                        if (tempResult.code === 201){
                                            this.getListBacket();
                                        }
                                    });
                            });
                        });
                    }
                    else {
                        if (result.code === 200) {
                            this.products = result.data as IOrder[];
                            this.totalPrice = this.products.reduce((sum, a) =>
                                sum + a.price * a.count, 0);
                        } else {
                            this.getListBacket();
                        }
                    }
                });
        } else {
            this.products = [];
        }
    }

    getListBacket(){
        this.backetService.getListProducts(this.session).subscribe(
            (result: any) => {
                if (result.code === 201) {
                    const modalRef = this.modalService.open(ChooseOptionalComponent);
                    modalRef.componentInstance.setter = 'gift';
                    modalRef.componentInstance.id = this.totalPrice;
                    modalRef.componentInstance.session = this.session;
                    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any[]) => {
                        receivedEntry.forEach(item => {
                            const order = new Order(new Date(), item.id, this.idBacket,
                                1, 0);
                            this.productService.addGiftInBacket(order).subscribe(
                                (tempResult: any) => {
                                    if (tempResult.code === 200){

                                    }
                                });
                        });
                    });
                }
                else {
                    if (result.code === 200) {
                        this.products = result.data as IOrder[];
                        this.countOrders = this.products.length;
                        this.totalPrice = this.products.reduce((sum, a) =>
                            sum + a.price * a.count, 0);
                    } else {
                        this.getListBacket();
                        this.countOrders -= 1;
                    }
                }
            });
    }

DeleteProduct(product: IOrder) {
    // tslint:disable-next-line:no-non-null-assertion
        this.products = this.products!.filter(x => x !== product);
        const send = {idBacket: product.idBacket, idProduct: product.idProduct, dttmAdd: product.dttmAdd,
        id: product.id};
        this.backetService.deleteOrder(send).subscribe(
            (result: any) => {
                if (result.code === 200){
                    this.countOrders -= 1;
                    this.getListBacket();
                }
            }
        );
    }

SendBacket() {
    // tslint:disable-next-line:no-non-null-assertion
      const backet = new Backet(this.session!, -1, 'preorder', this.totalPrice!, new Date());
    // tslint:disable-next-line:no-non-null-assertion
      this.dataService.sendPriceBacket(this.totalPrice!);
      this.dataService.sendIdBacket(this.idBacket);
      this.backetService.createBacket(backet).subscribe(
          (result: any) => {
              if (result.code === 200){
                  this.router.navigate(['/address']);
              }
          }
      );
      // this.backetService.
    }
}
