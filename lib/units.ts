export type UnitStatus = "AVAILABLE" | "LEASED";

/** Facts shown under “Lease snapshot” + “Property details” — define per unit below. */
export type PropertyDetails = {
  addressLine: string;
  cityStateZip: string;
  yearBuilt: string;
  stories: string;
  bedrooms: string;
  bathrooms: string;
  approxSqFt: string;
  fireplace: string;
  parking: string;
  view: string;
  coolingHeating: string;
  laundry: string;
  appliances: readonly string[];
  poolSpa: string;
  leaseTermMin: string;
  availableStarting: string;
  /** Outdoor / community amenities when applicable */
  patio?: string;
  amenities?: string;
};

/** Optional MLS-style extended fields — shown on unit detail when present */
export type LeaseInfo = {
  listPrice?: string;
  origListPrice?: string;
  listDate?: string;
  statusDate?: string;
  forSale?: string;
  leaseOption?: string;
  sellerConcessions?: string;
  buildingType?: string;
  style?: string;
  furnished?: string;
  mlsNumber?: string;
  apn?: string;
  lotSize?: string;
  listPricePerSqFt?: string;
  strOrCondoOrADU?: string;
  tenantPays?: string;
  petsAllowed?: string;
};

export type Unit = {
  unitNumber: string;
  status: UnitStatus;
  rent?: string;
  securityDeposit?: string;
  photos: string[];
  description?: string;
  propertyDetails: PropertyDetails;
  leaseInfo?: LeaseInfo;
};

