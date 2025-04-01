
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Home, 
  ListChecks, 
  FolderTree, 
  Play, 
  PieChart, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "Projects",
      path: "/projects",
      icon: FolderTree,
    },
    {
      title: "Test Cases",
      path: "/test-cases",
      icon: ListChecks,
    },
    {
      title: "Test Runs",
      path: "/test-runs",
      icon: Play,
    },
    {
      title: "Reports",
      path: "/reports",
      icon: PieChart,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    // We'd normally handle logout logic here
    navigate("/login");
  };

  return (
    <Sidebar>
      <div className="p-4">
        <Link to="/dashboard" className="flex items-center">
          <h1 className="text-xl font-bold text-white flex items-center">
            <span className="text-brand-orange">Test</span>
            <span className="text-brand-purple">Trail</span>
          </h1>
        </Link>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </Sidebar>
  );
}
