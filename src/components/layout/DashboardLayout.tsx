import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Navbar } from "./Navbar";
import { useApp } from "@/contexts/AppContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={state.user} onSignOut={() => {/* Handle sign out */}} />
      
      <SidebarProvider>
        <div className="flex min-h-screen w-full pt-16">
          <AppSidebar user={state.user} />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};