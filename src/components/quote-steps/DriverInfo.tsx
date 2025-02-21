
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { QuoteData } from "../QuoteForm";

interface DriverInfoProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
}

export default function DriverInfo({ data, updateData }: DriverInfoProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={data.age}
            onChange={(e) => updateData({ age: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="drivingHistory">Driving History</Label>
          <Select value={data.drivingHistory} onValueChange={(value) => updateData({ drivingHistory: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select driving history" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clean">Clean Record</SelectItem>
              <SelectItem value="minor">Minor Violations</SelectItem>
              <SelectItem value="major">Major Violations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="policyStartDate">Policy Start Date</Label>
          <Input
            id="policyStartDate"
            type="date"
            value={data.policyStartDate}
            onChange={(e) => updateData({ policyStartDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter your ZIP code"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="drivingExperience">Years of Driving Experience</Label>
          <Input
            id="drivingExperience"
            type="number"
            placeholder="Years of experience"
            value={data.drivingExperience}
            onChange={(e) => updateData({ drivingExperience: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="annualMileage">Annual Mileage</Label>
          <Input
            id="annualMileage"
            type="number"
            placeholder="Miles per year"
            value={data.annualMileage}
            onChange={(e) => updateData({ annualMileage: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select value={data.maritalStatus} onValueChange={(value) => updateData({ maritalStatus: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
