
import { ICartRepository, CartLine } from "./ICartRepository";
import { Product } from "@/domain/product";

class CartInMemoryRepository implements ICartRepository {
  private lines: Map<number, CartLine> = new Map();

  async add(product: Product): Promise<void> {
    const current = this.lines.get(product.id);
    if (current) {
      this.lines.set(product.id, { ...current, quantity: current.quantity + 1 });
    } else {
      this.lines.set(product.id, { product, quantity: 1 });
    }
  }

  async removeOne(productId: number): Promise<void> {
    const current = this.lines.get(productId);
    if (!current) return;
    if (current.quantity > 1) {
      this.lines.set(productId, { ...current, quantity: current.quantity - 1 });
    } else {
      this.lines.delete(productId);
    }
  }

  async removeAll(productId: number): Promise<void> {
    this.lines.delete(productId);
  }

  async get(): Promise<CartLine[]> {
    return Array.from(this.lines.values());
  }

  async clear(): Promise<void> {
    this.lines.clear();
  }
}

export const cartRepository: ICartRepository = new CartInMemoryRepository();
