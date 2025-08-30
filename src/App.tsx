import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LeadsKanban from "./pages/LeadsKanban";
import FollowUp from "./pages/FollowUp";
import CompanySettings from "./pages/CompanySettings";
import GoalsSettings from "./pages/GoalsSettings";
import WhatsAppBusiness from "./pages/WhatsAppBusiness";
import ClientsManagement from "./pages/ClientsManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clientes" element={<ClientsManagement />} />
          <Route path="/follow-up" element={<FollowUp />} />
          <Route path="/ia-leads" element={<LeadsKanban />} />
          <Route path="/configuracoes/empresa" element={<CompanySettings />} />
          <Route path="/configuracoes/metas" element={<GoalsSettings />} />
          <Route path="/whatsapp-business" element={<WhatsAppBusiness />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
