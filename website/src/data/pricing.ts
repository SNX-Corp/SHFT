export interface CostItem {
  label: string;
  description: string;
}

export const costBreakdown: CostItem[] = [
  { label: "Robot Build", description: "$30,000 – $40,000 per season" },
  { label: "Competition Registration", description: "FRC district event fees" },
  { label: "Tools & Equipment", description: "Professional-grade workshop inventory" },
  { label: "Parts & Shipping", description: "Season-long supply chain" },
  { label: "Facility Rent", description: "Dedicated workshop space year-round" },
  { label: "Food & Meals", description: "During build sessions and competitions" },
  { label: "Transportation", description: "Travel to and from competitions" },
  { label: "Professional Coaching", description: "Expert mentorship and instruction" },
];
