
import { NextResponse } from "next/server";
import { cartRepository } from "@/infrastructure/repositories/CartInMemoryRepository";
import { productsRepository } from "@/infrastructure/repositories/ProductsStaticRepository";
import { CartService } from "@/application/CartService";

const cartService = new CartService(cartRepository, productsRepository);

export async function GET() {
  const cart = await cartService.getCart();
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cart = await cartService.addToCart(body);
    return NextResponse.json(cart, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message ?? "Bad Request" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const all = searchParams.get("all");

  try {
    let cart;
    if (id) {
      if (all === "true") {
        cart = await cartService.removeAllFromCart({ id: Number(id) });
      } else {
        cart = await cartService.removeOneFromCart({ id: Number(id) });
      }
    } else {
      cart = await cartService.clearCart();
    }
    return NextResponse.json(cart);
  } catch (err: any) {
    return NextResponse.json({ message: err.message ?? "Bad Request" }, { status: 400 });
  }
}
