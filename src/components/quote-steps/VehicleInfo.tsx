
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { QuoteData } from "../QuoteForm";

interface VehicleInfoProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
}

export default function VehicleInfo({ data, updateData }: VehicleInfoProps) {
  const safetyFeatures = [
    { id: "abs", label: "Anti-lock Brakes" },
    { id: "airbags", label: "Airbags" },
    { id: "lane", label: "Lane Departure Warning" },
    { id: "brake", label: "Automatic Emergency Braking" },
  ];

  const antiTheftDevices = [
    { id: "alarm", label: "Car Alarm" },
    { id: "gps", label: "GPS Tracking" },
    { id: "immobilizer", label: "Engine Immobilizer" },
  ];

  const handleSafetyFeatureChange = (feature: string, checked: boolean) => {
    const updatedFeatures = checked
      ? [...data.safetyFeatures, feature]
      : data.safetyFeatures.filter((f) => f !== feature);
    updateData({ safetyFeatures: updatedFeatures });
  };

  const handleAntiTheftChange = (device: string, checked: boolean) => {
    const updatedDevices = checked
      ? [...data.antiTheftDevices, device]
      : data.antiTheftDevices.filter((d) => d !== device);
    updateData({ antiTheftDevices: updatedDevices });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="makeModel">Make and Model</Label>
          <Input
            id="makeModel"
            placeholder="Enter make and model"
            value={data.makeModel}
            onChange={(e) => updateData({ makeModel: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            placeholder="Enter vehicle year"
            value={data.year}
            onChange={(e) => updateData({ year: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="usage">Vehicle Usage</Label>
          <Select value={data.usage} onValueChange={(value) => updateData({ usage: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select usage type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicleValue">Vehicle Value</Label>
          <Input
            id="vehicleValue"
            type="number"
            placeholder="Estimated value in USD"
            value={data.vehicleValue}
            onChange={(e) => updateData({ vehicleValue: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Safety Features</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safetyFeatures.map((feature) => (
            <div className="flex items-center space-x-2" key={feature.id}>
              <Checkbox
                id={feature.id}
                checked={data.safetyFeatures.includes(feature.id)}
                onCheckedChange={(checked) => handleSafetyFeatureChange(feature.id, checked as boolean)}
              />
              <label
                htmlFor={feature.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {feature.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Anti-Theft Devices</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {antiTheftDevices.map((device) => (
            <div className="flex items-center space-x-2" key={device.id}>
              <Checkbox
                id={device.id}
                checked={data.antiTheftDevices.includes(device.id)}
                onCheckedChange={(checked) => handleAntiTheftChange(device.id, checked as boolean)}
              />
              <label
                htmlFor={device.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {device.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
