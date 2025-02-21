
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Settings, Phone, Home, Menu } from "lucide-react";

export function AppSidebar() {
  const location = useLocation();
  const { toggleSidebar } = useSidebar();

  const menuItems = [
    {
      title: "Home",
      icon: Home,
      url: "/",
    },
    {
      title: "Admin",
      icon: LayoutDashboard,
      url: "/admin",
    },
    {
      title: "Contact",
      icon: Phone,
      url: "/contact",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/settings",
    },
  ];

  return (
    <>
      <Sidebar collapsible="offcanvas" className="bg-background border-r shadow-sm">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-sm px-6 py-2">Navigation</SidebarGroupLabel>
            <SidebarGroupContent className="px-3">
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title} className="py-1">
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                      tooltip={item.title}
                      className="px-4 py-3"
                    >
                      <Link to={item.url} onClick={() => toggleSidebar()}>
                        <item.icon className="h-5 w-5 mr-3" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden rounded-md p-2 bg-background border shadow-sm"
      >
        <Menu className="h-4 w-4" />
      </button>
    </>
  );
}
