import { TrendingUp, Users, MessageCircle, Flame } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  color: 'total' | 'cold' | 'active' | 'hot';
}

const colorClasses = {
  total: 'bg-leads-total text-white',
  cold: 'bg-leads-cold text-white',
  active: 'bg-leads-active text-white', 
  hot: 'bg-leads-hot text-white'
};

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {value.toLocaleString()}
            </p>
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className={`h-1 ${colorClasses[color]}`} />
    </div>
  );
}

export function DashboardStats() {
  const stats = [
    { title: "Total Leads", value: 1247, icon: TrendingUp, color: 'total' as const },
    { title: "Leads Frios", value: 432, icon: Users, color: 'cold' as const },
    { title: "Em Conversa", value: 286, icon: MessageCircle, color: 'active' as const },
    { title: "Leads Quentes", value: 529, icon: Flame, color: 'hot' as const },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}