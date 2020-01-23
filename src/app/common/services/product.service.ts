import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL: string = 'http://localhost:8080/api';
  private PRODUCT_BASE_URL: string = `${this.BASE_URL}/product`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<GetProducts>(this.PRODUCT_BASE_URL)
      .pipe(
        map((value: GetProducts) => value._embedded.product),
        tap(value => console.log(value))
      );
  }
}

interface GetProducts {
  _embedded: {
    product: Product[]
  }
}
