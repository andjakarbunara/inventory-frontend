"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Fatura = () => {
  const { role } = useAuth();
  const router = useRouter();

  const printRef = useRef<HTMLDivElement>(null);
  const [faturaToday, setFaturaToday] = useState<any[]>([]);
  const [faturaWeek, setFaturaWeek] = useState<any[]>([]);
  const [totalToday, setTotalToday] = useState(0);
  const [totalWeek, setTotalWeek] = useState(0);

  useEffect(() => {
    if (!role) {
      router.replace("/login");
    }
  }, [role, router]);

  useEffect(() => {
    if (!role) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fatura/today`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFaturaToday(data);
          const total = data.reduce((acc: number, item: any) => acc + item.total, 0);
          setTotalToday(total);
        }
      })
      .catch((err) => console.error("Gabim te faturat e sotme:", err));

    if (role === "pronar") {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fatura/week`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setFaturaWeek(data);
            const total = data.reduce((acc: number, item: any) => acc + item.total, 0);
            setTotalWeek(total);
          }
        })
        .catch((err) => console.error("Gabim te faturat e javes:", err));
    }
  }, [role]);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const originalContent = document.body.innerHTML;
    const contentToPrint = printContent.innerHTML;

    document.body.innerHTML = contentToPrint;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const renderTable = (title: string, data: any[], showTotal: boolean) => {
    const total = data.reduce((acc: number, item: any) => acc + item.total, 0);

    return (
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Produkti</th>
                <th className="py-2 px-4 border-b">Sasia</th>
                <th className="py-2 px-4 border-b">Totali (Lekë)</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                <>
                  {data.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{item.productName}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">{item.total.toLocaleString("sq-AL")} Lekë</td>
                    </tr>
                  ))}
                  {showTotal && (
                    <tr className="bg-gray-100 font-semibold">
                      <td className="py-2 px-4 text-right" colSpan={2}>
                        Totali
                      </td>
                      <td className="py-2 px-4">
                        {total.toLocaleString("sq-AL")} Lekë
                      </td>
                    </tr>
                  )}
                </>
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-400">
                    Nuk ka të dhëna për këtë seksion.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!role) return <div className="p-6">Duke kontrolluar autentifikimin...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Butoni për printim vetëm për kamarierin */}
        {role === "kamarier" && (
          <div className="mb-6 text-right">
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              🖨️ Printo Faturat e Sotme
            </button>
          </div>
        )}

        {/* Kartelat e totalit */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded-xl p-4 border-l-4 border-green-500">
            <div className="text-gray-500 text-sm">Faturat e Sotme</div>
            <div className="text-2xl font-bold mt-1">
              {totalToday.toLocaleString("sq-AL")} Lekë
            </div>
          </div>

          {role === "pronar" && (
            <div className="bg-white shadow rounded-xl p-4 border-l-4 border-blue-500">
              <div className="text-gray-500 text-sm">Faturat e Kësaj Jave</div>
              <div className="text-2xl font-bold mt-1">
                {totalWeek.toLocaleString("sq-AL")} Lekë
              </div>
            </div>
          )}
        </div>

        {/* Seksioni që printohet */}
        <div ref={printRef}>
          {renderTable("Faturat e Sotme", faturaToday, true)}
        </div>

        {/* Vetëm pronari sheh faturat javore */}
        {role === "pronar" && renderTable("Faturat e Kësaj Jave", faturaWeek, true)}
      </div>
    </div>
  );
};

export default Fatura;
