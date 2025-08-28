import { useDrop } from 'react-dnd';
import { Lead } from '@/types/leads';
import { LeadCard } from './LeadCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  title: string;
  status: 'cold' | 'talking' | 'hot' | 'closed';
  leads: Lead[];
  onDropLead: (leadId: string, newStatus: 'cold' | 'talking' | 'hot' | 'closed') => void;
  onLeadClick: (lead: Lead) => void;
  color: string;
}

const statusLabels = {
  cold: 'Frio',
  talking: 'Em Conversa', 
  hot: 'Quente',
  closed: 'Fechados'
};

const headerColors = {
  cold: 'bg-purple-500 text-white',
  talking: 'bg-green-500 text-white',
  hot: 'bg-orange-500 text-white',
  closed: 'bg-leads-closed text-white'
};

export function KanbanColumn({ 
  title, 
  status, 
  leads, 
  onDropLead, 
  onLeadClick,
  color 
}: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'lead',
    drop: (item: { id: string; status: string }) => {
      if (item.status !== status) {
        onDropLead(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={cn(
        "p-4 rounded-t-lg font-semibold text-center",
        headerColors[status]
      )}>
        <h2 className="text-lg">{statusLabels[status]}</h2>
        <span className="text-sm opacity-90">({leads.length})</span>
      </div>

      {/* Drop Zone */}
      <div
        ref={drop}
        className={cn(
          "flex-1 p-4 bg-muted/30 rounded-b-lg border-2 border-dashed border-muted-foreground/20 min-h-96 transition-colors",
          isOver && "border-primary bg-primary/5"
        )}
      >
        <div className="space-y-3">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={() => onLeadClick(lead)}
            />
          ))}
          
          {leads.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <p className="text-sm">Nenhum lead nesta coluna</p>
              <p className="text-xs mt-1">Arraste leads aqui</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}