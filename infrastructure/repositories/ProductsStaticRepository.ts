
import { IProductsRepository } from "./IProductsRepository";
import { Product } from "@/domain/product";

export class ProductsStaticRepository implements IProductsRepository {
  private readonly products: Product[] = [
    { id: 1, name: "Producto 1", price: 60 },
    { id: 2, name: "Producto 2", price: 100 },
    { id: 3, name: "Producto 3", price: 120 },
    { id: 4, name: "Producto 4", price: 70 },
  ];
  async getAll(): Promise<Product[]> { return this.products; }
  async findById(id: number): Promise<Product | undefined> { return this.products.find(p => p.id === id); }
}

export const productsRepository: IProductsRepository = new ProductsStaticRepository();
