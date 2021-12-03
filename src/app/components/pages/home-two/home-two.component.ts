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
import {ProductWithCount} from '../../classes/ProductWithCount';
import {AnswerOrder} from '../../classes/AnswerOrder';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChooseOptionalComponent} from '../../modals/choose-optional/choose-optional.component';

@Component({
  selector: 'app-home-two',
  templateUrl: './home-two.component.html',
  styleUrls: ['./home-two.component.scss'],
  providers: [ProductServices, CookieService, Md5, BacketServices]
})
export class HomeTwoComponent implements OnInit {
    public typeProduct = 'rolls';
    public backet: Backet|undefined = undefined;
    public orderCount = 0;
    private session = '';
    @ViewChild('navMenu') myForm: ComponentRef<any> | undefined;
    private idBacket = 0;

  constructor(private productService: ProductServices,
              private cookieService: CookieService,
              private md5: Md5, private backetService: BacketServices,
              private modalService: NgbModal) { }

  public products: ProductWithCount[] = [];
  public countProduct = 1;
  ngOnInit(): void {
      const firstShow = this.cookieService.get('nishtyak_first');
      if (firstShow === '') {
          this.Success();
          this.cookieService.set('nishtyak_first', 'no');
      }
      this.productService.getProducts().
          subscribe((result: any) => {
                this.products = result.data as ProductWithCount[];
                this.products.forEach(item => {
                    item.count = 1;
                });
      });
      this.session = this.cookieService.get('hichtyak_backet');
      if (this.session !== ''){
          this.backetService.getCountOrders(this.session).subscribe(
              (result: any) => {
                  if (result.code === 200){
                      this.orderCount = result.data;
                      this.cookieService.set('nishtyak_count',  this.orderCount.toString());
                  }
              }
          );
      }
  }

    Success(){
        Swal.fire({
            imageUrl: 'assets/img/mainImg.jpg',
            imageWidth: 400,
            imageHeight: 450,
            background: '#000',
            imageAlt: 'Скидки до 20%',
        });
    }


    setProduct(type: string) {
        this.typeProduct = type;
    }

    addProduct(product: ProductWithCount) {
        this.productService.checkOptional(product.id).subscribe(
            (check: any) => {
                if (check.code === 200) {
                    const modalRef = this.modalService.open(ChooseOptionalComponent);
                    modalRef.componentInstance.id = product.id;
                    modalRef.componentInstance.count = product.count;
                    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any[]) => {
                        receivedEntry.forEach(item => {
                            this.createOrder(item, false);
                        });
                    });
                }
                this.createOrder(product, true);

            });
    }

    createOrder(product: ProductWithCount, flag: boolean){
        if (this.session === undefined || this.session === '') {
            const hash2 = this.md5.appendStr(new Date().toISOString() + Math.random().toString()).end().toString();
            this.backet = new Backet(hash2, -1, 'active', 0, new Date());
            this.backetService.createBacket(this.backet).subscribe(
                (result: any) => {
                    if (result.code === 200) {
                        this.cookieService.set('hichtyak_backet', hash2);
                        this.session = hash2;
                        this.idBacket = result.data;
                        this.addOrder(product, this.idBacket, flag);
                    }
                }
            );
        } else {
            this.backetService.getIdBacket(this.session).subscribe(
                (result: any) => {
                    if (result.code === 200) {
                        this.idBacket = result.data;
                        this.addOrder(product, this.idBacket, flag);
                    } else {
                        this.backet = new Backet(this.session, -1, 'active', 0, new Date());
                        this.backetService.createBacket(this.backet).subscribe(
                            (resultBacket: any) => {
                                if (resultBacket.code === 200) {
                                    this.idBacket = resultBacket.data;
                                    this.addOrder(product, this.idBacket, true);
                                }
                            }
                        );
                    }
                });
        }
    }

    addOrder(product: ProductWithCount, idBacket: number, flag: boolean){
        const order = new Order(new Date(), product.id, idBacket, product.count, product.price);
        this.productService.addProductInBacket(order).subscribe(
            (result: any) => {
                if (result.code === 200) {
                    if (flag) {
                        this.position('Успешно');
                    }
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

    Plus(product: ProductWithCount) {
        product.count += 1;
    }

    Minus(product: ProductWithCount) {
            product.count -= 1;
    }

    ChangeCount(product: ProductWithCount) {
        console.log(product);
    }
}
