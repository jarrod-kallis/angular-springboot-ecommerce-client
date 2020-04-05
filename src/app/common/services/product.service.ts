import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';
import { Page } from '../models/page.model';
import { PagedProducts } from '../models/paged-products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private PRODUCT_URL = `${environment.baseUrl}/product`;
  private PRODUCT_BY_CATEGORY_URL = `${this.PRODUCT_URL}/search/findByCategoryId?id=`;
  // Can't use the JPARepository auto generated URL below, because it does not implement pagination bu default
  // private PRODUCT_BY_CATEGORY_URL: string = `http://localhost:8080/api/product-category/?/products`;
  private PRODUCT_BY_NAME_LIKE_URL = `${this.PRODUCT_URL}/search/findByNameContaining?name=`;

  constructor(private http: HttpClient) { }

  getProductList(page: number, pageSize: number): Observable<PagedProducts> {
    // console.log(`${this.PRODUCT_URL}?page=${page}&size=${PAGE_SIZE}`);
    return this.getProducts(`${this.PRODUCT_URL}?page=${page}&size=${pageSize}`);
  }

  getProductsByCategoryId(productCategoryId: number, page: number, pageSize: number): Observable<PagedProducts> {
    // return this.http.get<GetProducts>(this.PRODUCT_BY_CATEGORY_URL.replace('?', productCategoryId + ''))
    return this.getProducts(`${this.PRODUCT_BY_CATEGORY_URL}${productCategoryId}&page=${page}&size=${pageSize}`);
  }

  getProductsByNameContaining(name: string, page: number, pageSize: number): Observable<PagedProducts> {
    return this.getProducts(`${this.PRODUCT_BY_NAME_LIKE_URL}${name}&page=${page}&size=${pageSize}`);
  }

  private getProducts(url: string): Observable<PagedProducts> {
    return this.http.get<GetProducts>(url)
      .pipe(
        map((value: GetProducts) => {
          const pagedProducts: PagedProducts = new PagedProducts();
          pagedProducts.products = value._embedded.product;
          pagedProducts.page = value.page;

          return pagedProducts;
        })
        // tap(value => console.log(value))
      );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCT_URL}/${productId}`);
  }
}

interface GetProducts {
  _embedded: {
    product: Product[]
  };
  page: Page;
}
