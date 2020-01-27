import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private PRODUCT_URL: string = `${environment.baseUrl}/product`;
  private PRODUCT_BY_CATEGORY_URL: string = `${this.PRODUCT_URL}/search/findByCategoryId?id=`;
  // Can't use the JPARepository auto generated URL below, because it does not implement pagination bu default
  // private PRODUCT_BY_CATEGORY_URL: string = `http://localhost:8080/api/product-category/?/products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<GetProducts>(this.PRODUCT_URL)
      .pipe(
        map((value: GetProducts) => value._embedded.product),
        // tap(value => console.log(value))
      );
  }

  getProductsByCategoryId(productCategoryId: number): Observable<Product[]> {
    // return this.http.get<GetProducts>(this.PRODUCT_BY_CATEGORY_URL.replace('?', productCategoryId + ''))
    return this.http.get<GetProducts>(this.PRODUCT_BY_CATEGORY_URL + productCategoryId + "")
      .pipe(
        map((value: GetProducts) => value._embedded.product),
        // tap(value => console.log(value))
      );
  }
}

interface GetProducts {
  _embedded: {
    product: Product[]
  }
}
