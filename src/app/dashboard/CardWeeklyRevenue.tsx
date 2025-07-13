"use client";

import { useEffect, useState } from "react";
import numeral from "numeral";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type RevenueData = {
  date: string;
  total: number;
};

const CardWeeklyRevenue = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fatura/revenue-by-day`) // 🔁 endpoint i saktë
      .then((res) => res.json())
      .then((data) => {
        setRevenueData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gabim gjatë marrjes së të dhënave:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      {loading ? (
        <div className="m-5">Duke u ngarkuar...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Totali për 7 Ditët e Fundit
            </h2>
            <hr />
          </div>

          {/* CHART */}
          <div className="px-4 pb-6">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 0, left: -30, bottom: 30 }}
              >
                <XAxis
                  dataKey="date"
                  tickFormatter={(dateStr) => {
                    const date = new Date(dateStr);
                    return date.toLocaleDateString("sq-AL", {
                      weekday: "short",
                    });
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={(value) => numeral(value).format("0a") + " L"}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [`${value} Lekë`, "Fitimi"]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("sq-AL", {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                    });
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  fill="rgba(59, 130, 246, 0.3)"
                  strokeWidth={2}
                  dot
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardWeeklyRevenue;

