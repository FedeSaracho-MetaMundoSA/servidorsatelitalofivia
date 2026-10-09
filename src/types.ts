export interface ProductSpec {
  id: string;
  title: string;
  tagline: string;
  category: "Conectividad" | "Ingeniería Local" | "Seguridad" | "Planes de Internet" | "Video Telemática";
  origin: "Equipos de Conectividad" | "Fabricación Propia / Soportes Salta";
  industries: ("Rural" | "Logística" | "Turismo" | "Residencial")[];
  description: string;
  image: string;
  bulletPoints: string[];
  techSpecs: { label: string; value: string }[];
  operatividad: string[];
  powerRequirement: string;
  sku: string;
  // --- Google Merchant Center Specific Properties ---
  price: string;                  // Format: "1500 USD" or "1250000 ARS"
  availability: "in_stock" | "out_of_stock" | "preorder";
  condition: "new" | "refurbished";
  brand: string;                  // e.g., "Servidor Satelital" or "Starlink"
  googleProductCategory: string;  // specific Google taxonomy code
  gtin?: string;                  // Global Trade Item Number (optional)
  mpn: string;                   // Manufacturer Part Number (SKU)
  isDiscontinued?: boolean;        // If flagged, handle as legacy item with replacement suggestions
  badgeText?: string;             // Optional custom badge text
  isHighlighted?: boolean;         // Flag to draw glowing borders/special layout accents
}

export interface QuoteItem {
  product: ProductSpec;
  quantity: number;
}

export interface QuoteRequest {
  razonSocial: string;
  cuit: string;
  localidad: string;
  provincia: string;
  rubro: string;
  email: string;
  telefono: string;
  additionalNotes: string;
  items: QuoteItem[];
}
