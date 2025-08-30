import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Search, 
  Mail, 
  Plus, 
  ArrowUpDown, 
  Trash2, 
  Download,
  Filter
} from 'lucide-react';
import { Client, mockClients } from '@/types/client';
import { ClientDetailModal } from '@/components/crm/ClientDetailModal';
import { ClientFormModal } from '@/components/crm/ClientFormModal';
import { toast } from '@/hooks/use-toast';

const statusColors = {
  lead: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  active: 'bg-green-100 text-green-800 border-green-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200'
};

const statusLabels = {
  lead: 'Lead',
  active: 'Ativo',
  inactive: 'Inativo'
};

type FilterType = 'all' | 'lead' | 'active' | 'inactive';
type SortField = 'name' | 'email' | 'phone' | 'status' | 'lastContact';
type SortDirection = 'asc' | 'desc';

export default function ClientsManagement() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  // Modals
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const itemsPerPage = 10;

  // Filtered and sorted clients
  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
      );
    }

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(client => client.status === filter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'phone':
          aValue = a.phone;
          bValue = b.phone;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'lastContact':
          aValue = new Date(a.lastContact).getTime();
          bValue = new Date(b.lastContact).getTime();
          break;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [clients, searchTerm, filter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = filteredAndSortedClients.slice(startIndex, endIndex);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle client selection
  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    const currentClientIds = currentClients.map(client => client.id);
    const allSelected = currentClientIds.every(id => selectedClients.includes(id));
    
    if (allSelected) {
      setSelectedClients(prev => prev.filter(id => !currentClientIds.includes(id)));
    } else {
      setSelectedClients(prev => [...new Set([...prev, ...currentClientIds])]);
    }
  };

  // Handle client actions
  const handleUpdateClient = (clientId: string, updates: Partial<Client>) => {
    setClients(prev =>
      prev.map(client =>
        client.id === clientId ? { ...client, ...updates } : client
      )
    );
  };

  const handleAddClient = (newClientData: Omit<Client, 'id' | 'createdAt' | 'lastContact' | 'totalPurchases' | 'history'>) => {
    const newClient: Client = {
      ...newClientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      totalPurchases: 0,
      history: []
    };

    setClients(prev => [newClient, ...prev]);
    toast({
      title: "Cliente adicionado",
      description: `${newClient.name} foi adicionado com sucesso.`,
    });
  };

  const handleSendMessage = () => {
    if (selectedClients.length === 0) {
      toast({
        title: "Nenhum cliente selecionado",
        description: "Selecione pelo menos um cliente para enviar mensagens.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mensagens enviadas",
      description: `Mensagens enviadas para ${selectedClients.length} cliente(s).`,
    });
    setSelectedClients([]);
  };

  const handleExport = () => {
    if (selectedClients.length === 0) {
      toast({
        title: "Nenhum cliente selecionado",
        description: "Selecione pelo menos um cliente para exportar.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Exportação iniciada",
      description: `Exportando dados de ${selectedClients.length} cliente(s).`,
    });
  };

  const handleDelete = () => {
    if (selectedClients.length === 0) {
      toast({
        title: "Nenhum cliente selecionado",
        description: "Selecione pelo menos um cliente para deletar.",
        variant: "destructive"
      });
      return;
    }

    setClients(prev => prev.filter(client => !selectedClients.includes(client.id)));
    toast({
      title: "Clientes removidos",
      description: `${selectedClients.length} cliente(s) removido(s) com sucesso.`,
    });
    setSelectedClients([]);
  };

  const allCurrentSelected = currentClients.length > 0 && 
    currentClients.every(client => selectedClients.includes(client.id));
  const someCurrentSelected = currentClients.some(client => selectedClients.includes(client.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">TELA DE CLIENTES</h1>
          <p className="text-muted-foreground">
            Gerencie seus clientes e leads de forma eficiente
          </p>
        </div>
        <Button onClick={() => setIsFormModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Cliente
        </Button>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Procurar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleSendMessage}
            variant="outline"
            disabled={selectedClients.length === 0}
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Enviar Mensagem
          </Button>
          
          <Button
            onClick={handleExport}
            variant="outline"
            disabled={selectedClients.length === 0}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          
          <Button
            onClick={handleDelete}
            variant="outline"
            disabled={selectedClients.length === 0}
            className="flex items-center gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Deletar
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className="flex items-center gap-2"
        >
          <Filter className="h-3 w-3" />
          Todos ({clients.length})
        </Button>
        <Button
          variant={filter === 'lead' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('lead')}
        >
          Leads ({clients.filter(c => c.status === 'lead').length})
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Clientes Ativos ({clients.filter(c => c.status === 'active').length})
        </Button>
        <Button
          variant={filter === 'inactive' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('inactive')}
        >
          Inativos ({clients.filter(c => c.status === 'inactive').length})
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allCurrentSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 p-0 h-auto font-medium"
                >
                  Nome
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('email')}
                  className="flex items-center gap-2 p-0 h-auto font-medium"
                >
                  Email
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('phone')}
                  className="flex items-center gap-2 p-0 h-auto font-medium"
                >
                  Telefone
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 p-0 h-auto font-medium"
                >
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('lastContact')}
                  className="flex items-center gap-2 p-0 h-auto font-medium"
                >
                  Último Contato
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedClients.includes(client.id)}
                    onCheckedChange={() => handleSelectClient(client.id)}
                  />
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      setSelectedClient(client);
                      setIsDetailModalOpen(true);
                    }}
                    className="text-left hover:text-primary underline-offset-4 hover:underline font-medium"
                  >
                    {client.name}
                  </button>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {client.email}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {client.phone}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[client.status]}>
                    {statusLabels[client.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(client.lastContact).toLocaleDateString('pt-BR')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {currentClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm || filter !== 'all' 
                ? 'Nenhum cliente encontrado com os filtros aplicados.'
                : 'Nenhum cliente cadastrado ainda.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className="cursor-pointer"
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Mostrando {startIndex + 1} a {Math.min(endIndex, filteredAndSortedClients.length)} de {filteredAndSortedClients.length} clientes
        {selectedClients.length > 0 && (
          <span className="ml-4 font-medium">
            {selectedClients.length} selecionado(s)
          </span>
        )}
      </div>

      {/* Modals */}
      <ClientDetailModal
        client={selectedClient}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedClient(null);
        }}
        onUpdateClient={handleUpdateClient}
      />

      <ClientFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleAddClient}
      />
    </div>
  );
}