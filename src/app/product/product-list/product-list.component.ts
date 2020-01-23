import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';

import { ProductService } from '../../common/services/product.service';
import { Product } from '../../common/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['imageUrl', 'name', 'unitPrice', 'unitsInStock'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  getProductsSubscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.dataSource.data = [];
    this.dataSource.sort = this.sort;

    this.getProducts();
  }

  ngOnDestroy() {
    this.getProductsSubscription.unsubscribe();
  }

  getProducts() {
    this.getProductsSubscription = this.productService.getProducts()
      .subscribe((products: Product[]) => this.dataSource.data = products);
  }
}
