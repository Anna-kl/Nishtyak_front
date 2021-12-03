import { Component, OnInit } from '@angular/core';
import {IStock} from '../../classes/Stock';
import {Response} from '../../classes/Response';
import {ProductServices} from '../../services/product.service';

@Component({
  selector: 'app-food-collection',
  templateUrl: './food-collection.component.html',
  styleUrls: ['./food-collection.component.scss'],
  providers: [ProductServices]
})
export class FoodCollectionComponent implements OnInit {

    public stocks: IStock[] = [];

  constructor(private productService: ProductServices) { }

  ngOnInit(): void {
      this.productService.getStock().
      subscribe((result: any) => {
          this.stocks = result.data as IStock[];
      });
  }

}
