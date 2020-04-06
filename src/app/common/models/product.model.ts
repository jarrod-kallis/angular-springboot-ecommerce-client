export class Product {
  public id?: number;
  public sku: string;
  public name: string;
  public description: string;
  public unitPrice: number;
  public imageUrl: string;
  public active: boolean;
  public unitsInStock: number;
  public dateCreated: Date;
  public lastCreated: Date;
  public categoryId?: number;

  constructor(
    sku: string, name: string, description: string, unitPrice: number, imageUrl: string,
    active: boolean, unitsInStock: number, dateCreated: Date, lastCreated: Date, id?: number, categoryId?: number
  ) {
    this.sku = sku;
    this.name = name;
    this.description = description;
    this.unitPrice = unitPrice;
    this.imageUrl = imageUrl;
    this.active = active;
    this.unitsInStock = unitsInStock;
    this.dateCreated = dateCreated;
    this.lastCreated = lastCreated;
    this.id = id;
    this.categoryId = categoryId;
  }
}
