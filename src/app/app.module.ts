import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { MenuSidebarContentComponent } from './navigation/menu-sidebar-content/menu-sidebar-content.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { AddToCartComponent } from './components/buttons/add-to-cart/add-to-cart.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    MenuSidebarContentComponent,
    SearchComponent,
    ProductDetailComponent,
    PaginationComponent,
    CartStatusComponent,
    AddToCartComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
