export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  isDiscontinued: boolean;
}

export class Product implements IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  isDiscontinued: boolean;

  constructor(product: IProduct) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.isDiscontinued = product.isDiscontinued;
  }
}

export const productsDB: Array<Product> = [
  new Product({
    id: 1,
    name: "Product 1",
    description: "Product 1 description",
    price: 100,
    isDiscontinued: false
  }),
  new Product({
    id: 2,
    name: "Product 2",
    description: "Product 2 description",
    price: 200,
    isDiscontinued: true
  }),
  new Product({
    id: 3,
    name: "Product 3",
    description: "Product 3 description",
    price: 300,
    isDiscontinued: false
  })
];