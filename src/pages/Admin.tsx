import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, FileText, TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";

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

const defaultFormula = {
  basePrice: 1000,
  youngDriverMultiplier: 1.5,
  seniorDriverMultiplier: 1.3,
  minorIncidentMultiplier: 1.2,
  majorIncidentMultiplier: 1.5,
  comprehensiveMultiplier: 1.4,
  collisionMultiplier: 1.2,
  safetyFeatureDiscount: 0.05,
  antiTheftDiscount: 0.05,
};

const sampleCase = {
  age: 23,
  drivingHistory: "minor",
  coverageType: "comprehensive",
  safetyFeatures: 2,
  antiTheftDevices: 1,
};

export default function Admin() {
  const [formula, setFormula] = useState(defaultFormula);
  const [isEditing, setIsEditing] = useState(false);

  const handleFormulaChange = (key: keyof typeof defaultFormula, value: string) => {
    setFormula(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const calculateSampleCase = () => {
    let price = formula.basePrice;
    
    if (sampleCase.age < 25) {
      price *= formula.youngDriverMultiplier;
    }
    
    if (sampleCase.drivingHistory === "minor") {
      price *= formula.minorIncidentMultiplier;
    }
    
    if (sampleCase.coverageType === "comprehensive") {
      price *= formula.comprehensiveMultiplier;
    }
    
    price *= (1 - (sampleCase.safetyFeatures * formula.safetyFeatureDiscount));
    
    price *= (1 - (sampleCase.antiTheftDevices * formula.antiTheftDiscount));
    
    return price.toFixed(2);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('New formula parameters:', formula);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 gradient-text">Admin Dashboard</h1>
      
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

      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Insurance Formula Parameters</h3>
          <Button 
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? "Save Changes" : "Edit Formula"}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(formula).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
              <Input
                id={key}
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => handleFormulaChange(key as keyof typeof defaultFormula, e.target.value)}
                disabled={!isEditing}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Sample Case Calculation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Input Parameters:</h4>
            <ul className="space-y-2 text-sm">
              <li>• Driver Age: {sampleCase.age} (Young Driver)</li>
              <li>• Driving History: Minor Incidents</li>
              <li>• Coverage Type: Comprehensive</li>
              <li>• Safety Features: {sampleCase.safetyFeatures} (airbags, anti-lock brakes)</li>
              <li>• Anti-theft Devices: {sampleCase.antiTheftDevices} (alarm system)</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Calculation Result:</h4>
            <div className="text-3xl font-bold text-primary">${calculateSampleCase()}</div>
            <p className="text-sm text-muted-foreground">
              This premium is calculated using the current formula parameters above.
              Adjust the parameters to see how they affect the final premium.
            </p>
          </div>
        </div>
      </Card>

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
