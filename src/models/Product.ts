class Product {
  name: string;
  price: number;
  inStock: number;
  description: string;
  image: string;
  id: string;

  constructor(
    name: string,
    price: number,
    inStock: number,
    description: string,
    image: string,
    id: string
  ) {
    this.name = name;
    this.price = price;
    this.inStock = inStock;
    this.description = description;
    this.image = image;
    this.id = id;
  }
}

export default Product;
