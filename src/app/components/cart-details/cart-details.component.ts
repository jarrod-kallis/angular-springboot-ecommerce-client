import { Component, OnInit } from '@angular/core';

import { CartService } from '../../common/services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../common/models/cartItem.model';
import { CartStatus } from '../../common/models/cartStatus.model';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  productsInCart$: Observable<CartItem[]>;
  cartStatus$: Observable<CartStatus>;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.productsInCart$ = this.cartService.productsInCart$;
    this.cartStatus$ = this.cartService.cartStatus$;
  }

  removeFromCart(cartItemId: number) {
    this.cartService.removeFromCart(cartItemId);
  }

  quantityChange(cartItemId: number, qty: number) {
    if (qty >= 1) {
      this.cartService.updateCartItemQuantity(cartItemId, qty);
    }
  }
}
