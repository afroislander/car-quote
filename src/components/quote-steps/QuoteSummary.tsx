
import { Card } from "@/components/ui/card";
import type { QuoteData } from "../QuoteForm";
import { motion } from "framer-motion";

interface QuoteSummaryProps {
  data: QuoteData;
}

export default function QuoteSummary({ data }: QuoteSummaryProps) {
  // This is a simple mock calculation. In a real application, this would be much more complex
  const calculateQuote = () => {
    let basePrice = 1000;
    
    // Age factor
    if (parseInt(data.age) < 25) basePrice *= 1.5;
    if (parseInt(data.age) > 65) basePrice *= 1.3;
    
    // Driving history factor
    if (data.drivingHistory === "minor") basePrice *= 1.2;
    if (data.drivingHistory === "major") basePrice *= 1.5;
    
    // Credit score factor
    if (data.creditScore === "excellent") basePrice *= 0.8;
    if (data.creditScore === "poor") basePrice *= 1.3;
    
    // Coverage type factor
    if (data.coverageType === "comprehensive") basePrice *= 1.4;
    if (data.coverageType === "collision") basePrice *= 1.2;
    
    // Safety features discount
    basePrice *= Math.max(0.7, 1 - (data.safetyFeatures.length * 0.05));
    
    // Anti-theft devices discount
    basePrice *= Math.max(0.8, 1 - (data.antiTheftDevices.length * 0.05));
    
    return basePrice.toFixed(2);
  };

  const formatSummaryData = () => ({
    "Driver Information": {
      Age: data.age,
      Gender: data.gender,
      "Driving History": data.drivingHistory,
      "Credit Score": data.creditScore,
      Location: data.location,
    },
    "Vehicle Information": {
      "Make and Model": data.makeModel,
      Year: data.year,
      Usage: data.usage,
      "Safety Features": data.safetyFeatures.join(", ") || "None",
      "Anti-Theft Devices": data.antiTheftDevices.join(", ") || "None",
    },
    "Policy Details": {
      "Coverage Type": data.coverageType,
      "Deductible Amount": `$${data.deductibleAmount}`,
      "Policy Limits": data.policyLimits,
    },
  });

  const summaryData = formatSummaryData();

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-6 rounded-lg bg-primary/5"
      >
        <h3 className="text-2xl font-semibold mb-2">Estimated Monthly Premium</h3>
        <p className="text-4xl font-bold text-primary">${calculateQuote()}</p>
      </motion.div>

      <div className="grid gap-6">
        {Object.entries(summaryData).map(([section, details], index) => (
          <motion.div
            key={section}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-4">{section}</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(details).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <dt className="text-sm text-muted-foreground">{key}</dt>
                    <dd className="font-medium">{value || "Not specified"}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
