
import { Card } from "@/components/ui/card";
import { Users, FileText, TrendingUp, Calendar } from "lucide-react";

interface StatsGridProps {
  quoteStats: {
    daily: number;
    weekly: number;
    monthly: number;
    signups: number;
  };
}

export function StatsGrid({ quoteStats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-white/50 backdrop-blur border-t border-white/50 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Daily Quotes</p>
            <h3 className="text-2xl font-bold text-blue-600">{quoteStats.daily}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/50 backdrop-blur border-t border-white/50 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Weekly Quotes</p>
            <h3 className="text-2xl font-bold text-indigo-600">{quoteStats.weekly}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/50 backdrop-blur border-t border-white/50 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Monthly Quotes</p>
            <h3 className="text-2xl font-bold text-purple-600">{quoteStats.monthly}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/50 backdrop-blur border-t border-white/50 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Signups</p>
            <h3 className="text-2xl font-bold text-green-600">{quoteStats.signups}</h3>
          </div>
        </div>
      </Card>
    </div>
  );
}
