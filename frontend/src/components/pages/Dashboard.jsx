// src/pages/Dashboard.jsx
import React from "react";
import { AppSidebar } from "../Sidebar";


const Dashboard = () => {
  return (
    <div className="flex h-screen w-full bg-black text-white">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
       

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* This is where repo table or any page content will go */}
          <div className="rounded-2xl bg-neutral-900 p-4 shadow-md border border-neutral-800">
            <h1 className="text-xl font-semibold mb-4">Repositories</h1>
            {/* Repo Table Component will be placed here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
