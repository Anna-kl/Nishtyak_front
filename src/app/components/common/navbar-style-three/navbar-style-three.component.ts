import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {DataServices} from '../../services/data.service';
import {BacketServices} from '../../services/backet.service';
import {Response} from '../../classes/Response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-style-three',
  templateUrl: './navbar-style-three.component.html',
  styleUrls: ['./navbar-style-three.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CookieService, BacketServices]
})
export class NavbarStyleThreeComponent implements OnChanges, OnInit {

  @Input() countOrders = 0;
  public test;
  constructor(private cookieService: CookieService,
              private dataService: DataServices,
              private backetService: BacketServices,
              private router: Router) {

  }
    ngOnInit(){
      const count = this.cookieService.get('nishtyak_count');
      if (count === ''){
          this.countOrders = 0;
      } else{
          this.countOrders = Number.parseInt(count);
      }
    }

    ngOnChanges(changes: SimpleChanges) {
       this.ngOnInit();
    }

    RouteSale() {
        this.router.navigate(['/food-collection']);
    }
}
