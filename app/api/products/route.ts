
import { NextResponse } from "next/server";
import { productsRepository } from "@/infrastructure/repositories/ProductsStaticRepository";
export async function GET() {
  const products = await productsRepository.getAll();
  return NextResponse.json(products);
}
