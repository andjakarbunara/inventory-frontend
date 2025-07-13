"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Magazina: React.FC = () => {
  const { role } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔒 Kontroll për rolin e përdoruesit
  useEffect(() => {
    if (!role) {
      router.replace("/login");
    } else if (role !== "pronar") {
      router.replace("/login");
    }
  }, [role, router]);

  // Fetch të dhënat vetëm për pronarin
  useEffect(() => {
    if (role !== "pronar") return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/magazine`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Gabim në marrjen e të dhënave:", err);
      }
    };

    fetchData();
  }, [role]);

  const filteredData = data.filter((item) =>
    (item.productName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Opsionale: shfaq një "loading" ose kthe `null` sa nuk është role i vendosur
  if (!role || role !== "pronar") return null;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-100 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Magazinë - Produktet Aktuale
        </h2>

        <input
          type="text"
          placeholder="Kërko produktin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left text-sm font-medium text-gray-700">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Emri i Produktit</th>
                <th className="px-4 py-2 border">Kosto</th>
                <th className="px-4 py-2 border">Sasia</th>
                <th className="px-4 py-2 border">Data e Furnizimit</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="text-sm text-gray-800 border-t hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.id}</td>
                  <td className="px-4 py-2 border">{item.productName || "—"}</td>
                  <td className="px-4 py-2 border">{item.cost} lekë</td>
                  <td className="px-4 py-2 border">{item.quantity}</td>
                  <td className="px-4 py-2 border">{item.lastRestocked || "—"}</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                    Asnjë produkt nuk u gjet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Magazina;
