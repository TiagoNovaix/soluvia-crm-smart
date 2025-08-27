import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Calendar, MessageCircle, Clock, User, Plus } from 'lucide-react';
import { Lead, ContactHistory } from '@/types/leads';

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLead: (leadId: string, updates: Partial<Lead>) => void;
}

const sourceColors = {
  WhatsApp: 'bg-green-100 text-green-800',
  Balcão: 'bg-blue-100 text-blue-800',
  Instagram: 'bg-pink-100 text-pink-800'
};

const historyTypeIcons = {
  call: '📞',
  message: '💬',
  visit: '🏪'
};

const historyTypeLabels = {
  call: 'Ligação',
  message: 'Mensagem',
  visit: 'Visita'
};

export function LeadDetailModal({ lead, isOpen, onClose, onUpdateLead }: LeadDetailModalProps) {
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  if (!lead) return null;

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const newHistoryItem: ContactHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type: 'message',
      description: newNote,
      outcome: 'Anotação adicionada'
    };

    onUpdateLead(lead.id, {
      history: [newHistoryItem, ...lead.history],
      lastContact: new Date().toISOString()
    });

    setNewNote('');
    setAddingNote(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <User className="h-5 w-5" />
            {lead.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Último contato: {new Date(lead.lastContact).toLocaleString('pt-BR')}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Criado em: {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Origem</label>
                <div className="mt-1">
                  <Badge className={sourceColors[lead.source]}>
                    {lead.source}
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Motivo do contato</label>
                <p className="text-sm mt-1">{lead.contactReason}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* History Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Histórico de Contatos</h3>
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
            <div className="space-y-3">
              {lead.history.map((item) => (
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
              
              {lead.history.length === 0 && (
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