import { CrmLayout } from "@/components/crm/CrmLayout";
import { DashboardStats } from "@/components/crm/DashboardStats";
import { ProductsSection } from "@/components/crm/ProductsSection";

const Index = () => {
  return (
    <CrmLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Visão geral do seu CRM
            </p>
          </div>
        </div>

        {/* Stats cards */}
        <DashboardStats />

        {/* Products section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <ProductsSection />
          </div>
          
          {/* Recent Activity - 40% width */}
          <div className="lg:col-span-2 bg-card rounded-xl shadow-card border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Atividade Recente
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-leads-active rounded-full" />
                <p className="text-sm text-foreground">
                  Lead João Silva em conversa sobre iPhone 15
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-leads-hot rounded-full" />
                <p className="text-sm text-foreground">
                  Maria Santos - lead quente identificado
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-leads-total rounded-full" />
                <p className="text-sm text-foreground">
                  Novo lead cadastrado - Pedro Costa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CrmLayout>
  );
};

export default Index;
