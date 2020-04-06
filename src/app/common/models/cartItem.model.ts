import { Product } from './product.model';

export class CartItem extends Product {
  constructor(product: Product, public quantity: number = 1) {
    super(
      product.sku, product.name, product.description, product.unitPrice, product.imageUrl,
      product.active, product.unitsInStock, product.dateCreated, product.lastCreated, product.id, product.categoryId
    );
  }
}
