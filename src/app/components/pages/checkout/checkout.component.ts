import { Component, OnInit } from '@angular/core';
import {AuthServices} from '../../services/auth.service';
import { Response } from '../../classes/Response';
import {removeSummaryDuplicates} from '@angular/compiler';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DataServices} from '../../services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [AuthServices]
})
export class CheckoutComponent implements OnInit {

  public flagcod = false;
  public loginForm: FormGroup;
  public error = false;
  public smstext = 'Телефон введен неверно';
  public errorsms = false;
  public timeLeft = 60;
  private flagRegister = 0;
  public textEnter = 'Получить звонок!';
  public errorSmsText = '';
  public errorTimeFlag = false;
  private interval: any;
  constructor(private formBuilder: FormBuilder, private authServices: AuthServices,
              private router: Router, private dataservices: DataServices) { }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
          phone: new FormControl(),
          code: new FormControl()
      });
      this.loginForm.get('phone').valueChanges.subscribe(x => {
          let phone = this.loginForm.get('phone').value;
          if (phone.length === 1){
              phone = '+7(';
              this.loginForm.patchValue({phone});
          } else if (phone.length === 6){
              phone = phone + ')';
              this.loginForm.patchValue({phone});
          } else if (phone.length > 14) {
              this.error = true;
          }

      });
  }

    startTimer() {
        this.interval = setInterval(() => {
            if (this.timeLeft <= 60 && this.timeLeft > 0) {
                this.timeLeft--;
            } else {
                if (this.timeLeft === 0){
                    this.errorTimeFlag = true;
                    this.error = false;
                    this.errorsms = false;
                    clearInterval(this.interval);
                }
            }
        }, 1000);
    }

    TokensData() {
        const temp = this.loginForm.getRawValue();
        clearInterval(this.interval);

        if (!this.flagcod){
            this.error = true;
            this.errorTimeFlag = false;
            this.timeLeft = 60;
            this.startTimer();
            this.authServices.register(temp['phone']).subscribe(
                (result: Response) => {
                    if (result.code !== 500 && result.code !== 400) {
                        this.flagcod = true;
                        this.flagRegister = result.code;
                        this.textEnter = 'Проверить';
                    }

                },
                    error1 => console.log(error1)
            );
        } else {
            this.authServices.checkCode(temp['phone'], temp['code'])
                .subscribe((result: Response) => {
                   if (result.code === 200){
                       this.dataservices.SendToken(result.data);
                       if (this.flagRegister === 201) {
                           this.router.navigate(['/account/update']);
                       } else {
                           this.router.navigate(['/account/show']);
                       }
                   } else {
                       this.errorSmsText = 'Код введен неверно';
                       this.errorsms = true;
                   }
                });
            if (temp['code'] === ''){
                    this.errorsms = true;
            } else {

            }
        }
    }

    getPhone($event: any) {
        console.log($event);
    }
}
