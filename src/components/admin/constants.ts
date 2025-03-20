
export const defaultFormula = {
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

export const sampleCase = {
  age: 23,
  drivingHistory: "minor" as const,
  coverageType: "comprehensive" as const,
  safetyFeatures: 2,
  antiTheftDevices: 1,
};

export const quoteStats = {
  daily: 45,
  weekly: 284,
  monthly: 1247,
  signups: 892
};

export const chartData = [
  { name: "Mon", quotes: 42 },
  { name: "Tue", quotes: 38 },
  { name: "Wed", quotes: 45 },
  { name: "Thu", quotes: 39 },
  { name: "Fri", quotes: 48 },
  { name: "Sat", quotes: 35 },
  { name: "Sun", quotes: 37 },
];
