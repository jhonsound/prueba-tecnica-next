
"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/domain/product";
import { findBestCombination } from "@/domain/findBestCombination";

type CartItem = { product: Product; quantity: number; };

async function fetchJSON<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [budget, setBudget] = useState<number>(150);
  const [best, setBest] = useState<Product[]>([]);

  useEffect(() => {
    fetchJSON<Product[]>("/api/products").then(setProducts).catch(console.error);
    refreshCart();
  }, []);

  useEffect(() => {
    const result = findBestCombination(products, budget);
    setBest(result);
  }, [products, budget]);

  async function refreshCart() {
    const data = await fetchJSON<{ items: CartItem[], total: number }>("/api/cart");
    setCart(data.items);
  }

  async function addToCart(id: number) {
    await fetchJSON("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await refreshCart();
  }

  async function removeOneFromCart(id: number) {
    await fetchJSON(`/api/cart?id=${id}`, { method: "DELETE" });
    await refreshCart();
  }

  async function removeAllFromCart(id: number) {
    await fetchJSON(`/api/cart?id=${id}&all=true`, { method: "DELETE" });
    await refreshCart();
  }

  async function clearCart() {
    await fetchJSON("/api/cart", { method: "DELETE" });
    await refreshCart();
  }

  const total = useMemo(() => cart.reduce((acc, it) => acc + it.product.price * it.quantity, 0), [cart]);

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Productos</h2>
          <ul className="space-y-4">
            {products.map((p) => (
              <li key={p.id} className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-gray-500 dark:text-gray-400">${p.price}</div>
                </div>
                <button onClick={() => addToCart(p.id)} className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition">
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Carrito</h2>
          <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 max-h-[400px] overflow-y-auto">
            {cart.length === 0 && <div className="text-gray-500 dark:text-gray-400">Aún no tienes productos.</div>}
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center border-b py-2">
                <div>{item.product.name} × {item.quantity}</div>
                <div className="flex items-center space-x-2">
                  <span>${item.product.price * item.quantity}</span>
                  <button onClick={() => removeOneFromCart(item.product.id)} className="text-yellow-500 hover:text-yellow-600">➖</button>
                  <button onClick={() => removeAllFromCart(item.product.id)} className="text-red-500 hover:text-red-600">❌</button>
                </div>
              </div>
            ))}
            {cart.length > 0 && (
              <div className="mt-4 text-right">
                <strong>Total: ${total}</strong>
                <div>
                  <button onClick={clearCart} className="mt-2 px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">
                    Vaciar carrito
                  </button>
                </div>
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">Mejor combinación por presupuesto</h2>
          <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
            <label className="block mb-2">
              Presupuesto:&nbsp;
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value || "0", 10))}
                className="w-28 p-1 rounded border dark:bg-gray-700"
              />
            </label>
            <ul className="space-y-1">
              {best.map((p) => (
                <li key={p.id} className="flex justify-between">
                  <span>{p.name}</span>
                  <span>${p.price}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-2 font-semibold">
              <span>Total</span>
              <span>${best.reduce((a, b) => a + b.price, 0)}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
