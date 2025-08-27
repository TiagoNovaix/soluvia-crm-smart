import { Smartphone } from "lucide-react";

interface Product {
  name: string;
  searches: number;
}

export function ProductsSection() {
  const products: Product[] = [
    { name: "Capinha X-ONE", searches: 80 },
    { name: "iPhone 13", searches: 22 },
    { name: "iPhone 15", searches: 18 },
    { name: "Samsung Galaxy S24", searches: 15 },
    { name: "Película 3D", searches: 12 },
    { name: "Carregador Wireless", searches: 9 },
    { name: "Fone Bluetooth", searches: 7 },
    { name: "Power Bank", searches: 5 },
  ];

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Smartphone className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          PRODUTOS MAIS PROCURADOS
        </h2>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.name} className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                {index + 1}
              </div>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {product.searches}
              </span>
              <span className="text-sm text-muted-foreground">x</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          Dados baseados nas últimas 30 dias
        </p>
      </div>
    </div>
  );
}