import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ProductService } from '../../common/services/product.service';
import { Product } from '../../common/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  routeParamsSubscription: Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params
      .subscribe((params: Params) => this.getProducts(+params.id));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }

  getProducts(productCategoryId: number) {
    this.products$ = isNaN(productCategoryId) ?
      this.productService.getProducts() :
      this.productService.getProductsByCategoryId(productCategoryId);
  }
}
