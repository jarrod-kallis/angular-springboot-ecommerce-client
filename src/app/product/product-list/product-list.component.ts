import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { ProductService } from '../../common/services/product.service';
import { ProductCategoryService } from '../../common/services/product-category.service';
import { ProductCategory } from '../../common/models/product-category.model';
import { map, take } from 'rxjs/operators';
import { PagedProducts } from '../../common/models/paged-products.model';
import { SearchService } from '../../common/services/search.service';

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
    private searchService: SearchService,
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

        this.searchService.updateSearchKeyword(results.params.keyword);

        if (results.params.id) {
          this.getProductsByCategoryId(+results.params.id, +results.queryParams.page, +results.queryParams.pageSize);
          this.getProductCategory(+results.params.id);
        } else if (results.params.keyword) {
          this.getProductsByName(results.params.keyword, +results.queryParams.page, +results.queryParams.pageSize);
        } else {
          // console.log(+results.queryParams.page);
          this.getProducts(+results.queryParams.page, +results.queryParams.pageSize);
        }
      });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.unsubscribeFromPagination();
  }

  getProductsByCategoryId(productCategoryId: number, page: number, pageSize: number) {
    this.pagedProducts$ = this.productService.getProductsByCategoryId(productCategoryId, page - 1, pageSize);
    this.subscribeToPagination();
  }

  getProductCategory(productCategoryId: number) {
    this.productCategory$ = this.productCategoryService.getProductCategory(productCategoryId);
  }

  getProductsByName(productName: string, page: number, pageSize: number) {
    this.pagedProducts$ = this.productService.getProductsByNameContaining(productName, page - 1, pageSize);
    this.subscribeToPagination();
  }

  getProducts(page: number, pageSize: number) {
    this.pagedProducts$ = this.productService.getProductList(page - 1, pageSize);
    this.subscribeToPagination();
  }

  unsubscribeFromPagination() {
    if (this.pagedProductsSubscription) {
      this.pagedProductsSubscription.unsubscribe();
    }
  }

  subscribeToPagination(): void {
    this.unsubscribeFromPagination();

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
    this.route.queryParams
      .pipe(
        take(1)
      )
      .subscribe(currentQueryParams => {
        this.router.navigate([], { queryParams: { ...currentQueryParams, page } });
      });
  }

  onPageSizeChange(pageSize: number) {
    this.route.queryParams
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.router.navigate([], { queryParams: { page: 1, pageSize } });
      });
  }
}
