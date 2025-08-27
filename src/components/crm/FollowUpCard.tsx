import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Clock, CheckCircle } from "lucide-react";
import { PreSaleFollowUp, PostSaleFollowUp } from "@/types/followup";
import { cn } from "@/lib/utils";

interface PreSaleFollowUpCardProps {
  followUp: PreSaleFollowUp;
  onExecuteFollowUp: (id: string) => void;
}

interface PostSaleFollowUpCardProps {
  followUp: PostSaleFollowUp;
  onMarkCompleted: (id: string) => void;
}

export function PreSaleFollowUpCard({ followUp, onExecuteFollowUp }: PreSaleFollowUpCardProps) {
  const statusColors = {
    ok: "bg-success/10 border-success text-success-foreground",
    warning: "bg-warning/10 border-warning text-warning-foreground", 
    overdue: "bg-destructive/10 border-destructive text-destructive-foreground"
  };

  return (
    <Card className={cn("border-l-4", statusColors[followUp.status])}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-foreground">{followUp.clientName}</h4>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Phone className="h-3 w-3" />
              {followUp.phone}
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn("text-xs", {
              "border-success text-success": followUp.status === 'ok',
              "border-warning text-warning": followUp.status === 'warning',
              "border-destructive text-destructive": followUp.status === 'overdue'
            })}
          >
            {followUp.followUpType}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {followUp.originalReason}
        </p>
        
        <div className="flex items-center gap-1 text-sm">
          <Clock className="h-3 w-3" />
          <span className={cn({
            "text-success": followUp.status === 'ok',
            "text-warning": followUp.status === 'warning', 
            "text-destructive": followUp.status === 'overdue'
          })}>
            {followUp.timeRemaining}
          </span>
        </div>
        
        <Button 
          size="sm" 
          className="w-full"
          onClick={() => onExecuteFollowUp(followUp.id)}
        >
          Executar Follow-up
        </Button>
      </CardContent>
    </Card>
  );
}

export function PostSaleFollowUpCard({ followUp, onMarkCompleted }: PostSaleFollowUpCardProps) {
  const statusColors = {
    ok: "bg-success/10 border-success",
    warning: "bg-warning/10 border-warning",
    overdue: "bg-destructive/10 border-destructive"
  };

  return (
    <Card className={cn("border-l-4", statusColors[followUp.status], {
      "opacity-60": followUp.completed
    })}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              {followUp.clientName}
              {followUp.completed && <CheckCircle className="h-4 w-4 text-success" />}
            </h4>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Phone className="h-3 w-3" />
              {followUp.phone}
            </div>
          </div>
          <Badge 
            variant="outline"
            className={cn("text-xs", {
              "border-success text-success": followUp.status === 'ok',
              "border-warning text-warning": followUp.status === 'warning',
              "border-destructive text-destructive": followUp.status === 'overdue'
            })}
          >
            {followUp.followUpType}
          </Badge>
        </div>
        
        <div>
          <p className="text-sm font-medium text-foreground">
            {followUp.productPurchased}
          </p>
          <p className="text-xs text-muted-foreground">
            Compra: {new Date(followUp.purchaseDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
        
        {!followUp.completed && (
          <Button 
            size="sm" 
            variant="outline"
            className="w-full"
            onClick={() => onMarkCompleted(followUp.id)}
          >
            Marcar como Realizado
          </Button>
        )}
      </CardContent>
    </Card>
  );
}