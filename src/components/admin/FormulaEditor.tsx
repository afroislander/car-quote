
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface FormulaParams {
  basePrice: number;
  youngDriverMultiplier: number;
  seniorDriverMultiplier: number;
  minorIncidentMultiplier: number;
  majorIncidentMultiplier: number;
  comprehensiveMultiplier: number;
  collisionMultiplier: number;
  safetyFeatureDiscount: number;
  antiTheftDiscount: number;
}

interface FormulaEditorProps {
  initialFormula: FormulaParams;
  onSave: (formula: FormulaParams) => void;
}

export function FormulaEditor({ initialFormula, onSave }: FormulaEditorProps) {
  const [formula, setFormula] = useState(initialFormula);
  const [isEditing, setIsEditing] = useState(false);

  const handleFormulaChange = (key: keyof FormulaParams, value: string) => {
    setFormula(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(formula);
  };

  return (
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
              onChange={(e) => handleFormulaChange(key as keyof FormulaParams, e.target.value)}
              disabled={!isEditing}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
