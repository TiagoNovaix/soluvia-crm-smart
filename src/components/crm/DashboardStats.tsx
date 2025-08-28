import { TrendingUp, Users, MessageCircle, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { mockGoal } from "@/types/goals";

interface StatCardProps {
  title: string;
  value: number;
  goal?: number;
  icon: React.ComponentType<any>;
  color: 'total' | 'cold' | 'active' | 'hot';
}

const colorClasses = {
  total: 'bg-leads-total text-white',
  cold: 'bg-leads-cold text-white',
  active: 'bg-leads-active text-white', 
  hot: 'bg-leads-hot text-white'
};

function StatCard({ title, value, goal, icon: Icon, color }: StatCardProps) {
  const percentage = goal ? Math.round((value / goal) * 100) : 0;
  const progressColor = percentage >= 90 ? 'bg-success' : percentage >= 70 ? 'bg-warning' : 'bg-destructive';
  
  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-3xl font-bold text-foreground">
                {value.toLocaleString()}
              </p>
              {goal && (
                <p className="text-sm text-muted-foreground">
                  /{goal.toLocaleString()}
                </p>
              )}
            </div>
            
            {goal && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className={`font-medium ${
                    percentage >= 90 ? 'text-success' : 
                    percentage >= 70 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {percentage}%
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-2"
                />
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]} ml-4`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className={`h-1 ${colorClasses[color]}`} />
    </div>
  );
}

export function DashboardStats() {
  const currentGoals = mockGoal;
  
  const stats = [
    { title: "Total Leads", value: 1247, icon: TrendingUp, color: 'total' as const },
    { title: "Leads Frios", value: 432, goal: currentGoals.leads_frios_meta, icon: Users, color: 'cold' as const },
    { title: "Em Conversa", value: 286, goal: currentGoals.conversas_meta, icon: MessageCircle, color: 'active' as const },
    { title: "Leads Quentes", value: 529, goal: currentGoals.leads_quentes_meta, icon: Flame, color: 'hot' as const },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          goal={stat.goal}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}