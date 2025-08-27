import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PreSaleFollowUpCard, PostSaleFollowUpCard } from "./FollowUpCard";
import { PreSaleFollowUp, PostSaleFollowUp } from "@/types/followup";

interface PreSaleColumnProps {
  title: string;
  type: '1H' | '24H' | '48H' | '7DAYS';
  followUps: PreSaleFollowUp[];
  onExecuteFollowUp: (id: string) => void;
}

interface PostSaleColumnProps {
  title: string;
  type: '24H' | '14DAYS' | '30DAYS';
  followUps: PostSaleFollowUp[];
  onMarkCompleted: (id: string) => void;
}

export function PreSaleFollowUpColumn({ title, followUps, onExecuteFollowUp }: PreSaleColumnProps) {
  const overdueCount = followUps.filter(f => f.status === 'overdue').length;
  const warningCount = followUps.filter(f => f.status === 'warning').length;

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{title}</span>
          <div className="flex gap-1">
            <Badge variant="outline" className="text-xs">
              {followUps.length}
            </Badge>
            {overdueCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {overdueCount}
              </Badge>
            )}
            {warningCount > 0 && (
              <Badge className="bg-warning text-warning-foreground text-xs">
                {warningCount}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {followUps.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-8">
            Nenhum follow-up pendente
          </p>
        ) : (
          followUps.map((followUp) => (
            <PreSaleFollowUpCard
              key={followUp.id}
              followUp={followUp}
              onExecuteFollowUp={onExecuteFollowUp}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}

export function PostSaleFollowUpColumn({ title, followUps, onMarkCompleted }: PostSaleColumnProps) {
  const completedCount = followUps.filter(f => f.completed).length;
  const overdueCount = followUps.filter(f => f.status === 'overdue' && !f.completed).length;

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{title}</span>
          <div className="flex gap-1">
            <Badge variant="outline" className="text-xs">
              {followUps.length}
            </Badge>
            {completedCount > 0 && (
              <Badge className="bg-success text-success-foreground text-xs">
                {completedCount}
              </Badge>
            )}
            {overdueCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {overdueCount}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {followUps.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-8">
            Nenhum follow-up pendente
          </p>
        ) : (
          followUps.map((followUp) => (
            <PostSaleFollowUpCard
              key={followUp.id}
              followUp={followUp}
              onMarkCompleted={onMarkCompleted}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}