import {Component, ComponentRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProductServices} from '../../services/product.service';
import {Product} from '../../classes/Product';
import { Response } from '../../classes/Response';
import {CookieService} from 'ngx-cookie-service';
import {Backet} from '../../classes/IBacket';
import {Md5} from 'ts-md5';
import {BacketServices} from '../../services/backet.service';
import {IOrder, Order} from '../../classes/IOrder';
import {DataServices} from '../../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-two',
  templateUrl: './home-two.component.html',
  styleUrls: ['./home-two.component.scss'],
  providers: [ProductServices, CookieService, Md5, BacketServices]
})
export class HomeTwoComponent implements OnInit {
    public typeProduct = 'rolls';
    public backet: Backet;
    public orderCount = 0;
    private session: string;
    @ViewChild('navMenu') myForm: ComponentRef<any>;

  constructor(private productService: ProductServices,
              private cookieService: CookieService,
              private md5: Md5, private backetService: BacketServices) { }

  public products: Product[];
  ngOnInit(): void {
      this.productService.getProducts().
          subscribe((result: Response) => {
                this.products = result.data as Product[];
      });
      this.session = this.cookieService.get('hichtyak_backet');
      if (this.session !== ''){
          this.backetService.getCountOrders(this.session).subscribe(
              (result: Response) => {
                  if (result.code === 200){
                      this.orderCount = result.data;
                      this.cookieService.set('nishtyak_count',  this.orderCount.toString());
                  }
              }
          );
      }
  }

    setProduct(type: string) {
        this.typeProduct = type;
    }

    addProduct(product: Product) {
        if (this.session === undefined || this.session === '') {
            const hash2 = this.md5.appendStr('password').end().toString();
            this.backet = new Backet(hash2, -1, 'active', 0, new Date());
            this.backetService.createBacket(this.backet).subscribe(
                (result: Response) => {
                    if (result.code === 200) {
                        this.cookieService.set('hichtyak_backet', hash2);
                        const idBacket = result.data;
                        this.addOrder(product, idBacket);
                    }
                }
            );
        } else {
            this.backetService.getIdBacket(this.session).subscribe(
                (result: Response) => {
                    if (result.code === 200) {
                        const idBacket = Number.parseInt(result.data);
                        this.addOrder(product, idBacket);

                    } else {
                        this.backet = new Backet(this.session, -1, 'active', 0, new Date());
                        this.backetService.createBacket(this.backet).subscribe(
                            (resultBacket: Response) => {
                                if (resultBacket.code === 200) {
                                    const idBacket = resultBacket.data;
                                    this.addOrder(product, idBacket);
                                }
                            }
                        );
                    }
                });
        }
    }

    addOrder(product: Product, idBacket: number){
        const order = new Order(new Date(), product.id, idBacket, 1);
        this.productService.addProductInBacket(order).subscribe(
            (result: Response) => {
                if (result.code === 200) {
                    this.position('Успешно');
                    this.orderCount += 1;
                    this.cookieService.set('nishtyak_count', this.orderCount.toString());
                } else {
                    console.log('error');
                }
            }
        );
    }

    position(text: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: text,
            showConfirmButton: false,
            timer: 1500
        }); }
}
