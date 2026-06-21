"use client";

// import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#080c16] font-sans antialiased">
      {/* (Sidebar for MD and Up) */}
      <DashboardSidebar></DashboardSidebar>

      {/*  (Main Content Area) */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 text-white">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
