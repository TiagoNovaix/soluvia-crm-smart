import { useDrag } from 'react-dnd';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { Lead } from '@/types/leads';
import { cn } from '@/lib/utils';

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

const sourceColors = {
  WhatsApp: 'bg-green-100 text-green-800 border-green-200',
  Balcão: 'bg-blue-100 text-blue-800 border-blue-200',
  Instagram: 'bg-pink-100 text-pink-800 border-pink-200'
};

const sourceIcons = {
  WhatsApp: '📱',
  Balcão: '🏪', 
  Instagram: '📸'
};

export function LeadCard({ lead, onClick }: LeadCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'lead',
    item: { id: lead.id, status: lead.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={onClick}
      className={cn(
        "bg-card rounded-lg border border-border p-4 cursor-pointer transition-all duration-200 hover:shadow-card",
        isDragging && "opacity-50 rotate-2 scale-95"
      )}
    >
      {/* Header with name and source tag */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-foreground text-sm truncate flex-1 mr-2">
          {lead.name}
        </h3>
        <span className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
          sourceColors[lead.source]
        )}>
          <span>{sourceIcons[lead.source]}</span>
          {lead.source}
        </span>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Phone className="h-3 w-3" />
        <span>{lead.phone}</span>
      </div>

      {/* Last contact */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Calendar className="h-3 w-3" />
        <span>{new Date(lead.lastContact).toLocaleString('pt-BR')}</span>
      </div>

      {/* Contact reason */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <MessageCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
        <span className="line-clamp-2">{lead.contactReason}</span>
      </div>
    </div>
  );
}