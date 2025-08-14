
import { Product } from "@/domain/product";
export type CartLine = { product: Product; quantity: number };
export interface ICartRepository {
  add(product: Product): Promise<void>;
  removeOne(productId: number): Promise<void>;
  removeAll(productId: number): Promise<void>;
  get(): Promise<CartLine[]>;
  clear(): Promise<void>;
}
