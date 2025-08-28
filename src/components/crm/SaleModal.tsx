import { useState } from 'react';
import { Check, DollarSign, User, Package, Calendar, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lead } from '@/types/leads';

interface SaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead;
  onConfirmSale: (saleData: {
    produto: string;
    valor: number;
    vendedor: string;
    observacoes?: string;
  }) => void;
}

const produtos = [
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15',
  'iPhone 14',
  'Samsung Galaxy S24',
  'Samsung Galaxy S23',
  'Capinha Premium',
  'Película de Vidro',
  'Carregador Original',
  'Fone de Ouvido',
  'Outros'
];

const vendedores = [
  'Carlos Silva',
  'Maria Santos',
  'João Oliveira',
  'Ana Costa',
  'Pedro Souza'
];

export function SaleModal({ isOpen, onClose, lead, onConfirmSale }: SaleModalProps) {
  const [formData, setFormData] = useState({
    produto: '',
    valor: '',
    vendedor: '',
    observacoes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.produto || !formData.valor || !formData.vendedor) {
      return;
    }

    onConfirmSale({
      produto: formData.produto,
      valor: parseFloat(formData.valor),
      vendedor: formData.vendedor,
      observacoes: formData.observacoes || undefined
    });

    // Reset form
    setFormData({
      produto: '',
      valor: '',
      vendedor: '',
      observacoes: ''
    });
  };

  const handleClose = () => {
    onClose();
    // Reset form when closing
    setFormData({
      produto: '',
      valor: '',
      vendedor: '',
      observacoes: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-success" />
            Registrar Venda
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Customer Info */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Cliente</p>
            <p className="font-medium text-foreground">{lead.name}</p>
            <p className="text-sm text-muted-foreground">{lead.phone}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product */}
            <div className="space-y-2">
              <Label htmlFor="produto" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Produto Vendido
              </Label>
              <Select 
                value={formData.produto} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, produto: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  {produtos.map((produto) => (
                    <SelectItem key={produto} value={produto}>
                      {produto}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Value */}
            <div className="space-y-2">
              <Label htmlFor="valor" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Valor da Venda
              </Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                value={formData.valor}
                onChange={(e) => setFormData(prev => ({ ...prev, valor: e.target.value }))}
                placeholder="R$ 0,00"
                required
              />
            </div>

            {/* Salesperson */}
            <div className="space-y-2">
              <Label htmlFor="vendedor" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Vendedor Responsável
              </Label>
              <Select 
                value={formData.vendedor} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, vendedor: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {vendedores.map((vendedor) => (
                    <SelectItem key={vendedor} value={vendedor}>
                      {vendedor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="observacoes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Observações (opcional)
              </Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Informações adicionais sobre a venda..."
                className="min-h-20"
              />
            </div>

            {/* Date Info */}
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Data do fechamento: {new Date().toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                disabled={!formData.produto || !formData.valor || !formData.vendedor}
              >
                Confirmar Venda
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}