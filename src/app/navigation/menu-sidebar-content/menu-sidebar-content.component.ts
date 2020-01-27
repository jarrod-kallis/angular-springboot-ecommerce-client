import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../common/services/product-category.service';
import { Observable } from 'rxjs';
import { ProductCategory } from '../../common/models/product-category.model';

@Component({
  selector: 'app-menu-sidebar-content',
  templateUrl: './menu-sidebar-content.component.html',
  styleUrls: ['./menu-sidebar-content.component.css']
})
export class MenuSidebarContentComponent implements OnInit {
  productCategories$: Observable<ProductCategory[]>;

  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit() {
    this.productCategories$ = this.productCategoryService.getProductCategories();
  }

}
