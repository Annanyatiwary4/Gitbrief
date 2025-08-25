"use client";
import React, { useEffect, useState } from "react";
import { AppSidebar } from "../Sidebar";
import RepoTable from "../RepoTable";

const Dashboard = () => {
  const [me, setMe] = useState(null);

  useEffect(() => {
    // ping backend for logged-in user
    fetch("http://localhost:5000/api/users/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => setMe(u))
      .catch(() => {});
  }, []);


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-neutral-800">
        <AppSidebar />
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <header className="h-16 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          {me && (
            <div className="flex items-center gap-3 text-white">
              <img
                src={me.avatarUrl}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">@{me.username}</span>
              
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-neutral-950">
          <RepoTable />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
