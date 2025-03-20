
import { Card } from "@/components/ui/card";
import { FormulaParams } from "./FormulaEditor";

interface SampleCase {
  age: number;
  drivingHistory: "clean" | "minor" | "major";
  coverageType: "basic" | "collision" | "comprehensive";
  safetyFeatures: number;
  antiTheftDevices: number;
}

interface SampleCaseCalculationProps {
  formula: FormulaParams;
  sampleCase: SampleCase;
}

export function SampleCaseCalculation({ formula, sampleCase }: SampleCaseCalculationProps) {
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

  return (
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
  );
}
