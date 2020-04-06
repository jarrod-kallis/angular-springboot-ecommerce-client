import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from '../models/product.model';
import { CartStatus } from '../models/cartStatus.model';
import { CartItem } from '../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsInCart: CartItem[] = [];

  cartStatusChanged = new Subject<CartStatus>();

  constructor() {
    this.cartStatusChanged.next(new CartStatus(this.productsInCart.length, 0));
  }

  addToCart(product: Product) {
    const foundCartItem: CartItem = this.productsInCart.find(cartItem => cartItem.id === product.id);

    if (foundCartItem) {
      foundCartItem.quantity++;
    } else {
      this.productsInCart = this.productsInCart.concat(new CartItem(product));
    }

    let totalQuantity = 0;
    let totalPrice = 0;
    this.productsInCart.forEach(productInCart => {
      // console.log(productInCart.name + ': ' + productInCart.quantity);
      totalQuantity += productInCart.quantity;
      totalPrice += productInCart.unitPrice * productInCart.quantity;
    });

    this.cartStatusChanged.next(new CartStatus(totalQuantity, totalPrice));
  }
}
