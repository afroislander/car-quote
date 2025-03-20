
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { QuoteData } from "../QuoteForm";
import { motion } from "framer-motion";
import { Mail, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface QuoteSummaryProps {
  data: QuoteData;
}

export default function QuoteSummary({ data }: QuoteSummaryProps) {
  const [emailAddress, setEmailAddress] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  // This is a simple mock calculation. In a real application, this would be much more complex
  const calculateQuote = () => {
    let basePrice = 1000;
    
    // Age factor
    if (parseInt(data.age) < 25) basePrice *= 1.5;
    if (parseInt(data.age) > 65) basePrice *= 1.3;
    
    // Driving history factor
    if (data.drivingHistory === "minor") basePrice *= 1.2;
    if (data.drivingHistory === "major") basePrice *= 1.5;
    
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
      "Policy Start Date": data.policyStartDate,
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

  const sendQuoteToEmail = async () => {
    if (!emailAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      // Format quote data for email
      const quoteAmount = calculateQuote();
      const summaryData = formatSummaryData();
      
      // Create the payload to send to the edge function
      const payload = {
        email: emailAddress,
        quoteAmount,
        quoteDetails: summaryData,
        customerName: data.gender === "male" ? "Mr." : data.gender === "female" ? "Ms." : "",
      };
      
      console.log("Sending payload:", JSON.stringify(payload));
      
      // Send email using Supabase edge function
      const { data: responseData, error } = await supabase.functions.invoke("send-quote-email", {
        body: payload
      });

      if (error) {
        console.error("Error from Supabase function:", error);
        throw new Error(error.message || "Failed to send quote");
      }

      console.log("Quote email sent successfully:", responseData);

      // Show a toast with the testing mode notice
      toast({
        title: "Quote Sent (Development Mode)",
        description: "During development, quotes can only be sent to the developer's email address. In production, this would be sent to your email.",
        variant: "default",
      });
      
      // Clear email input after successful send
      setEmailAddress("");
    } catch (error) {
      console.error("Error sending quote email:", error);
      toast({
        title: "Failed to send quote",
        description: error.message || "There was an error sending your quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

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

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50/50 p-6 rounded-lg border border-blue-100"
      >
        <h3 className="font-semibold text-lg mb-4 text-blue-800">Send Quote to Email</h3>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={sendQuoteToEmail} 
            disabled={isSending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSending ? "Sending..." : "Send Quote"}
            <Mail className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start text-sm text-amber-800">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-amber-500" />
          <p>
            <strong>Development Mode:</strong> During development, emails can only be sent to the developer's email address due to Resend API restrictions.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6">
        {Object.entries(summaryData).map(([section, details], index) => (
          <motion.div
            key={section}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + (index * 0.1) }}
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
