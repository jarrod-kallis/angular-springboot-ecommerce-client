import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params
      .subscribe((params: Params) => {
        // console.log(params);
        if (params.id) {
          this.getProductsByCategoryId(+params.id);
        } else if (params.keyword) {
          this.getProductsByName(params.keyword);
        } else {
          this.getProducts();
        }
      });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }

  getProductsByCategoryId(productCategoryId: number) {
    this.products$ = this.productService.getProductsByCategoryId(productCategoryId);
  }

  getProductsByName(productName: string) {
    this.products$ = this.productService.getProductsByNameContaining(productName);
  }

  getProducts() {
    this.products$ = this.productService.getProductList();
  }

  onProductClick(productId: number) {
    this.router.navigate(['products', productId]);
  }
}
