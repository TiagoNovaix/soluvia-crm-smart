import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Calendar, MessageCircle, Clock, User, Plus, DollarSign, Edit, Send, UserPlus } from 'lucide-react';
import { Client, ClientHistory } from '@/types/client';

interface ClientDetailModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateClient: (clientId: string, updates: Partial<Client>) => void;
}

const statusColors = {
  lead: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  lead: 'Lead',
  active: 'Cliente Ativo',
  inactive: 'Inativo'
};

const sourceColors = {
  WhatsApp: 'bg-green-100 text-green-800',
  Balcão: 'bg-blue-100 text-blue-800',
  Instagram: 'bg-pink-100 text-pink-800',
  Site: 'bg-purple-100 text-purple-800',
  Indicação: 'bg-orange-100 text-orange-800'
};

const historyTypeIcons = {
  call: '📞',
  message: '💬',
  visit: '🏪',
  purchase: '🛒',
  support: '🆘'
};

const historyTypeLabels = {
  call: 'Ligação',
  message: 'Mensagem',
  visit: 'Visita',
  purchase: 'Compra',
  support: 'Suporte'
};

export function ClientDetailModal({ client, isOpen, onClose, onUpdateClient }: ClientDetailModalProps) {
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  if (!client) return null;

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const newHistoryItem: ClientHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type: 'message',
      description: newNote,
      outcome: 'Anotação adicionada'
    };

    onUpdateClient(client.id, {
      history: [newHistoryItem, ...client.history],
      lastContact: new Date().toISOString()
    });

    setNewNote('');
    setAddingNote(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <User className="h-6 w-6" />
            {client.name}
            <Badge className={statusColors[client.status]}>
              {statusLabels[client.status]}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{client.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{client.email}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Último contato: {new Date(client.lastContact).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Cliente desde: {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Origem</label>
                <div className="mt-1">
                  <Badge className={sourceColors[client.source]}>
                    {client.source}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  Total em compras: R$ {client.totalPurchases.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar Cliente
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Enviar Mensagem
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Criar Follow-up
            </Button>
          </div>

          <Separator />

          {/* History Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Histórico de Interações</h3>
              <Button
                size="sm"
                onClick={() => setAddingNote(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar Nota
              </Button>
            </div>

            {/* Add new note form */}
            {addingNote && (
              <div className="bg-muted p-4 rounded-lg mb-4">
                <Textarea
                  placeholder="Digite sua anotação..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="mb-3"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddNote}>
                    Salvar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setAddingNote(false);
                      setNewNote('');
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            {/* History list */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {client.history.map((item) => (
                <div key={item.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-xl">{historyTypeIcons[item.type]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {historyTypeLabels[item.type]}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleString('pt-BR')}
                        </span>
                        {item.value && (
                          <Badge variant="outline" className="text-xs">
                            R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        Resultado: {item.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {client.history.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum histórico disponível</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}