// Property and Real Estate Types

export interface Property {
  id: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  propertyType: 'house' | 'apartment' | 'commercial' | 'land';
  listingType: 'buy' | 'lease' | 'sold';
  images: string[];
  description: string;
  agentId: string;
  features: string[];
  dateListed: string;
}

export interface Agent {
  id: string;
  name: string;
  agency: string;
  phone: string;
  email: string;
  image: string;
  specialties: string[];
}

export interface Agency {
  id: string;
  name: string;
  logo: string;
  address: string;
  phone: string;
  agents: Agent[];
}

export interface RealEstateService {
  id: string;
  category: string;
  name: string;
  description: string;
  contact: string;
}

export interface SearchFilters {
  location: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
}

export type SearchTab = 'buy' | 'lease' | 'sold' | 'services';

export interface NavItem {
  label: string;
  path: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  path: string;
  description?: string;
}
