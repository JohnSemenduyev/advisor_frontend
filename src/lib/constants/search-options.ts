export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
  "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
] as const;

export const STATE_CODES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
  "VA", "WA", "WV", "WI", "WY"
] as const;

export const POPULAR_CITIES = [
  "Edison, NJ", "Newark, NJ", "Jersey City, NJ", "New Brunswick, NJ", "Trenton, NJ", "Princeton, NJ",
  "Elizabeth, NJ", "Paterson, NJ", "Woodbridge, NJ", "Freehold, NJ", "New York, NY", "Albany, NY",
  "Buffalo, NY", "Rochester, NY", "Yonkers, NY", "Brooklyn, NY", "Queens, NY", "Philadelphia, PA",
  "Pittsburgh, PA", "Allentown, PA", "Harrisburg, PA", "Los Angeles, CA", "San Francisco, CA",
  "San Diego, CA", "Sacramento, CA", "San Jose, CA", "Chicago, IL", "Springfield, IL", "Houston, TX",
  "Dallas, TX", "Austin, TX", "San Antonio, TX", "Miami, FL", "Orlando, FL", "Tampa, FL",
  "Jacksonville, FL", "Boston, MA", "Cambridge, MA", "Washington, DC", "Seattle, WA", "Portland, OR",
  "Atlanta, GA", "Savannah, GA", "Norfolk, VA", "Virginia Beach, VA", "Richmond, VA", "Charlotte, NC",
  "Raleigh, NC", "Denver, CO", "Phoenix, AZ", "Las Vegas, NV", "Nashville, TN", "Detroit, MI",
  "Minneapolis, MN", "New Orleans, LA"
] as const;

export const COMMON_INDUSTRIES = [
  "Security Guard Services",
  "Commercial Facility Patrol 24/7",
  "Access Control & Gate Automation",
  "CCTV & Video Surveillance",
  "Alarm & Detection Systems",
  "Facility Management & Maintenance",
  "Cleaning & Janitorial Services",
  "Logistics & Freight Supervision",
  "Warehouse & Distribution Security",
  "Armed & Executive Protection",
  "Biotech & Laboratory Security",
  "Construction Site Security",
  "Cybersecurity & IT Infrastructure",
  "Maritime Security & Cargo Escort",
  "Event Security & Crowd Control",
  "Healthcare & Hospital Safety",
  "Fire Protection & Life Safety",
  "HVAC & Mechanical Maintenance",
  "Landscaping & Groundskeeping",
  "Waste Management & Recycling",
  "Accounting & Financial Advisory",
  "Legal & Compliance Services"
] as const;

export function getLocationSuggestions(
  query: string,
  selectedLocations: string[]
): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hasSelected = (candidate: string) =>
    selectedLocations.some((s) => s.toLowerCase() === candidate.toLowerCase());

  const matchedStates = US_STATES.filter((stateName, idx) => {
    if (hasSelected(stateName)) return false;
    return (
      stateName.toLowerCase().includes(q) ||
      STATE_CODES[idx].toLowerCase().startsWith(q)
    );
  });

  const matchedCities = POPULAR_CITIES.filter((city) => {
    if (hasSelected(city)) return false;
    return city.toLowerCase().includes(q);
  });

  return Array.from(new Set([...matchedStates, ...matchedCities])).slice(0, 12);
}

export function getIndustrySuggestions(
  query: string,
  selectedIndustries: string[]
): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hasSelected = (candidate: string) =>
    selectedIndustries.some((s) => s.toLowerCase() === candidate.toLowerCase());

  const matched = COMMON_INDUSTRIES.filter((ind) => {
    if (hasSelected(ind)) return false;
    return ind.toLowerCase().includes(q);
  });

  return matched.slice(0, 12);
}

