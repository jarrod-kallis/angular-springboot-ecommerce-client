import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { ProductService } from '../../common/services/product.service';
import { ProductCategoryService } from '../../common/services/product-category.service';
import { ProductCategory } from '../../common/models/product-category.model';
import { map } from 'rxjs/operators';
import { PagedProducts } from '../../common/models/paged-products.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pagedProducts$: Observable<PagedProducts>;
  productCategory$: Observable<ProductCategory>;

  pageNumber: number;
  pageSize: number;
  collectionSize: number;

  routeParamsSubscription: Subscription;
  pagedProductsSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routeParamsSubscription = combineLatest(this.route.params, this.route.queryParams)
      .pipe(
        map((results: any[]) => ({ params: results[0], queryParams: results[1] }))
      )
      .subscribe(results => {
        // console.log(results);

        if (results.params.id) {
          this.getProductsByCategoryId(+results.params.id, +results.queryParams.page);
          this.getProductCategory(+results.params.id);
        } else if (results.params.keyword) {
          this.getProductsByName(results.params.keyword, +results.queryParams.page);
        } else {
          // console.log(+results.queryParams.page);
          this.getProducts(+results.queryParams.page);
        }
      });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.unsubscribeFromPagedProducts();
  }

  getProductsByCategoryId(productCategoryId: number, page: number) {
    this.pagedProducts$ = this.productService.getProductsByCategoryId(productCategoryId, page - 1);
    this.subscribeToPagination();
  }

  getProductCategory(productCategoryId: number) {
    this.productCategory$ = this.productCategoryService.getProductCategory(productCategoryId);
  }

  getProductsByName(productName: string, page: number) {
    this.pagedProducts$ = this.productService.getProductsByNameContaining(productName, page - 1);
    this.subscribeToPagination();
  }

  getProducts(page: number) {
    this.pagedProducts$ = this.productService.getProductList(page - 1);
    this.subscribeToPagination();
  }

  unsubscribeFromPagedProducts() {
    if (this.pagedProductsSubscription) {
      this.pagedProductsSubscription.unsubscribe();
    }
  }

  subscribeToPagination(): void {
    this.unsubscribeFromPagedProducts();

    this.pagedProductsSubscription = this.pagedProducts$.subscribe((pagedProduct: PagedProducts) => {
      // console.log(this, pagedProduct.page);
      this.pageNumber = pagedProduct.page.number + 1;
      this.pageSize = pagedProduct.page.size;
      this.collectionSize = pagedProduct.page.totalElements;
    });
  }

  onProductClick(productId: number) {
    this.router.navigate(['products', productId]);
  }

  onPageChange(page: number) {
    this.router.navigate([], { queryParams: { page } });
  }
}
