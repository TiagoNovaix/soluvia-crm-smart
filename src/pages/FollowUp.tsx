import { useState } from 'react';
import { UserCheck, Clock, Filter, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CrmLayout } from '@/components/crm/CrmLayout';
import { PreSaleFollowUpColumn, PostSaleFollowUpColumn } from '@/components/crm/FollowUpColumn';
import { mockPreSaleFollowUps, mockPostSaleFollowUps, PreSaleFollowUp, PostSaleFollowUp } from '@/types/followup';
import { useToast } from "@/hooks/use-toast";

export default function FollowUp() {
  const [preSaleFollowUps, setPreSaleFollowUps] = useState<PreSaleFollowUp[]>(mockPreSaleFollowUps);
  const [postSaleFollowUps, setPostSaleFollowUps] = useState<PostSaleFollowUp[]>(mockPostSaleFollowUps);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  // Filter follow-ups by status
  const filteredPreSale = preSaleFollowUps.filter(followUp => 
    statusFilter === 'all' || followUp.status === statusFilter
  );

  const filteredPostSale = postSaleFollowUps.filter(followUp => 
    statusFilter === 'all' || followUp.status === statusFilter
  );

  // Group pre-sale follow-ups by type
  const preSaleByType = {
    '1H': filteredPreSale.filter(f => f.followUpType === '1H'),
    '24H': filteredPreSale.filter(f => f.followUpType === '24H'),
    '48H': filteredPreSale.filter(f => f.followUpType === '48H'),
    '7DAYS': filteredPreSale.filter(f => f.followUpType === '7DAYS'),
  };

  // Group post-sale follow-ups by type
  const postSaleByType = {
    '24H': filteredPostSale.filter(f => f.followUpType === '24H'),
    '14DAYS': filteredPostSale.filter(f => f.followUpType === '14DAYS'),
    '30DAYS': filteredPostSale.filter(f => f.followUpType === '30DAYS'),
  };

  // Handle execute follow-up
  const handleExecuteFollowUp = (id: string) => {
    setPreSaleFollowUps(prev => prev.filter(f => f.id !== id));
    toast({
      title: "Follow-up executado",
      description: "O follow-up foi executado com sucesso.",
    });
  };

  // Handle mark as completed
  const handleMarkCompleted = (id: string) => {
    setPostSaleFollowUps(prev => prev.map(f => 
      f.id === id ? { ...f, completed: true, status: 'ok' as const } : f
    ));
    toast({
      title: "Follow-up concluído",
      description: "O follow-up foi marcado como realizado.",
    });
  };

  // Count totals and overdue
  const totalPreSale = preSaleFollowUps.length;
  const overduePreSale = preSaleFollowUps.filter(f => f.status === 'overdue').length;
  const totalPostSale = postSaleFollowUps.length;
  const overduePostSale = postSaleFollowUps.filter(f => f.status === 'overdue' && !f.completed).length;

  return (
    <CrmLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCheck className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Follow-up</h1>
              <p className="text-muted-foreground">
                Gerencie follow-ups de pré-venda e pós-venda
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(overduePreSale > 0 || overduePostSale > 0) && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <Bell className="h-3 w-3" />
                {overduePreSale + overduePostSale} vencidos
              </Badge>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="ok">OK</SelectItem>
                <SelectItem value="warning">Próximo</SelectItem>
                <SelectItem value="overdue">Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs for Pre-sale and Post-sale */}
        <Tabs defaultValue="pre-sale" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pre-sale" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pré-venda ({totalPreSale})
            </TabsTrigger>
            <TabsTrigger value="post-sale" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Pós-venda ({totalPostSale})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pre-sale" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <PreSaleFollowUpColumn
                title="1 Hora"
                type="1H"
                followUps={preSaleByType['1H']}
                onExecuteFollowUp={handleExecuteFollowUp}
              />
              <PreSaleFollowUpColumn
                title="24 Horas"
                type="24H"
                followUps={preSaleByType['24H']}
                onExecuteFollowUp={handleExecuteFollowUp}
              />
              <PreSaleFollowUpColumn
                title="48 Horas"
                type="48H"
                followUps={preSaleByType['48H']}
                onExecuteFollowUp={handleExecuteFollowUp}
              />
              <PreSaleFollowUpColumn
                title="7 Dias"
                type="7DAYS"
                followUps={preSaleByType['7DAYS']}
                onExecuteFollowUp={handleExecuteFollowUp}
              />
            </div>
          </TabsContent>

          <TabsContent value="post-sale" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <PostSaleFollowUpColumn
                title="24 Horas"
                type="24H"
                followUps={postSaleByType['24H']}
                onMarkCompleted={handleMarkCompleted}
              />
              <PostSaleFollowUpColumn
                title="14 Dias"
                type="14DAYS"
                followUps={postSaleByType['14DAYS']}
                onMarkCompleted={handleMarkCompleted}
              />
              <PostSaleFollowUpColumn
                title="30 Dias"
                type="30DAYS"
                followUps={postSaleByType['30DAYS']}
                onMarkCompleted={handleMarkCompleted}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CrmLayout>
  );
}