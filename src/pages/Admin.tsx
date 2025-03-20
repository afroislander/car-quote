
import { useState } from "react";
import { StatsGrid } from "@/components/admin/StatsGrid";
import { QuotesChart } from "@/components/admin/QuotesChart";
import { FormulaEditor, FormulaParams } from "@/components/admin/FormulaEditor";
import { SampleCaseCalculation } from "@/components/admin/SampleCaseCalculation";
import { 
  defaultFormula, 
  sampleCase, 
  quoteStats, 
  chartData 
} from "@/components/admin/constants";

export default function Admin() {
  const [formula, setFormula] = useState<FormulaParams>(defaultFormula);

  const handleSaveFormula = (newFormula: FormulaParams) => {
    setFormula(newFormula);
    console.log('New formula parameters:', newFormula);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 gradient-text">Admin Dashboard</h1>
      
      <StatsGrid quoteStats={quoteStats} />
      <QuotesChart chartData={chartData} />
      <FormulaEditor initialFormula={formula} onSave={handleSaveFormula} />
      <SampleCaseCalculation formula={formula} sampleCase={sampleCase} />
    </div>
  );
}
