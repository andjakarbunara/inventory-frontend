"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setRole(decoded.role);
      } catch {
        logout();
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();

      if (res.success && res.token) {
        const decoded: any = jwtDecode(res.token);
        const userRole = decoded.role;

        localStorage.setItem("token", res.token);
        setRole(userRole);

        if (userRole === "pronar") {
          router.push("/dashboard");
        } else if (userRole === "kamarier") {
          router.push("/porosia");
        }
      } else {
        alert("Kredencialet janë të gabuara.");
      }
    } catch (err) {
      console.error("Gabim gjatë login:", err);
      alert("Gabim gjatë lidhjes me serverin.");
    }
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

