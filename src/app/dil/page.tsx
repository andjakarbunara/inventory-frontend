"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Dil: React.FC = () => {
  const { logout, role } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();           // Largon nga auth context
    router.push("/login");    // Kthen te faqja e login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-red-100 to-white">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-6">Dil nga Llogaria</h1>
        <p className="text-gray-600 mb-4">
          Je i kyçur si: <span className="font-semibold text-gray-800">{role}</span>
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
        >
          Dil
        </button>
      </div>
    </div>
  );
};

export default Dil;
