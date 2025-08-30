
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { CrmLayout } from "@/components/crm/CrmLayout";
import Index from "./pages/Index";
import FollowUp from "./pages/FollowUp";
import LeadsKanban from "./pages/LeadsKanban";
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
    <Router>
      <CrmLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clientes" element={<ClientsManagement />} />
          <Route path="/follow-up" element={<FollowUp />} />
          <Route path="/ia-leads" element={<LeadsKanban />} />
          <Route path="/configuracoes/empresa" element={<CompanySettings />} />
          <Route path="/configuracoes/metas" element={<GoalsSettings />} />
          <Route path="/whatsapp-business" element={<WhatsAppBusiness />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CrmLayout>
    </Router>
    <Toaster />
  </QueryClientProvider>
);

export default App;
