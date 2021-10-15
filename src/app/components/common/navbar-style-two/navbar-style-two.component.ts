import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {DataServices} from '../../services/data.service';
import {BacketServices} from '../../services/backet.service';
import { Response } from '../../classes/Response';
import {NavigationEnd, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-style-two',
  templateUrl: './navbar-style-two.component.html',
  styleUrls: ['./navbar-style-two.component.scss'],
  providers: [CookieService, BacketServices]
})
export class NavbarStyleTwoComponent implements OnInit, OnChanges  {

  // public countOrders = 0;
  @Input() countOrders;
  constructor(private cookieService: CookieService,
              private backetService: BacketServices,
              private router: Router) { }


  ngOnInit(): void {
      this.countOrders = this.cookieService.get('nishtyak_count');
      if (this.countOrders === undefined || this.countOrders === ''){
          this.countOrders = 0;
      }
  }

  ngOnChanges(changes: SimpleChanges) {
        this.ngOnInit();
  }




}
