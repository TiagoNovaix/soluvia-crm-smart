import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Search, Filter, Plus, Users } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CrmLayout } from '@/components/crm/CrmLayout';
import { KanbanColumn } from '@/components/crm/KanbanColumn';
import { LeadDetailModal } from '@/components/crm/LeadDetailModal';
import { SaleModal } from '@/components/crm/SaleModal';
import { mockLeads, Lead } from '@/types/leads';
import { useToast } from "@/hooks/use-toast";

export default function LeadsKanban() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [leadToClose, setLeadToClose] = useState<Lead | null>(null);
  const { toast } = useToast();

  // Filter leads based on search and source filter
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  // Group leads by status
  const leadsByStatus = {
    cold: filteredLeads.filter(lead => lead.status === 'cold'),
    talking: filteredLeads.filter(lead => lead.status === 'talking'),
    hot: filteredLeads.filter(lead => lead.status === 'hot'),
    closed: filteredLeads.filter(lead => lead.status === 'closed'),
  };

  // Handle drag and drop
  const handleDropLead = (leadId: string, newStatus: 'cold' | 'talking' | 'hot' | 'closed') => {
    if (newStatus === 'closed') {
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
        setLeadToClose(lead);
        setSaleModalOpen(true);
        return;
      }
    }
    
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  // Handle lead click
  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  // Handle lead update
  const handleUpdateLead = (leadId: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, ...updates } : lead
    ));
    
    // Update selected lead if it's the one being updated
    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  // Handle sale confirmation
  const handleConfirmSale = (saleData: {
    produto: string;
    valor: number;
    vendedor: string;
    observacoes?: string;
  }) => {
    if (!leadToClose) return;

    const updatedLead: Lead = {
      ...leadToClose,
      status: 'closed',
      saleInfo: {
        ...saleData,
        dataFechamento: new Date()
      }
    };

    setLeads(prev => prev.map(lead => 
      lead.id === leadToClose.id ? updatedLead : lead
    ));

    setSaleModalOpen(false);
    setLeadToClose(null);
    
    toast({
      title: "Venda registrada!",
      description: `${saleData.produto} vendido para ${leadToClose.name} por R$ ${saleData.valor.toFixed(2)}`,
    });
  };

  const totalLeads = filteredLeads.length;

  return (
    <CrmLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Leads Kanban</h1>
              <p className="text-muted-foreground">
                Gerencie seus leads através do funil de vendas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {totalLeads} leads
            </Badge>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Lead
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrar origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas origens</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Balcão">Balcão</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Kanban Board */}
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px] w-full">
            <KanbanColumn
              title="Frio"
              status="cold"
              leads={leadsByStatus.cold}
              onDropLead={handleDropLead}
              onLeadClick={handleLeadClick}
              color="purple"
            />
            <KanbanColumn
              title="Em Conversa"
              status="talking"
              leads={leadsByStatus.talking}
              onDropLead={handleDropLead}
              onLeadClick={handleLeadClick}
              color="green"
            />
            <KanbanColumn
              title="Quente"
              status="hot"
              leads={leadsByStatus.hot}
              onDropLead={handleDropLead}
              onLeadClick={handleLeadClick}
              color="orange"
            />
            <KanbanColumn
              title="Fechados"
              status="closed"
              leads={leadsByStatus.closed}
              onDropLead={handleDropLead}
              onLeadClick={handleLeadClick}
              color="green"
            />
          </div>
        </DndProvider>

        {/* Lead Detail Modal */}
        <LeadDetailModal
          lead={selectedLead}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedLead(null);
          }}
          onUpdateLead={handleUpdateLead}
        />

        {/* Sale Registration Modal */}
        {leadToClose && (
          <SaleModal
            isOpen={saleModalOpen}
            onClose={() => setSaleModalOpen(false)}
            lead={leadToClose}
            onConfirmSale={handleConfirmSale}
          />
        )}
      </div>
    </CrmLayout>
  );
}