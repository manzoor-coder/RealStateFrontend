"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FaTachometerAlt,
  FaUsers,
  FaHome,
  FaUserTie,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaBuilding,
  FaChartLine,
  FaHistory,
  FaBell,
  FaUser,
  FaCalendar,
} from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/contexts/AuthContext";

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user } = useContext(AuthContext)!;

  const sidebarItems = [
    {
      id: "overview",
      icon: FaTachometerAlt,
      label: "Dashboard",
      color: "text-blue-500",
      route: "/dashboard",
      roles: [1, 2, 5],
    },
    {
      id: "users",
      icon: FaUsers,
      label: "User Management",
      color: "text-green-500",
      route: "/dashboard/users",
      roles: [1],
    },
    {
      id: "properties",
      icon: FaHome,
      label: "Property Management",
      color: "text-purple-500",
      route: "/dashboard/properties",
      roles: [1, 2],
    },
    {
      id: "messages",
      icon: FaRegMessage,
      label: "Messages",
      color: "text-purple-500",
      route: "/dashboard/messages",
      roles: [2],
    },
    {
      id: "clients",
      icon: FaUser,
      label: "Clients",
      color: "text-purple-500",
      route: "/dashboard/clients",
      roles: [5],
    },
    {
      id: "appointments",
      icon: FaCalendar,
      label: "Appointments",
      color: "text-purple-500",
      route: "/dashboard/appointments",
      roles: [5],
    },
    {
      id: "agents",
      icon: FaUserTie,
      label: "Agent Management",
      color: "text-orange-500",
      route: "/dashboard/agents",
      roles: [1],
    },
    {
      id: "projects",
      icon: FaBuilding,
      label: "Project Management",
      color: "text-pink-500",
      route: "/dashboard/projects",
      roles: [1],
    },
    {
      id: "analytics",
      icon: FaChartLine,
      label: "Analytics",
      color: "text-indigo-500",
      route: "/dashboard/analytics",
      roles: [1, 2],
    },
    {
      id: "history",
      icon: FaHistory,
      label: "History",
      color: "text-teal-500",
      route: "/dashboard/history",
      roles: [1, 2, 5],
    },
    {
      id: "notifications",
      icon: FaBell,
      label: "Notifications",
      color: "text-yellow-500",
      route: "/dashboard/notifications",
      roles: [1, 5],
    },
    {
      id: "settings",
      icon: FaCog,
      label: "Settings",
      color: "text-gray-500",
      route: "/dashboard/settings",
      roles: [1, 2, 5],
    },
  ];

  const SidebarButton = ({ item }: { item: (typeof sidebarItems)[0] }) => {
    const isActive = pathname === item.route;
    const button = (
      <Link href={item.route} className="block">
        <Button
          variant="ghost"
          className={cn(
            "group w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden",
            isActive
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:shadow-md hover:scale-[1.02]"
          )}
        >
          <item.icon
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isActive
                ? "text-white"
                : "text-slate-500 group-hover:text-slate-700 group-hover:scale-110"
            )}
          />
          {sidebarOpen && <span>{item.label}</span>}
        </Button>
      </Link>
    );

    if (!sidebarOpen) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent
              side="right"
              className={`${item.color} bg-white border shadow-lg`}
            >
              <p className="font-medium">{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } transition-all duration-300 bg-white shadow-lg border-r fixed left-0 top-0 h-full z-40 ${
        !sidebarOpen ? "rounded-r-2xl m-2 h-[calc(100vh-16px)]" : ""
      } overflow-y-auto`}
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center mr-2">
                <FaTachometerAlt className="text-white text-sm" />
              </div>
              <span className="font-bold gradient-text">Admin Panel</span>
            </div>
          ) : (
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center mx-auto">
              <FaTachometerAlt className="text-white text-sm" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-100 rounded-full"
          >
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </Button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {sidebarItems
          .filter((item) =>
            item.roles.some((role) => user?.roles?.includes(role))
          ) // ✅ only allowed items
          .map((item) => (
            <SidebarButton key={item.id} item={item} />
          ))}

        <div className="pt-4 border-t">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300"
            >
              <FaSignOutAlt
                className={`${sidebarOpen ? "mr-3" : ""} text-red-500`}
              />
              {sidebarOpen && <span>Back to Main</span>}
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
