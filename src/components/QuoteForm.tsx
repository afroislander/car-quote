import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DriverInfo from "./quote-steps/DriverInfo";
import VehicleInfo from "./quote-steps/VehicleInfo";
import PolicyInfo from "./quote-steps/PolicyInfo";
import QuoteSummary from "./quote-steps/QuoteSummary";
import { ChevronRight, ChevronLeft, Car } from "lucide-react";

export type QuoteData = {
  // Driver Info
  age: string;
  gender: string;
  drivingHistory: string;
  creditScore: string;
  location: string;
  drivingExperience: string;
  annualMileage: string;
  maritalStatus: string;
  // Vehicle Info
  makeModel: string;
  year: string;
  usage: string;
  safetyFeatures: string[];
  antiTheftDevices: string[];
  vehicleValue: string;
  // Policy Info
  coverageType: string;
  deductibleAmount: string;
  policyLimits: string;
};

const steps = ["Driver Information", "Vehicle Information", "Policy Details", "Quote Summary"];

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    age: "",
    gender: "",
    drivingHistory: "",
    creditScore: "",
    location: "",
    drivingExperience: "",
    annualMileage: "",
    maritalStatus: "",
    makeModel: "",
    year: "",
    usage: "",
    safetyFeatures: [],
    antiTheftDevices: [],
    vehicleValue: "",
    coverageType: "",
    deductibleAmount: "",
    policyLimits: "",
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateQuoteData = (data: Partial<QuoteData>) => {
    setQuoteData((prev) => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <DriverInfo data={quoteData} updateData={updateQuoteData} />;
      case 1:
        return <VehicleInfo data={quoteData} updateData={updateQuoteData} />;
      case 2:
        return <PolicyInfo data={quoteData} updateData={updateQuoteData} />;
      case 3:
        return <QuoteSummary data={quoteData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
      
      <div className="absolute top-10 left-10 text-blue-400/30 transform -rotate-12">
        <Car size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-indigo-400/30 transform rotate-12">
        <Car size={120} />
      </div>

      <Card className="w-full max-w-3xl p-6 space-y-6 bg-white/90 backdrop-blur shadow-xl rounded-xl relative z-10 border-t border-white/50">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Get Your Car Insurance Quote
          </h2>
          <p className="text-muted-foreground">Complete the form below to receive your personalized quote</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{steps[currentStep]}</span>
          </div>
          <Progress value={progress} className="h-2 bg-blue-100">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: `${progress}%` }} />
          </Progress>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {renderStep()}
        </motion.div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 0}
            className="border-blue-200 hover:bg-blue-50"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          <Button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={currentStep === steps.length - 1}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
          >
            {currentStep === steps.length - 2 ? "Get Quote" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
