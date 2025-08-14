
# Prueba Técnica: API y Carrito (Next.js + TypeScript)


## Endpoints
- `GET /api/products` → lista estática de productos (sin DB).
- `POST /api/cart` → body `{ id: number }` agrega producto al carrito en memoria.
- `GET /api/cart` → retorna `{ items: { product, quantity }[], total }`.

## Correr local
```bash
npm i # o npm i / yarn
npm dev # o npm run dev / yarn dev
# abre http://localhost:3000
```

## Tests manuales con curl
```bash
curl http://localhost:3000/api/products

curl -X POST http://localhost:3000/api/cart -H "content-type: application/json" -d '{ "id": 1 }'

curl http://localhost:3000/api/cart
```

## Diseño de carpetas
```text
app/
  api/
    cart/route.ts
    products/route.ts
  layout.tsx
  page.tsx
application/
  CartService.ts
domain/
  findBestCombination.ts
  product.ts
infrastructure/
  repositories/
    CartInMemoryRepository.ts
    ICartRepository.ts
    IProductsRepository.ts
    ProductsStaticRepository.ts
```



