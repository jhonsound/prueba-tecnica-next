
import { Product } from "@/domain/product";
export interface IProductsRepository {
  getAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | undefined>;
}
