"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  Menu,
  User,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuth } from "../../context/AuthContext";



interface SidebarLinkProps {
  href: string;
  icon: any;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const { role } = useAuth(); 

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
       <FileText className="w-8 h-8 text-blue-600" />
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          BAR GRAIN
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        {role === "pronar" && (
          <>
            <SidebarLink
              href="/dashboard"
              icon={Layout}
              label="Dashboard"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              href="/furnizim"
              icon={Archive}
              label="Furnizim"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              href="/magazina"
              icon={Clipboard}
              label="Magazina"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              href="/fatura"
              icon={CircleDollarSign}
              label="Fatura"
              isCollapsed={isSidebarCollapsed}
            />
          </>
        )}

        {role === "kamarier" && (
          <>
            <SidebarLink
              href="/porosia"
              icon={Clipboard}
              label="Porosia"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              href="/fatura"
              icon={CircleDollarSign}
              label="Fatura"
              isCollapsed={isSidebarCollapsed}
            />
          </>
        )}

        {/* DIL për të gjithë */}
        <SidebarLink
          href="/dil"
          icon={User}
          label="Dil"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 Edstock</p>
      </div>
    </div>
  );
};

export default Sidebar;

