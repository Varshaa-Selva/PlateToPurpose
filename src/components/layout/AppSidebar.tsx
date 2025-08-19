import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  Users, 
  MapPin, 
  BarChart3, 
  Settings, 
  HandHeart,
  Building,
  List
} from "lucide-react";
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

interface AppSidebarProps {
  user?: {
    name: string;
    role: 'donor' | 'ngo' | 'volunteer';
  } | null;
}

export const AppSidebar = ({ user }: AppSidebarProps) => {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const getDashboardItems = () => {
    if (!user) return [];

    const baseItems = [
      { 
        title: "Dashboard", 
        url: `/${user.role}-dashboard`, 
        icon: LayoutDashboard 
      },
      { 
        title: "Analytics", 
        url: "/analytics", 
        icon: BarChart3 
      },
    ];

    switch (user.role) {
      case 'donor':
        return [
          ...baseItems,
          { title: "My Donations", url: "/my-donations", icon: Package },
          { title: "Impact Report", url: "/impact", icon: Heart },
        ];
      case 'ngo':
        return [
          ...baseItems,
          { title: "Food Requests", url: "/food-requests", icon: List },
          { title: "Partner NGOs", url: "/partners", icon: Building },
        ];
      case 'volunteer':
        return [
          ...baseItems,
          { title: "My Tasks", url: "/volunteer-tasks", icon: HandHeart },
          { title: "Route Map", url: "/route-map", icon: MapPin },
        ];
      default:
        return baseItems;
    }
  };

  const dashboardItems = getDashboardItems();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"}>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        isActive 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/settings" className="hover:bg-sidebar-accent/50">
                    <Settings className="mr-2 h-4 w-4" />
                    {!isCollapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};