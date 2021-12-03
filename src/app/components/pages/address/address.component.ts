import { Component, OnInit } from '@angular/core';
import {AuthServices} from '../../services/auth.service';
import {Response} from '../../classes/Response';
import {FormBuilder, Validators} from '@angular/forms';
import {InfoOrder} from '../../classes/IBacket';
import {BacketServices} from '../../services/backet.service';
import {DataServices} from '../../services/data.service';
import {GetPrice} from '../../classes/GetPrice';
import {ICoupon} from '../../classes/ICoupon';
import {SendOrder} from '../../classes/SendOrder';
import Swal from 'sweetalert2';
import {AnswerOrder} from '../../classes/AnswerOrder';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [AuthServices, BacketServices]
})
export class AddressComponent implements OnInit {
  public formAddress: any;
  public telephone = '';
  public Coupon: ICoupon;
  public flagAddress = false;
  public flagAppliances = false;
  public choose = 'Оплата картой';
  public pays = ['Наличными', 'Картой курьеру'];
  public isBonus = false;
  public countOrders = 0;
  idBacket: any;
  private idUser: any;
  public selfPicked = false;

  constructor(private userService: AuthServices,
              private formBuilder: FormBuilder,
              private backetService: BacketServices,
              private cookieService: CookieService,
              private router: Router,
              private dataService: DataServices) {
      this.Coupon = {
          coupon: null,
          bonuses: -1,
          totalPrice: 0,
      };
  }

  ngOnInit(): void {
      const count = this.cookieService.get('nishtyak_count');
      if (count === ''){
          this.countOrders = 0;
      } else {
          this.countOrders = Number.parseInt(count);
      }

      this.dataService.Id.subscribe(
          result => {
              this.idBacket = result;
              this.backetService.getTotalPrice(new GetPrice(this.idBacket, -1, false, this.selfPicked)).subscribe(
                  (resultPrice: any) => {
                      if (resultPrice.code === 200){
                          this.Coupon = resultPrice.data as ICoupon;

                      }
                  }
              );
          }
      );
      // this.dataService.prices.subscribe(result => this.totalPrice = result);
      this.formAddress = this.formBuilder.group(
      {
          address: ['', Validators.required],
          house: ['', Validators.required],
          apartment: ['', Validators.required],
          floor: ['', Validators.required],
          intercom: ['', Validators.required],
          entrance: ['', Validators.required],
          comment: [''],
          appliances: [1],
          pay: [this.choose]
      }
  );
  }

    onSubmit() {
       this.SendDelivery();
    }

    ChangeText($selected: any) {
        const data = $selected.target.value;
        if (this.telephone.length < data.length) {
            if (data.length === 1 || data.length === 6) {
                if (data === '8' || data === '7' || data === '+') {
                    this.telephone = '+7(';
                } else if (data.length === 1) {
                    this.telephone = '+7(' + data;
                }
                if (data.length === 6) {
                    this.telephone = data + ')';
                }
            } else {
                this.telephone = data;
            }

            if (data.length >= 14) {
                this.flagAddress = true;
                this.userService.getAddress(this.telephone).subscribe(
                    (result: any) => {
                        if (result.code === 404) {
                            this.idUser = result.data;
                        } else {
                            const sendOrder = result.data as SendOrder;
                            this.formAddress = this.formBuilder.group(
                                {
                                    address: sendOrder.address,
                                    house: sendOrder.house,
                                    apartment: sendOrder.apartment,
                                    floor: sendOrder.floor,
                                    intercom: sendOrder.intercom,
                                    entrance: sendOrder.entrance,
                                    comment: [''],
                                    appliances: [1],
                                    pay: [this.choose]
                                }
                            );
                            this.idUser = sendOrder.idUser;
                        }
                        this.backetService.getTotalPrice(
                            new GetPrice(this.idBacket, this.idUser, false, this.selfPicked)).subscribe(
                            (resultPrice: any) => {
                                this.Coupon = resultPrice.data as ICoupon;
                            }
                        );
                    });
            }
        } else {
            this.telephone = data;
        }

    }

    ChooseBonuses($event: Event) {
        this.isBonus = !this.isBonus;
        this.backetService.getTotalPrice(
            new GetPrice(this.idBacket, this.idUser, this.isBonus, this.selfPicked)).subscribe(
            (resultPrice: any) => {
                this.Coupon = resultPrice.data as ICoupon;
            }
        );
    }

    ChangDelivery() {
        this.backetService.getTotalPrice(
            new GetPrice(this.idBacket, this.idUser, this.isBonus, this.selfPicked)).subscribe(
            (resultPrice: any) => {
                this.Coupon = resultPrice.data as ICoupon;
            }
        );
    }

    SendDelivery() {
      if (!this.idUser || this.idUser === 0){
          this.error();
      } else {
          const data = this.formAddress.getRawValue() as InfoOrder;
          data.idBacket = this.idBacket;
          let send;
          if (this.Coupon.coupon && this.Coupon.coupon !== null) {
              send = new SendOrder(data, this.idUser, this.Coupon.totalPrice,
                  this.selfPicked, 'coupon');
          } else {
              if (this.isBonus) {
                  send = new SendOrder(data, this.idUser, this.Coupon.totalPrice,
                      this.selfPicked, 'bonus');
              } else {
                  send = new SendOrder(data, this.idUser, this.Coupon.totalPrice,
                      this.selfPicked, null);
              }
          }
          this.backetService.createOrder(send).subscribe(
              (result: any) => {
                  if (result.code === 201) {
                      const order = result.data as AnswerOrder;
                      this.Success(order);
                      this.cookieService.delete('hichtyak_backet');
                      this.cookieService.delete('nishtyak_count');
                      this.router.navigate(['/']);
                  } else {
                      this.error();
                      this.cookieService.delete('hichtyak_backet');
                      this.cookieService.delete('nishtyak_count');
                      this.router.navigate(['/']);
                  }
              }
          );
      }
    }

    Success(answer: AnswerOrder){
        Swal.fire({
            title: 'Спасибо за заказ!',
            icon: 'info',
            html:
                `Ваш заказ <b>${answer.idOrder}</b>, ` +
                `уже в работе </br>` +
                `<span>С Вами свяжется менеджер для уточнения деталей</span>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'Ok'
        });
    }

    error(){
        Swal.fire({
            icon: 'error',
            title: 'Упсс...',
            text: 'С вами свяжется менеджер для уточнения заказа',
        });
    }
}

