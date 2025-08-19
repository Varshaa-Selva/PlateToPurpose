import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import DonorDashboard from "./pages/DonorDashboard";
import NGODashboard from "./pages/NGODashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Impact from "./pages/Impact";
import Partners from "./pages/Partners";
import FoodRequests from "./pages/FoodRequests";
import VolunteerTasks from "./pages/VolunteerTasks";
import MyDonations from "./pages/MyDonations";
import RouteMaps from "./pages/RouteMaps";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { AppProvider } from "./contexts/AppContext";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <div>
                  <Navbar />
                  <Landing />
                  <Footer />
                </div>
              } />
              <Route path="/auth" element={<Auth />} />
              
              {/* Dashboard Routes */}
              <Route path="/donor-dashboard" element={
                <DashboardLayout><DonorDashboard /></DashboardLayout>
              } />
              <Route path="/ngo-dashboard" element={
                <DashboardLayout><NGODashboard /></DashboardLayout>
              } />
              <Route path="/volunteer-dashboard" element={
                <DashboardLayout><VolunteerDashboard /></DashboardLayout>
              } />
              <Route path="/analytics" element={
                <DashboardLayout><Analytics /></DashboardLayout>
              } />
              <Route path="/settings" element={
                <DashboardLayout><Settings /></DashboardLayout>
              } />
              <Route path="/impact" element={
                <DashboardLayout><Impact /></DashboardLayout>
              } />
              <Route path="/partners" element={
                <DashboardLayout><Partners /></DashboardLayout>
              } />
              <Route path="/food-requests" element={
                <DashboardLayout><FoodRequests /></DashboardLayout>
              } />
              <Route path="/volunteer-tasks" element={
                <DashboardLayout><VolunteerTasks /></DashboardLayout>
              } />
              <Route path="/my-donations" element={
                <DashboardLayout><MyDonations /></DashboardLayout>
              } />
              <Route path="/route-maps" element={
                <DashboardLayout><RouteMaps /></DashboardLayout>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
