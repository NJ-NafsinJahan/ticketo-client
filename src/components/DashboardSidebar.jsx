"use client";

import Logo from "@/components/Logo";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const handleLogout = () => {};

  //   Organizer Menu
  const organizerMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaUsers,
      href: "/dashboard/organizer",
    },
    {
      key: "organization",
      label: "Organization",
      icon: FaBuilding,
      href: "/dashboard/organization",
    },
    {
      key: "add-event",
      label: "Add Event",
      icon: FaPlus,
      href: "/dashboard/add-event",
    },
    {
      key: "manage-events",
      label: "Manage Events",
      icon: FaCalendarAlt,
      href: "/dashboard/manage-events",
    },
    {
      key: "attendees",
      label: "Attendees",
      icon: FaUsers,
      href: "/dashboard/attendees",
    },
  ];

  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-slate-950/40 backdrop-blur-xl border-r border-white/5 h-screen sticky top-0">
      {/* logo */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center min-h-18.25">
        <Logo />
      </div>

      {/* user profile */}
      <div className="px-6 py-5 border-b border-white/5 bg-slate-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0 shadow-lg shadow-pink-500/10">
            <Image
              width={40}
              height={40}
              src={
                session?.user?.image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || "Jane Doe")}&background=7c3aed&color=fff&bold=true`
              }
              alt="Avatar"
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-bold truncate leading-tight">
              {session?.user?.name || "Jane Doe"}
            </p>
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wider inline-block mt-0.5 ${
                role === "admin"
                  ? "text-amber-400"
                  : role === "organizer"
                    ? "text-indigo-400"
                    : "text-pink-400"
              }`}
            >
              {role || "Attendee"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="grow overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-3 pb-2">
          Navigation
        </p>

        {/* Organizer's menu mapping */}
        {organizerMenu.map(({ key, label, icon: Icon, href }) => {
          return (
            <Link
              key={key}
              href={href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer text-slate-400 hover:text-white hover:bg-white/5`}
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors  bg-white/5 text-slate-400`}
              >
                <Icon size={14} />
              </span>
              <span>{label}</span>
              {/* {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-400" />
                )} */}
            </Link>
          );
        })}
      </nav>

      {/*Button*/}
      <div className="p-4 border-t border-white/5 bg-slate-950/20 space-y-1">
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 group"
        >
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-pink-500/10 group-hover:text-pink-400 transition-colors">
            <FaHome size={14} />
          </span>
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 cursor-pointer group"
        >
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-red-500/10 group-hover:text-red-400 transition-colors">
            <FaSignOutAlt size={14} />
          </span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
