"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

function Porosia() {
  const { role } = useAuth();
  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Record<string, any>>({});

  // 🔐 Kontroll i rolit
  useEffect(() => {
    if (!role || role !== "kamarier") {
      router.push("/login");
    }
  }, [role]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/magazine`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to fetch items", err));
  }, []);

  const handleAddToOrder = (item: any) => {
    setOrders((prev) => {
      const currentQty = prev[item.id]?.quantity || 0;
      if (currentQty >= item.quantity) return prev;
      return {
        ...prev,
        [item.id]: { ...item, quantity: currentQty + 1 },
      };
    });
  };

  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setOrders((prev) => {
      const current = prev[id]?.quantity || 0;
      const newQuantity = Math.max(1, Math.min(current + change, item.quantity));
      return {
        ...prev,
        [id]: { ...item, quantity: newQuantity },
      };
    });
  };

  const handleSave = async () => {
    const payload = Object.values(orders).map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fatura/save`, payload);
      setOrders({});
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/magazine`);
      setItems(res.data);
      alert("Porosia u ruajt me sukses!");
    } catch (err) {
      console.error(err);
      alert("Dështoi ruajtja e porosisë.");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      typeof item.productName === "string" &&
      item.productName.toLowerCase().includes(search.toLowerCase())
  );

  const totalCost = Object.values(orders).reduce(
    (sum, item: any) => sum + item.quantity * item.cost,
    0
  );

  // Shfaq asgjë sa nuk kemi role të konfirmuar
  if (!role) return null;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Items */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Produkte</h2>
          <input
            type="text"
            placeholder="Kërko produkt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th>Emri</th>
                <th className="text-right">Sasia</th>
                <th className="text-right">Çmimi</th>
                <th className="text-center">Porosit</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td>{item.productName}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">{item.cost} Lek</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleAddToOrder(item)}
                      className="text-blue-600 font-bold"
                      disabled={item.quantity === 0}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Porosia</h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th>Produkt</th>
                <th className="text-center">Sasia</th>
                <th className="text-right">Çmimi</th>
                <th className="text-right">Totali</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(orders).map((item: any) => (
                <tr key={item.id} className="border-t">
                  <td>{item.productName}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-2"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      disabled={
                        item.quantity >=
                        items.find((i) => i.id === item.id)?.quantity
                      }
                      className="px-2"
                    >
                      +
                    </button>
                  </td>
                  <td className="text-right">{item.cost} Lek</td>
                  <td className="text-right">{item.cost * item.quantity} Lek</td>
                  <button
                    onClick={() => {
                      setOrders((prev) => {
                        const updated = { ...prev };
                        delete updated[item.id];
                        return updated;
                      });
                    }}
                    className="ml-4 text-red-500 hover:underline text-sm"
                  >
                    ❌
                  </button>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <p className="font-semibold">Totali: {totalCost} Lek</p>
            <button
              onClick={handleSave}
              disabled={totalCost === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Ruaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Porosia;
