
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, FileText, TrendingUp, Calendar } from "lucide-react";

// Sample data - In a real application, this would come from your backend
const quoteStats = {
  daily: 45,
  weekly: 284,
  monthly: 1247,
  signups: 892
};

const chartData = [
  { name: "Mon", quotes: 42 },
  { name: "Tue", quotes: 38 },
  { name: "Wed", quotes: 45 },
  { name: "Thu", quotes: 39 },
  { name: "Fri", quotes: 48 },
  { name: "Sat", quotes: 35 },
  { name: "Sun", quotes: 37 },
];

export default function Admin() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 gradient-text">Admin Dashboard</h1>
      
      {/* Stats Grid */}
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

      {/* Weekly Quotes Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Quote Requests</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quotes" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
