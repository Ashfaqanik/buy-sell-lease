export type Property = {
  id: string;
  title: string;
  suburb: string;
  state: string;
  priceLabel: string;
  beds: number;
  baths: number;
  cars: number;
  type: "House" | "Apartment" | "Townhouse" | "Land";
  imageUrl?: string;

  // ✅ Add these so URL params can filter properly
  category: "residential" | "commercial";
  status?: "Sold" | "Leased";
  rentType?: "Residential Rentals" | "Commercial Leasing";
  serviceType?: string; // not used on property results yet, but future-proof
};

export const mockProperties: Property[] = [
  {
    id: "BSL-10001",
    title: "Modern Family Home",
    suburb: "Sydney",
    state: "NSW",
    priceLabel: "$1,250,000",
    beds: 4,
    baths: 2,
    cars: 2,
    type: "House",
    category: "residential",
    status: "Sold",
  },
  {
    id: "BSL-10002",
    title: "City Apartment Close to CBD",
    suburb: "Melbourne",
    state: "VIC",
    priceLabel: "$780,000",
    beds: 2,
    baths: 1,
    cars: 1,
    type: "Apartment",
    category: "residential",
    rentType: "Residential Rentals",
    status: "Leased",
  },
  {
    id: "BSL-10003",
    title: "Townhouse Near Transport",
    suburb: "Brisbane",
    state: "QLD",
    priceLabel: "$690,000",
    beds: 3,
    baths: 2,
    cars: 1,
    type: "Townhouse",
    category: "residential",
    rentType: "Residential Rentals",
  },
  {
    id: "BSL-10004",
    title: "Land Opportunity",
    suburb: "Perth",
    state: "WA",
    priceLabel: "$450,000",
    beds: 0,
    baths: 0,
    cars: 0,
    type: "Land",
    category: "commercial",
    rentType: "Commercial Leasing",
  },
];
