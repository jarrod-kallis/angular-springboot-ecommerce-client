import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ProductCategory } from '../models/product-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private PRODUCT_CATEGORY_URL = `${environment.baseUrl}/product-category`;

  constructor(private http: HttpClient) { }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get(this.PRODUCT_CATEGORY_URL)
      .pipe(
        map((value: GetProductCategories) => value._embedded.productCategory),
        // tap((productCatgories: ProductCategory[]) => console.log(productCatgories))
      );
  }

  getProductCategory(id: number): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(`${this.PRODUCT_CATEGORY_URL}/${id}`);
    // .pipe(
    //   tap((productCategory: ProductCategory) => {
    //     console.log(productCategory);
    //   })
    // );
  }
}

interface GetProductCategories {
  _embedded: {
    productCategory: ProductCategory[]
  };
}
