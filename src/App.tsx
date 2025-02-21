
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import MyAccount from "./pages/MyAccount";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SidebarProvider defaultOpen={false}>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <main className="flex-1 md:ml-[20rem]">
                <div className="container px-4 pt-16 md:pt-4">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/my-account" element={<MyAccount />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </main>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
