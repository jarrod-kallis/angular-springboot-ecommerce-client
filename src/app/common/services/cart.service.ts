import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';
import { CartStatus } from '../models/cartStatus.model';
import { CartItem } from '../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _productsInCart: CartItem[] = [];
  private _productsInCartChanged = new BehaviorSubject<CartItem[]>([]);
  private _productsInCart$ = this._productsInCartChanged.asObservable();

  private _cartStatusChanged = new BehaviorSubject<CartStatus>(new CartStatus(0, 0));
  private _cartStatus$ = this._cartStatusChanged.asObservable();

  constructor() {
    this._cartStatusChanged.next(new CartStatus(this._productsInCart.length, 0));
  }

  private calculateCartTotals() {
    let totalQuantity = 0;
    let totalPrice = 0;
    this._productsInCart.forEach(productInCart => {
      // console.log(productInCart.name + ': ' + productInCart.quantity);
      totalQuantity += productInCart.quantity;
      totalPrice += productInCart.unitPrice * productInCart.quantity;
    });

    this._cartStatusChanged.next(new CartStatus(totalQuantity, totalPrice));
  }

  addToCart(product: Product) {
    const foundCartItem: CartItem = this._productsInCart.find(cartItem => cartItem.id === product.id);

    if (foundCartItem) {
      foundCartItem.quantity++;
    } else {
      this._productsInCart = this._productsInCart.concat(new CartItem(product));
    }

    this.calculateCartTotals();
    this._productsInCartChanged.next(this._productsInCart);
  }

  removeFromCart(productId: number) {
    this._productsInCart = this._productsInCart.filter(cartItem => cartItem.id !== productId);

    this.calculateCartTotals();
    this._productsInCartChanged.next(this._productsInCart);
  }

  updateCartItemQuantity(productId: number, quantity: number) {
    this._productsInCart = this._productsInCart
      .map(cartItem => {
        if (cartItem.id === productId) {
          return { ...cartItem, quantity };
        } else {
          return cartItem;
        }
      });

    this.calculateCartTotals();
    this._productsInCartChanged.next(this._productsInCart);
  }

  public get productsInCart$(): Observable<CartItem[]> {
    return this._productsInCart$;
  }

  public get cartStatus$(): Observable<CartStatus> {
    return this._cartStatus$;
  }

}
