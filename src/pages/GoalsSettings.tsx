import { useState } from 'react';
import { Target, Calendar, TrendingUp, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CrmLayout } from '@/components/crm/CrmLayout';
import { mockGoal, Goal } from '@/types/goals';
import { useToast } from "@/hooks/use-toast";

export default function GoalsSettingsPage() {
  const [goal, setGoal] = useState<Goal>(mockGoal);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Metas atualizadas",
        description: "As metas mensais foram definidas com sucesso.",
      });
    }, 1000);
  };

  const handleInputChange = (field: keyof Goal, value: string | number) => {
    setGoal(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (field: 'periodo_inicio' | 'periodo_fim', value: string) => {
    setGoal(prev => ({
      ...prev,
      [field]: new Date(value)
    }));
  };

  return (
    <CrmLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Metas Mensais</h1>
              <p className="text-muted-foreground">
                Defina as metas de leads e conversas para o período
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Goals Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Configuração de Metas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leads_frios">Meta de Leads Frios</Label>
                <Input
                  id="leads_frios"
                  type="number"
                  value={goal.leads_frios_meta}
                  onChange={(e) => handleInputChange('leads_frios_meta', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 500"
                />
                <p className="text-sm text-muted-foreground">
                  Quantidade esperada de leads frios no período
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="leads_quentes">Meta de Leads Quentes</Label>
                <Input
                  id="leads_quentes"
                  type="number"
                  value={goal.leads_quentes_meta}
                  onChange={(e) => handleInputChange('leads_quentes_meta', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 200"
                />
                <p className="text-sm text-muted-foreground">
                  Quantidade esperada de leads quentes no período
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="conversas">Meta de Conversas</Label>
                <Input
                  id="conversas"
                  type="number"
                  value={goal.conversas_meta}
                  onChange={(e) => handleInputChange('conversas_meta', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 300"
                />
                <p className="text-sm text-muted-foreground">
                  Quantidade esperada de conversas iniciadas no período
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Period Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Período de Vigência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="periodo_inicio">Data de Início</Label>
                <Input
                  id="periodo_inicio"
                  type="date"
                  value={formatDate(goal.periodo_inicio)}
                  onChange={(e) => handleDateChange('periodo_inicio', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="periodo_fim">Data de Fim</Label>
                <Input
                  id="periodo_fim"
                  type="date"
                  value={formatDate(goal.periodo_fim)}
                  onChange={(e) => handleDateChange('periodo_fim', e.target.value)}
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Resumo do Período</h4>
                <p className="text-sm text-muted-foreground">
                  As metas serão aplicadas de {goal.periodo_inicio.toLocaleDateString('pt-BR')} 
                  até {goal.periodo_fim.toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSave} 
                  disabled={isLoading}
                  className="min-w-32 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? "Salvando..." : "Salvar Metas"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Goals Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo das Metas Atuais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-leads-cold/10 p-4 rounded-lg border border-leads-cold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">LEADS FRIOS</p>
                    <p className="text-2xl font-bold text-foreground">{goal.leads_frios_meta.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-leads-cold rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-leads-hot/10 p-4 rounded-lg border border-leads-hot/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">LEADS QUENTES</p>
                    <p className="text-2xl font-bold text-foreground">{goal.leads_quentes_meta.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-leads-hot rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-leads-active/10 p-4 rounded-lg border border-leads-active/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">CONVERSAS</p>
                    <p className="text-2xl font-bold text-foreground">{goal.conversas_meta.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-leads-active rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CrmLayout>
  );
}