
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { QuoteData } from "../QuoteForm";

interface PolicyInfoProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
}

export default function PolicyInfo({ data, updateData }: PolicyInfoProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="coverageType">Coverage Type</Label>
          <Select value={data.coverageType} onValueChange={(value) => updateData({ coverageType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select coverage type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="liability">Liability Only</SelectItem>
              <SelectItem value="collision">Collision</SelectItem>
              <SelectItem value="comprehensive">Comprehensive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deductibleAmount">Deductible Amount</Label>
          <Select value={data.deductibleAmount} onValueChange={(value) => updateData({ deductibleAmount: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select deductible amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500">$500</SelectItem>
              <SelectItem value="1000">$1,000</SelectItem>
              <SelectItem value="2000">$2,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="policyLimits">Policy Limits</Label>
          <Select value={data.policyLimits} onValueChange={(value) => updateData({ policyLimits: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select policy limits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="state-minimum">State Minimum</SelectItem>
              <SelectItem value="50/100">50/100 ($50,000/$100,000)</SelectItem>
              <SelectItem value="100/300">100/300 ($100,000/$300,000)</SelectItem>
              <SelectItem value="250/500">250/500 ($250,000/$500,000)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
