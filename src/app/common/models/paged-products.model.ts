import { Product } from './product.model';
import { Page } from './page.model';

export class PagedProducts {
  public products: Product[];
  public page: Page;
}
