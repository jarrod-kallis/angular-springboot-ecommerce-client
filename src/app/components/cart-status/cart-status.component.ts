import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CartService } from '../../common/services/cart.service';
import { CartStatus } from '../../common/models/cartStatus.model';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  cartStatusChange$: Observable<CartStatus>;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // console.log('CartStatus OnInit');
    this.cartStatusChange$ = this.cartService.cartStatusChanged;
  }

  getTotalPrice(cartStatus: CartStatus): number {
    return cartStatus ? cartStatus.totalPrice : 0;
  }

  getTotalQuantity(cartStatus: CartStatus): number {
    return cartStatus ? cartStatus.totalQuantity : 0;
  }
}
