"use client";

import CardOutOfStockProducts from "./CardOutOfStockProducts";
import CardSalesSummary from "./CardSalesSummary";
import CardWeeklyRevenue from "./CardWeeklyRevenue";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const router = useRouter();
  const { role } = useAuth(); // merr role nga auth context

  useEffect(() => {
    if (!role) {
      router.replace("/login"); // nëse nuk ka role ridrejto në login
    }
  }, [role, router]);

  if (!role) {
    // opsionale: mund të shfaqësh loading ose null derisa ridrejton
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardOutOfStockProducts />
      <CardSalesSummary />
      <CardWeeklyRevenue />
      </div>
  );
};

export default Dashboard;

