
import { ICartRepository } from "@/infrastructure/repositories/ICartRepository";
import { IProductsRepository } from "@/infrastructure/repositories/IProductsRepository";
import { z } from "zod";

const ProductIdSchema = z.object({ id: z.number().int().positive() });

export class CartService {
  constructor(
    private readonly cartRepo: ICartRepository,
    private readonly productsRepo: IProductsRepository
  ) {}

  async addToCart(input: unknown) {
    const { id } = ProductIdSchema.parse(input);
    const product = await this.productsRepo.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    await this.cartRepo.add(product);
    return this.getCart();
  }

  async removeOneFromCart(input: unknown) {
    const { id } = ProductIdSchema.parse(input);
    await this.cartRepo.removeOne(id);
    return this.getCart();
  }

  async removeAllFromCart(input: unknown) {
    const { id } = ProductIdSchema.parse(input);
    await this.cartRepo.removeAll(id);
    return this.getCart();
  }

  async clearCart() {
    await this.cartRepo.clear();
    return this.getCart();
  }

  async getCart() {
    const items = await this.cartRepo.get();
    const total = items.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
    return { items, total };
  }
}