export const UNITS: Unit[] = [
  {
    unitNumber: "101",
    status: "AVAILABLE",
    rent: "$7,950/mo",
    securityDeposit: "$7,950",
    photos: ["/images/properties/101/1.jpg", "/images/properties/101/2.jpg", "/images/properties/101/3.jpg","/images/properties/101/4.jpg","/images/properties/101/5.jpg","/images/properties/101/6.jpg","/images/properties/101/7.jpg","/images/properties/101/8.jpg","/images/properties/101/9.jpg","/images/properties/101/10.jpg","/images/properties/101/11.jpg","/images/properties/101/12.jpg","/images/properties/101/13.jpg","/images/properties/101/14.jpg","/images/properties/101/15.jpg","/images/properties/101/16.jpg","/images/properties/101/17.jpg","/images/properties/101/18.jpg","/images/properties/101/19.jpg","/images/properties/101/20.jpg","/images/properties/101/21.jpg","/images/properties/101/22.jpg","/images/properties/101/23.jpg","/images/properties/101/24.jpg","/images/properties/101/25.jpg","/images/properties/101/26.jpg","/images/properties/101/27.jpg"],
    description:
      "West of Hollywood Heights, North of Santa Monica Blvd. A stunning two-story townhouse offering modern luxury living in the heart of West Hollywood. Built within a premier building originally constructed as a condominium, this residence features two spacious primary suites with walk-in closets, two and a half well-appointed bathrooms, soaring ceilings, and recessed lighting. The sleek chef's kitchen boasts premium Bosch stainless steel appliances and generous counter space. Additional highlights include an in-unit washer and dryer, a private balcony, and a dedicated laundry room. The building also offers a rooftop deck with sweeping 360-degree views of the city and mountains. Ideally situated just moments from Sunset Boulevard and some of West Hollywood's best restaurants, boutiques, and nightlife.",
    propertyDetails: {
      addressLine: "1283 Havenhurst Dr #101",
      cityStateZip: "West Hollywood, CA 90046",
      yearBuilt: "2008",
      stories: "Multi-level",
      bedrooms: "3",
      bathrooms: "3.00",
      approxSqFt: "1,910",
      fireplace: "No",
      parking:
        "Assigned, subterranean, tandem — 2 covered spaces",
      view: "City",
      coolingHeating: "Central air, central heating",
      laundry: "In closet, in unit",
      appliances: [
        "Dishwasher",
        "Dryer",
        "Garbage disposal",
        "Range/oven",
        "Refrigerator",
        "Washer",
      ],
      poolSpa: "No pool, no spa",
      patio: "Balcony",
      amenities: "Elevator, sun deck, rooftop BBQ, picnic area",
      leaseTermMin: "1 year minimum",
      availableStarting: "03-16-2026",
    },
    leaseInfo: {
      listPrice: "$7,950",
      origListPrice: "$7,950",
      listDate: "03-16-2026",
      statusDate: "05-05-2026 Price Change",
      forSale: "No",
      leaseOption: "No",
      sellerConcessions: "Yes",
      buildingType: "Attached",
      style: "Unknown",
      furnished: "Unfurnished",
      mlsNumber: "26665155",
      apn: "5554-016-064",
      lotSize: "13,020 sq ft / Vendor Enhanced",
      listPricePerSqFt: "$3.66",
      strOrCondoOrADU: "N/A",
      tenantPays: "Electric, cable TV, gas, trash, water",
    },
  },
  {
    unitNumber: "102",
    status: "LEASED",
    photos: ["/images/2.jpg"],
    propertyDetails: {
      addressLine: "1283 Havenhurst Dr",
      cityStateZip: "West Hollywood, CA 90046",
      yearBuilt: "2023",
      stories: "4",
      bedrooms: "2",
      bathrooms: "2.5",
      approxSqFt: "1,500",
      fireplace: "No",
      parking:
        "Gated, subterranean, assigned, side by side — 2 parking spaces per residence",
      view: "City lights, mountain(s)",
      coolingHeating: "Central air, central heating",
      laundry: "In unit",
      appliances: [
        "Dishwasher",
        "Disposal",
        "Dryer",
        "Freezer",
        "Microwave",
        "Refrigerator",
        "Washer",
        "Range / oven",
      ],
      poolSpa: "No pool, no spa",
      leaseTermMin: "1 year minimum",
      availableStarting: "May 11, 2023",
    },
  },
  {
    unitNumber: "103",
    status: "LEASED",
    rent: "$5,500/mo",
    securityDeposit: "$11,000",
    photos: [],
    description:
      "An architectural statement at 1283 Havenhurst — soaring ceilings, gallery-like natural light, and a gourmet kitchen outfitted with premium appliances. A private balcony extends the living space outdoors in the heart of West Hollywood.",
    propertyDetails: {
      addressLine: "1283 Havenhurst Dr",
      cityStateZip: "West Hollywood, CA 90046",
      yearBuilt: "2023",
      stories: "4",
      bedrooms: "2",
      bathrooms: "2.5",
      approxSqFt: "1,500",
      fireplace: "No",
      parking:
        "Gated, subterranean, assigned, side by side — 2 parking spaces per residence",
      view: "City lights, mountain(s)",
      coolingHeating: "Central air, central heating",
      laundry: "In unit",
      appliances: [
        "Dishwasher",
        "Disposal",
        "Dryer",
        "Freezer",
        "Microwave",
        "Refrigerator",
        "Washer",
        "Range / oven",
      ],
      poolSpa: "No pool, no spa",
      leaseTermMin: "1 year minimum",
      availableStarting: "May 11, 2023",
    },
  },
  {
    unitNumber: "204",
    status: "AVAILABLE",
    rent: "$5,950/mo",
    securityDeposit: "$5,950",
    photos: [
      "/images/properties/204/1.jpg",
      "/images/properties/204/2.jpg",
      "/images/properties/204/3.jpg",
      "/images/properties/204/4.jpg",
      "/images/properties/204/5.jpg",
      "/images/properties/204/6.jpg",
      "/images/properties/204/7.jpg",
      "/images/properties/204/8.jpg",
      "/images/properties/204/9.jpg",
      "/images/properties/204/10.jpg",
      "/images/properties/204/11.jpg",
      "/images/properties/204/12.jpg",
    ],
    description:
      "A refined home in the heart of West Hollywood, built within a premier building originally developed as a condominium. Featuring quality construction and thoughtful design, this approximately 1,320 square foot residence offers three generously sized bedrooms with recessed lighting, hardwood floors, and a wrap-around balcony ideal for effortless indoor-outdoor living. A sleek kitchen features premium Bosch stainless steel appliances and abundant counter space. Additional highlights include a rooftop deck with sweeping 360-degree views of the Hollywood Hills and Sunset Strip skyline.",
    propertyDetails: {
      addressLine: "1283 Havenhurst Dr #204",
      cityStateZip: "West Hollywood, CA 90046",
      yearBuilt: "2008",
      stories: "1",
      bedrooms: "3",
      bathrooms: "2",
      approxSqFt: "1,320",
      fireplace: "1 — Living Room",
      parking:
        "Controlled entrance, covered parking, gated, underground, subterranean, assigned — 2 spaces",
      view: "City, city lights, tree top",
      coolingHeating: "Central air, central heating",
      laundry: "In unit",
      appliances: [
        "Built-in",
        "Dishwasher",
        "Dryer",
        "Elevator",
        "Freezer",
        "Garbage disposal",
        "Hood fan",
        "Microwave",
        "Washer",
      ],
      poolSpa: "No pool, no spa",
      leaseTermMin: "1 hour negotiable, 1 year, 12 months",
      availableStarting: "01-12-2026",
    },
    leaseInfo: {
      listPrice: "$5,950",
      origListPrice: "$5,950",
      listDate: "01-12-2026",
      statusDate: "05-07-2026 Extended",
      forSale: "No",
      leaseOption: "No",
      sellerConcessions: "No",
      buildingType: "Attached, Condominium, Single Level, Low Rise",
      style: "Contemporary",
      furnished: "Unfurnished",
      mlsNumber: "26636953",
      apn: "5554-016-007",
      lotSize: "10,025 sq ft / Assessor",
      listPricePerSqFt: "$4.51",
      strOrCondoOrADU: "S/A",
    },
  },
  {
    unitNumber: "306",
    status: "AVAILABLE",
    rent: "$6,200/mo",
    securityDeposit: "$6,500",
    photos: [
      "/images/properties/306/1.jpg",
      "/images/properties/306/2.jpg",
      "/images/properties/306/3.jpg",
      "/images/properties/306/4.jpg",
      "/images/properties/306/5.jpg",
      "/images/properties/306/6.jpg",
      "/images/properties/306/7.jpg",
      "/images/properties/306/8.jpg",
      "/images/properties/306/9.jpg",
      "/images/properties/306/10.jpg",
      "/images/properties/306/11.jpg",
      "/images/properties/306/12.jpg",
      "/images/properties/306/13.jpg",
      "/images/properties/306/14.jpg",
      "/images/properties/306/15.jpg",
      "/images/properties/306/16.jpg",
    ],
    description:
      "Corner of Fountain Ave & Havenhurst Dr. A gorgeous 1,480 sq ft residence with high ceilings, recessed lighting, and hardwood flooring throughout. Modern kitchen with a beautiful center island flowing seamlessly into the living room where you will find a focal fireplace plus a private balcony. Large south/southwest facing windows catch the warmer sun from the stunning spacious master bedroom with luxurious private bathroom. Walk-in closets and private balcony plus shared access to the main balcony. Washer and dryer in unit. Private storage room in the garage and gated garage, tandem parking. Pets okay with additional deposit and additional monthly fee. The building has a brand-new rooftop deck with stunning views of the city, ocean and the iconic Hollywood Hills.",
    propertyDetails: {
      addressLine: "1283 Havenhurst Dr #306",
      cityStateZip: "West Hollywood, CA 90046",
      yearBuilt: "2008",
      stories: "1",
      bedrooms: "3",
      bathrooms: "2.00",
      approxSqFt: "1,480",
      fireplace: "1 — Living Room",
      parking:
        "Subterranean, tandem, assigned — 2 covered spaces",
      view: "City",
      coolingHeating: "Central air, central heating",
      laundry: "In closet",
      appliances: [
        "Freezer",
        "Garbage disposal",
        "Dryer",
        "Dishwasher",
        "Microwave",
        "Range/oven",
        "Refrigerator",
        "Washer",
      ],
      poolSpa: "No pool, no spa",
      patio: "Roof top deck, balcony",
      amenities: "Rooftop deck, elevator, sun deck",
      leaseTermMin: "1+ year",
      availableStarting: "03-16-2026",
    },
    leaseInfo: {
      listPrice: "$6,200",
      origListPrice: "$6,500",
      listDate: "03-16-2026",
      statusDate: "05-05-2026 Price Change",
      forSale: "Yes",
      leaseOption: "No",
      sellerConcessions: "Yes",
      buildingType: "Attached",
      style: "Unknown",
      furnished: "Unfurnished",
      mlsNumber: "26665103",
      apn: "5554-016-069",
      lotSize: "13,017 sq ft / Other",
      listPricePerSqFt: "$4.19",
      strOrCondoOrADU: "N/A",
      petsAllowed: "Yes",
      tenantPays: "Electric, cable TV, gas, trash, water",
    },
  },
  {
    unitNumber: "305",
    status: "LEASED",
    photos: ["/images/5.jpg"],
    propertyDetails: {
      addressLine: "1283 Havenhurst Dr",
      cityStateZip: "West Hollywood, CA 90046",
      yearBuilt: "2023",
      stories: "4",
      bedrooms: "2",
      bathrooms: "2.5",
      approxSqFt: "1,500",
      fireplace: "No",
      parking:
        "Gated, subterranean, assigned, side by side — 2 parking spaces per residence",
      view: "City lights, mountain(s)",
      coolingHeating: "Central air, central heating",
      laundry: "In unit",
      appliances: [
        "Dishwasher",
        "Disposal",
        "Dryer",
        "Freezer",
        "Microwave",
        "Refrigerator",
        "Washer",
        "Range / oven",
      ],
      poolSpa: "No pool, no spa",
      leaseTermMin: "1 year minimum",
      availableStarting: "May 11, 2023",
    },
  },
  {
    unitNumber: "407",
    status: "AVAILABLE",
    rent: "$6,500/mo",
    securityDeposit: "$13,000",
    photos: ["/images/4.jpg", "/images/2.jpg", "/images/5.jpg"],
    description:
      "Top-floor residence with generous glazing, layered natural light, and designer-selected interiors. Expansive entertaining spaces and elevated outlooks make this the premier offering within the building.",
    propertyDetails: {
      addressLine: "1283 Havenhurst Dr",
      cityStateZip: "West Hollywood, CA 90046",
      yearBuilt: "2023",
      stories: "4",
      bedrooms: "2",
      bathrooms: "2.5",
      approxSqFt: "1,500",
      fireplace: "No",
      parking:
        "Gated, subterranean, assigned, side by side — 2 parking spaces per residence",
      view: "City lights, mountain(s)",
      coolingHeating: "Central air, central heating",
      laundry: "In unit",
      appliances: [
        "Dishwasher",
        "Disposal",
        "Dryer",
        "Freezer",
        "Microwave",
        "Refrigerator",
        "Washer",
        "Range / oven",
      ],
      poolSpa: "No pool, no spa",
      leaseTermMin: "1 year minimum",
      availableStarting: "May 11, 2023",
    },
  },
  {
    unitNumber: "408",
    status: "LEASED",
    photos: ["/images/3.jpg"],
    propertyDetails: {
      addressLine: "1283 Havenhurst Dr",
      cityStateZip: "West Hollywood, CA 90046",
      yearBuilt: "2023",
      stories: "4",
      bedrooms: "2",
      bathrooms: "2.5",
      approxSqFt: "1,500",
      fireplace: "No",
      parking:
        "Gated, subterranean, assigned, side by side — 2 parking spaces per residence",
      view: "City lights, mountain(s)",
      coolingHeating: "Central air, central heating",
      laundry: "In unit",
      appliances: [
        "Dishwasher",
        "Disposal",
        "Dryer",
        "Freezer",
        "Microwave",
        "Refrigerator",
        "Washer",
        "Range / oven",
      ],
      poolSpa: "No pool, no spa",
      leaseTermMin: "1 year minimum",
      availableStarting: "May 11, 2023",
    },
  },
];

export function getUnitBySlug(slug: string): Unit | undefined {
  return UNITS.find((u) => u.unitNumber === decodeURIComponent(slug));
}

export function getAvailableUnitCount(): number {
  return UNITS.filter((u) => u.status === "AVAILABLE").length;
}

/**
 * Strips trailing decimal zeros from a bathroom count string.
 * "2.00" → "2", "2.50" → "2.5", "2.5" → "2.5", "3" → "3"
 */
export function formatBathrooms(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return String(num);
}
