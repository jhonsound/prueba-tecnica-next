
import './globals.css'

export const metadata = {
  title: "Prueba Técnica - Carrito",
  description: "API + Frontend con Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="max-w-5xl mx-auto p-6 transition-colors duration-300">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">🛒 Prueba Técnica</h1>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
            Repositorio
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}
