"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle } from "lucide-react";

interface Product {
  id: number;
  productName: string;
  quantity: number;
}

const CardOutOfStockProducts = () => {
  const [outOfStockProducts, setOutOfStockProducts] = useState<Product[]>([]);
  const [totalOutOfStock, setTotalOutOfStock] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/magazine`)
      .then(({ data }) => {
        const filtered = data.filter((item: Product) => item.quantity === 0);
        filtered.sort((a: Product, b: Product) => a.productName.localeCompare(b.productName));

        setTotalOutOfStock(filtered.length);
        setOutOfStockProducts(filtered.slice(0, 5));
      })
      .catch((err) => {
        console.error("Gabim në marrjen e produkteve:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      <h3 className="text-lg font-semibold px-6 pt-5 pb-2">
        Produktet pa stok
      </h3>
      <hr />

      {loading ? (
        <div className="px-6 py-4">Duke u ngarkuar...</div>
      ) : (
        <div className="overflow-auto max-h-80">
          {outOfStockProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-3 px-6 py-4 border-b"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {product.productName}
                  </span>
                  <span className="text-xs text-gray-400">ID: {product.id}</span>
                </div>
              </div>
              <div className="text-xs text-red-600 font-semibold">Sasia: 0</div>
            </div>
          ))}
        </div>
      )}

      {totalOutOfStock > 5 && (
        <div className="text-center text-sm text-red-600 px-6 pt-3">
          Ka gjithsej {totalOutOfStock} produkte pa stok. Kontrollo magazinën.
        </div>
      )}
    </div>
  );
};

export default CardOutOfStockProducts;

