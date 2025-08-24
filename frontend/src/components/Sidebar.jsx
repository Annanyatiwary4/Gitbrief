import { Calendar, GithubIcon, Home, Inbox, KeyIcon, PowerOffIcon, Settings } from "lucide-react";

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
  await fetch("http://localhost:5000/api/users/logout", {
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
    title: "History",
    url: "#",
    icon: Inbox,
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
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <SidebarProvider >
      <Sidebar >
        <SidebarContent className="bg-black">
          <SidebarGroup >
            <SidebarGroupLabel className="text-blue-100 font-semibold text-2xl mt-4 mb-2 px-4">
             Gitbrief
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.action ? (
                      // if item has `action`, render as button
                      <SidebarMenuButton
                        onClick={item.action}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-200 cursor-pointer text-white w-full text-left"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    ) : (
                      // else normal link
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
      </Sidebar>
    </SidebarProvider>
  );
}
export default AppSidebar;