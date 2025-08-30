import {  GithubIcon, Home, Menu, PowerOffIcon } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

// Logout users
const handleLogout = async () => {
  await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/";
};

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Your Repositories",
    url: "#",
    icon: GithubIcon,
  },
  {
    title: "Logout",
    icon: PowerOffIcon,
    action: handleLogout, // <-- custom action
  },
 
];

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider>
      {/* Hamburger for small screens */}
      <div className="md:hidden p-4">
        <button
          className="flex flex-col justify-between w-8 h-6 focus:outline-none cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-1 w-full bg-blue-500 transition-transform ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-blue-500 transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-1 w-full bg-blue-500 transition-transform ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black transition-transform md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"} md:block`}
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-blue-100 font-semibold text-2xl mt-4 mb-2 px-4">
              Gitbrief
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.action ? (
                      <SidebarMenuButton
                        onClick={item.action}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-200 cursor-pointer text-white w-full text-left"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 text-white"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </SidebarProvider>
  );
}

export default AppSidebar;