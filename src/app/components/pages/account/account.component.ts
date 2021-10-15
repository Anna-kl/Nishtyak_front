import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DataServices} from '../../services/data.service';
import {AccountServices} from '../../services/account.service';
import {Response} from '../../classes/Response';
import {User} from '../../classes/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [AccountServices]
})
export class AccountComponent implements OnInit {
  staffForm: FormGroup;
  paramUpdate: string;
  idUser: number;
  token: string;
  accountForm: FormGroup;
  user: User;

  constructor(private route: ActivatedRoute, private dataservices: DataServices,
              private accountService: AccountServices, private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
      this.accountForm = this.formBuilder.group(
          {
              phone: '',
              email: '',
              coupon: '',
              name: '',
          }
      );
      this.route.params.subscribe(params => {
          this.paramUpdate = params['param'];
          this.dataservices.users.subscribe(result => this.token = result);

          this.accountService.getAccount(this.token).subscribe(
              (result: Response) => {
                  if (result.code === 200) {
                      this.user = result.data as User;
                      if (this.paramUpdate === 'update') {
                          this.accountForm = this.formBuilder.group(
                              {
                                  phone: this.user.phone,
                                  email: this.user.email != null ? this.user.email : '',
                                  coupon: this.user.coupon,
                                  name: this.user.name,
                              }
                          );
                      }
                  }
              });
      });
  }

    position(text: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: text,
            showConfirmButton: false,
            timer: 1500
        }); }

    onSubmitAccount() {
        const data = this.accountForm.getRawValue();
        for (const res of Object.keys(data)) {
            Object(this.user)[res] = data[res] !== null ? data[res] : '';
        }
        this.accountService.saveAccount(this.user, this.token).subscribe(
            (result: Response) => {
                if (result.code === 200){
                    this.position('Аккаунт обновлен');
                    this.router.navigate(['/account/show']);
                }
            }
        );
    }

    Update() {
        this.router.navigate(['/account/update']);
    }
}
