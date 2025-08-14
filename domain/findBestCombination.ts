
import { Product } from "./product";

export function findBestCombination(products: Product[], budget: number): Product[] {
  const n = products.length;
  const W = Math.max(0, budget | 0);
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    const price = products[i - 1].price;
    for (let w = 0; w <= W; w++) {
      if (price <= w) dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - price] + price);
      else dp[i][w] = dp[i - 1][w];
    }
  }
  const res: Product[] = [];
  let w = W;
  for (let i = n; i >= 1; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      const product = products[i - 1];
      res.push(product);
      w -= product.price;
    }
  }
  return res.reverse();
}
