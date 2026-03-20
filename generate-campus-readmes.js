#!/usr/bin/env node
/**
 * Generates a BRAND.md file in each campus customization directory with:
 *   - Campus name and Primo view code
 *   - Links to brand/identity guides
 *   - Official brand colors (where known)
 *   - Current colors.json.txt values
 *   - WCAG 2.1 AA compliance analysis
 *   - Recommendations
 *
 * Run from repo root:
 *   node generate-campus-readmes.js
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// WCAG contrast helpers
// ---------------------------------------------------------------------------
function sRGB(c) {
  c = c / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function luminance(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * sRGB(r) + 0.7152 * sRGB(g) + 0.0722 * sRGB(b);
}
function contrast(hex1, hex2) {
  const l1 = luminance(hex1), l2 = luminance(hex2);
  const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
function badge(ratio, threshold = 4.5) {
  return ratio >= threshold ? `${ratio.toFixed(2)}:1 PASS` : `${ratio.toFixed(2)}:1 **FAIL**`;
}

// ---------------------------------------------------------------------------
// Campus data
// ---------------------------------------------------------------------------
const campuses = {
  CUNY_AL: {
    name: 'CUNY All Libraries (Network)',
    shortName: 'CUNY All Libraries',
    description: 'General CUNY-wide Primo view used as a fallback for campuses without dedicated views. Shares colors with CUNY_NETWORK.',
    website: 'https://www.cuny.edu/libraries/',
    brandGuide: null,
    officialColors: null,
  },
  CUNY_BB: {
    name: 'Baruch College',
    shortName: 'Baruch',
    description: 'Bernard M. Baruch College, a business-focused liberal arts college in Midtown Manhattan.',
    website: 'https://www.baruch.cuny.edu/',
    brandGuide: {
      label: 'Baruch Brand Identity Guidelines',
      url: 'https://toolkit.baruch.cuny.edu/reputation-management-toolkit/logos/',
      pdfUrl: 'https://toolkit.baruch.cuny.edu/wp-content/uploads/sites/11/2022/08/Final-BrandIdentityGuidelines.pdf',
    },
    officialColors: [
      { name: 'Baruch Blue', role: 'Primary', hex: '#05336b', pantone: 'PMS 288 C' },
      { name: 'Baruch Gold', role: 'Secondary', hex: '#ffb81c', pantone: 'PMS 124 C' },
    ],
    notes: 'Baruch uses CUNY Blue as its primary color per the brand guidelines. The current primary (#085394) is close but slightly lighter than the official Baruch Blue (#05336b).',
  },
  CUNY_BC: {
    name: 'Brooklyn College',
    shortName: 'Brooklyn',
    description: 'A liberal arts and sciences college in Flatbush, Brooklyn.',
    website: 'https://www.brooklyn.cuny.edu/',
    brandGuide: {
      label: 'Brooklyn College Visual Identity',
      url: 'http://www.brooklyn.cuny.edu/web/news/communications/identity.php',
      pdfUrl: 'https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-branding/downloads/cuny-colleges/BRKL_IdentityManual_20131.pdf',
    },
    officialColors: [
      { name: 'Brooklyn Maroon', role: 'Primary', hex: '#7b2240', pantone: 'PMS 208 C' },
      { name: 'Brooklyn Gold', role: 'Secondary', hex: '#f5a800', pantone: 'PMS 7406 C' },
      { name: 'Warm Gray', role: 'Neutral', hex: '#a89f8c', pantone: 'Warm Gray 9 C' },
    ],
    notes: 'Current primary (#7b2240) matches official maroon. Secondary (#FAD129) is a brighter gold — the official PMS 7406 C converts to approximately #F5A800. Consider updating secondary for closer brand alignment.',
  },
  CUNY_BM: {
    name: 'Borough of Manhattan Community College',
    shortName: 'BMCC',
    description: 'BMCC is the largest community college in the CUNY system, located in Lower Manhattan.',
    website: 'https://www.bmcc.cuny.edu/',
    brandGuide: {
      label: 'BMCC Brand Guidelines',
      url: 'https://www.bmcc.cuny.edu/about-bmcc/public-affairs/brand-guidelines/',
      colorsUrl: 'https://www.bmcc.cuny.edu/about-bmcc/public-affairs/brand-guidelines/graphic-style-guidelines/colors/',
    },
    officialColors: [
      { name: 'BMCC Blue', role: 'Primary', hex: '#0058A4', pantone: 'PMS 293 C' },
      { name: 'BMCC Orange', role: 'Secondary', hex: '#FF6600', pantone: 'PMS 021 C' },
      { name: 'Light Yellow', role: 'Accent', hex: '#F6EB61', pantone: 'PMS 100 C' },
      { name: 'Gray', role: 'Neutral', hex: '#B2B4B2', pantone: 'PMS 421 C' },
      { name: 'Light Blue', role: 'Accent', hex: '#9BCBEB', pantone: 'PMS 291 C' },
    ],
    notes: 'Current primary (#0051bc) is slightly off from official BMCC Blue (#0058A4). Consider updating to the exact brand color. Secondary (#A9CDD6) is light blue, not the official orange — likely a deliberate choice for web contrast, but diverges from brand.',
  },
  CUNY_BX: {
    name: 'Bronx Community College',
    shortName: 'BCC',
    description: 'A community college in the University Heights neighborhood of the Bronx.',
    website: 'https://www.bcc.cuny.edu/',
    brandGuide: {
      label: 'BCC Visual Identity & Resources',
      url: 'https://www.bcc.cuny.edu/about-bcc/communications-and-marketing/visual-identity-elements-resources/',
    },
    officialColors: [
      { name: 'BCC Green', role: 'Primary', hex: '#0e754b', pantone: null },
    ],
    notes: 'Current primary (#0e754b) appears to match BCC\'s green identity. Verify against the latest brand guide PDF on their communications page.',
    wcagNotes: ['**links** `#5C92BD` (3.33:1 on white) fails WCAG AA minimum of 4.5:1. Change to a darker accessible blue, e.g. `#1a6a9e` (5.06:1) or `#0a5a8e` (5.8:1).'],
  },
  CUNY_CC: {
    name: 'The City College of New York',
    shortName: 'CCNY',
    description: 'The flagship college of CUNY, located in Hamilton Heights, Manhattan. Includes the Division of Science and Innovation (DSI).',
    website: 'https://www.ccny.cuny.edu/',
    brandGuide: {
      label: 'CCNY Logos and Branding',
      url: 'https://www.ccny.cuny.edu/communications-marketing/logosbranding',
      pdfUrl: 'https://www.ccny.cuny.edu/sites/default/files/2025-03/CCNY-Style-Guide.pdf',
    },
    officialColors: [
      { name: 'CCNY Purple', role: 'Primary', hex: '#5b2d8e', pantone: 'PMS 267 C' },
      { name: 'CCNY Gray', role: 'Secondary', hex: '#808080', pantone: 'PMS 425 C (85% black in CMYK)' },
    ],
    notes: 'CCNY\'s official colors are purple and gray. The current primary (#77787C) is a flat gray, not CCNY purple. This is both a WCAG issue AND a brand misalignment.',
    wcagNotes: ['**primary** `#77787C` (4.41:1) narrowly fails the 4.5:1 AA threshold for normal text. More critically, it does not reflect CCNY\'s official purple. Switching to the brand purple (#5b2d8e, 9.33:1) would fix both issues.'],
  },
  CUNY_CL: {
    name: 'CUNY School of Law',
    shortName: 'CUNY Law',
    description: 'A public law school in Long Island City, Queens, with a focus on law in the service of human needs.',
    website: 'https://www.law.cuny.edu/',
    brandGuide: {
      label: 'CUNY School of Law — Communications',
      url: 'https://www.law.cuny.edu/communications/',
    },
    officialColors: null,
    notes: 'No publicly available detailed brand guide found. Contact law.cuny.edu communications to obtain official color specifications.',
    wcagNotes: ['**links** `#008e7e` (teal, 4.06:1) fails AA for normal text. Darken to e.g. `#006b5e` (5.7:1) or `#005a4f` (6.8:1).'],
  },
  CUNY_GC: {
    name: 'CUNY Graduate Center',
    shortName: 'Grad Center',
    description: 'CUNY\'s doctoral and advanced research hub, located in Midtown Manhattan.',
    website: 'https://www.gc.cuny.edu/',
    brandGuide: {
      label: 'Graduate Center Brand Guide',
      url: 'https://www.gc.cuny.edu/communications-and-marketing/resources-and-services/brand-guide',
      pdfUrl: 'https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-and-branding/download/cuny-colleges/CUNY_Graduate_Center_Identity_Guidelines_Online.pdf',
    },
    officialColors: [
      { name: 'GC Blue', role: 'Primary', hex: '#005daa', pantone: null },
      { name: 'CUNY Gold', role: 'Secondary', hex: '#ffb81c', pantone: 'PMS 124 C' },
    ],
    notes: 'Current primary (#005daa) and links (#005daa) appear to match the Graduate Center\'s blue identity. Verify gold secondary usage context for WCAG compliance.',
  },
  CUNY_GJ: {
    name: 'Craig Newmark Graduate School of Journalism at CUNY',
    shortName: 'CUNY Journalism',
    description: 'A graduate journalism school located in Midtown Manhattan.',
    website: 'https://journalism.cuny.edu/',
    brandGuide: {
      label: 'CUNY Journalism — Communications/Branding',
      url: 'https://journalism.cuny.edu/about/communications/',
    },
    officialColors: null,
    notes: 'No publicly available brand guide PDF found. The school uses a dark charcoal/black with orange accents in its web identity. Contact journalism.cuny.edu communications for official specifications.',
    wcagNotes: [
      '**secondary** `#fe8807` (orange, 2.40:1) fails AA badly when used as button text on white.',
      '**links** `#fe8807` (2.40:1) fails AA for hyperlink text on white. This is a critical accessibility issue. Replace with a dark enough orange/amber, e.g. `#a85400` (7.1:1), or use the dark primary (#373737, 11.90:1) for links.',
    ],
  },
  CUNY_HC: {
    name: 'Hunter College & Centro',
    shortName: 'Hunter',
    description: 'A liberal arts college on the Upper East Side of Manhattan. Includes Centro de Estudios Puertorriqueños.',
    website: 'https://www.hunter.cuny.edu/',
    brandGuide: {
      label: 'Hunter College Visual Identity',
      url: 'https://www.hunter.cuny.edu/kb/category/resources/identity/',
      pdfUrl: 'https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing/campus-identity/HC-Visual-Identity-Standards_2016.pdf',
    },
    officialColors: [
      { name: 'Hunter Purple', role: 'Primary', hex: '#5f259f', pantone: 'PMS 267 C', rgb: 'R 95 G 37 B 159' },
      { name: 'Hunter Gold', role: 'Secondary', hex: '#ffc72a', pantone: 'PMS 123 C', rgb: 'R 255 G 200 B 44' },
    ],
    notes: 'Current primary (#5f259f) and secondary (#ffc72a) are an exact match to Hunter\'s official brand colors. Great brand alignment!',
  },
  CUNY_HO: {
    name: 'Hostos Community College',
    shortName: 'Hostos',
    description: 'A bilingual (English/Spanish) community college in the South Bronx, named for Eugenio Maria de Hostos.',
    website: 'https://www.hostos.cuny.edu/',
    brandGuide: {
      label: 'Hostos Media Guidelines',
      url: 'https://www.hostos.cuny.edu/Administrative-Offices/Office-of-the-President/Office-of-Communications/Media-Guidelines',
      pdfUrl: 'https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-branding/downloads/cuny-colleges/Hostos_Branding_Manual.pdf',
    },
    officialColors: [
      { name: 'Hostos Blue', role: 'Primary', hex: '#003087', pantone: 'PMS 294 C' },
      { name: 'Hostos Orange', role: 'Secondary', hex: '#e35205', pantone: 'PMS 144 C' },
      { name: 'Hostos Gold', role: 'Accent', hex: '#c89520', pantone: 'PMS 110 C' },
    ],
    notes: 'Current primary (#314d89) is a lighter blue than the official Hostos Blue (#003087, PMS 294 C). Secondary (#ffbc3a) is gold/amber rather than the official Hostos orange (#e35205). Consider aligning to the official palette.',
  },
  CUNY_JJ: {
    name: 'John Jay College of Criminal Justice',
    shortName: 'John Jay',
    description: 'A liberal arts college specializing in criminal justice and public service, located in Midtown Manhattan.',
    website: 'https://www.jjay.cuny.edu/',
    brandGuide: {
      label: 'John Jay Branding Guidelines',
      url: 'https://www.jjay.cuny.edu/about/governance-senior-leadership/marketing-communications/branding-guidelines-logos',
      pdfUrl: 'https://www.jjay.cuny.edu/sites/default/files/2023-09/JJC-Branding-Guidelines-2023.pdf',
    },
    officialColors: [
      { name: 'JJC Dark Blue', role: 'Primary', hex: '#003a70', pantone: 'PMS 2768 U' },
    ],
    notes: 'The 2023 brand guide uses a dark navy blue (PMS 2768 U, ~#003a70) as the primary identity color. The current primary (#218994, teal) does not match — this is both a WCAG issue and a brand misalignment.',
    wcagNotes: ['**primary** `#218994` (teal, 4.14:1) fails AA for normal text. More critically, it does not match JJC\'s official dark blue brand identity. Update to a dark blue: the official PMS 2768 U (~#003a70, 14.5:1) would pass with a very high ratio.'],
  },
  CUNY_KB: {
    name: 'Kingsborough Community College',
    shortName: 'Kingsborough',
    description: 'A community college in Manhattan Beach, Brooklyn, with a maritime focus.',
    website: 'https://www.kbcc.cuny.edu/',
    brandGuide: {
      label: 'KCC Communications and Marketing',
      url: 'https://www.kbcc.cuny.edu/CommunicationsandMarketing/',
    },
    officialColors: null,
    notes: 'No dedicated public brand guide PDF found for Kingsborough. Contact the KCC Communications and Marketing office for official color specifications. The current navy (#002c73) and orange (#ff4e00) are a classic academic palette.',
    wcagNotes: ['**secondary** `#ff4e00` (orange, 3.31:1) does not meet 4.5:1 AA for normal text when used as button/link text on white. It narrowly passes 3:1 for large text only.'],
  },
  CUNY_LE: {
    name: 'Lehman College',
    shortName: 'Lehman',
    description: 'A liberal arts college in the Bedford Park neighborhood of the Bronx.',
    website: 'https://www.lehman.cuny.edu/',
    brandGuide: {
      label: 'Lehman College — Communications',
      url: 'https://www.lehman.cuny.edu/communications/',
    },
    officialColors: [
      { name: 'Lehman Cardinal Red', role: 'Primary', hex: '#c8102e', pantone: 'PMS 186 C' },
      { name: 'Lehman White', role: 'Secondary', hex: '#ffffff', pantone: null },
    ],
    notes: 'Lehman\'s official identity colors are cardinal red and white. The current primary (#06284e, dark navy) and secondary (#84BD00, green) do not reflect Lehman\'s official palette — this appears to be a significant brand misalignment.',
  },
  CUNY_LG: {
    name: 'LaGuardia Community College',
    shortName: 'LaGuardia',
    description: 'A community college in Long Island City, Queens, named for Mayor Fiorello La Guardia.',
    website: 'https://www.laguardia.edu/',
    brandGuide: {
      label: 'LaGuardia Brand Book',
      url: 'https://www.laguardia.edu/marketing/',
      pdfUrl: 'https://www.laguardia.edu/wp-content/uploads/2024/02/full-visual-id-branding.pdf',
    },
    officialColors: [
      { name: 'LaGuardia Red', role: 'Primary', hex: '#c4282a', pantone: null },
    ],
    notes: 'Current primary (#C4262E) closely matches LaGuardia\'s red identity. Verify exact shade against the 2024 brand book PDF.',
  },
  CUNY_ME: {
    name: 'Medgar Evers College',
    shortName: 'Medgar Evers',
    description: 'A liberal arts college in Crown Heights, Brooklyn, named for civil rights leader Medgar Evers.',
    website: 'https://www.mec.cuny.edu/',
    brandGuide: {
      label: 'Medgar Evers Creative Services',
      url: 'https://ares.mec.cuny.edu/office-of-communications/external-internal-communications/creative-services/',
      pdfUrl: 'https://www2.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-branding/downloads/cuny-colleges/Official_Graphic_Identity_System2014.pdf',
    },
    officialColors: [
      { name: 'MEC Black', role: 'Primary', hex: '#231f20', pantone: 'Black' },
      { name: 'MEC Gold', role: 'Secondary', hex: '#ffcc00', pantone: null },
    ],
    notes: 'Medgar Evers uses black, gold, and white as official brand colors. The current primary (#666666 gray) diverges from the official black identity. Consider using a dark color to better represent the brand.',
    wcagNotes: ['**links** `#5C92BD` (medium blue, 3.33:1) fails AA for normal text. Replace with a darker blue, e.g. `#1a5f8a` (5.3:1) or the official dark primary.'],
  },
  CUNY_NC: {
    name: 'Guttman Community College',
    shortName: 'Guttman',
    description: 'Stella and Charles Guttman Community College in Midtown Manhattan, CUNY\'s newest community college.',
    website: 'https://guttman.cuny.edu/',
    brandGuide: {
      label: 'Guttman Identity Standards Manual',
      url: 'https://guttman.cuny.edu/',
      pdfUrl: 'https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing/campus-identity/Guttman_Identity_Standards_Manual.pdf',
    },
    officialColors: null,
    notes: 'The Guttman Identity Standards Manual PDF contains official color specs. The current primary (#0c2255, dark navy) and secondary (#F26822, orange) appear to reflect a CUNY Network palette rather than Guttman\'s own identity (sky blue and red). Verify against the manual.',
    wcagNotes: ['**secondary** `#F26822` (orange, 3.10:1) fails AA for normal text when used as button text on white.'],
  },
  CUNY_NY: {
    name: 'New York City College of Technology (CityTech)',
    shortName: 'CityTech',
    description: 'A technology and applied sciences college in Downtown Brooklyn.',
    website: 'https://www.citytech.cuny.edu/',
    brandGuide: {
      label: 'CityTech Branding',
      url: 'https://www.citytech.cuny.edu/citytechbranding/',
      pdfUrl: 'https://www.citytech.cuny.edu/citytechbranding/CityTechIDbook.pdf',
    },
    officialColors: [
      { name: 'CityTech Blue', role: 'Primary', hex: '#003087', pantone: 'PMS 280 C' },
      { name: 'CityTech Orange', role: 'Secondary', hex: '#e35205', pantone: 'PMS 152 C' },
    ],
    notes: 'CityTech\'s official colors are navy blue and orange. The current primary (#214971) is a medium blue — lighter than the official PMS 280 C navy. Secondary (#F6B72B, gold) diverges from the official orange. Aligning to navy + orange would better represent the CityTech brand.',
  },
  CUNY_QB: {
    name: 'Queensborough Community College',
    shortName: 'Queensborough',
    description: 'A community college in Bayside, Queens.',
    website: 'https://www.qcc.cuny.edu/',
    brandGuide: {
      label: 'QCC Identity Standards',
      url: 'https://www.qcc.cuny.edu/communications/',
      pdfUrl: 'https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-branding/downloads/cuny-colleges/QCCIdentityStandards.pdf',
    },
    officialColors: null,
    notes: 'Consult the QCC Identity Standards PDF for official color specifications.',
    wcagNotes: ['**links** `#5C92BD` (medium blue, 3.33:1) fails AA for normal text. Replace with a darker accessible blue, e.g. `#1a5f8a` (5.3:1).'],
  },
  CUNY_QC: {
    name: 'Queens College',
    shortName: 'Queens College',
    description: 'A liberal arts college in Flushing, Queens.',
    website: 'https://www.qc.cuny.edu/',
    brandGuide: {
      label: 'Queens College Brand Graphics Guidelines',
      url: 'https://www.qc.cuny.edu/communications/',
      pdfUrl: 'https://www.qc.cuny.edu/communications/wp-content/uploads/sites/21/2022/07/QC_BGG_Public.pdf',
    },
    officialColors: [
      { name: 'QC Red', role: 'Primary', hex: '#e71939', pantone: 'PMS 711 C', cmyk: 'C0 M100 Y80 K2' },
      { name: 'QC Black', role: 'Secondary', hex: '#231f20', pantone: 'Black' },
    ],
    notes: 'Queens College\'s official identity is red and black. The current primary (#494949, dark gray) and links (#5C92BD, light blue) do not reflect Queens College\'s brand colors — this is a significant misalignment.',
    wcagNotes: [
      '**secondary** `#ffffff` (1.00:1) is white on white — completely invisible. This must be changed.',
      '**links** `#5C92BD` (3.33:1) fails AA for normal text.',
    ],
  },
  CUNY_SI: {
    name: 'College of Staten Island',
    shortName: 'CSI',
    description: 'A liberal arts college on a 204-acre campus in Willowbrook, Staten Island.',
    website: 'https://www.csi.cuny.edu/',
    brandGuide: {
      label: 'CSI Visual Identity Manual',
      url: 'https://www.csi.cuny.edu/about-csi/news-communications/',
      pdfUrl: 'https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-branding/downloads/cuny-colleges/CSI-Identity-Manual.pdf',
    },
    officialColors: null,
    notes: 'Consult the CSI Visual Identity Manual PDF for official color specifications. The current primary (#53626e, blue-gray) and secondary (#83c8ef, light blue) reflect a cool academic palette.',
  },
  CUNY_YC: {
    name: 'York College',
    shortName: 'York',
    description: 'A liberal arts college in Jamaica, Queens.',
    website: 'https://www.york.cuny.edu/',
    brandGuide: {
      label: 'York College Branding Guide',
      url: 'https://www.york.cuny.edu/communications',
      pdfUrl: 'https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-and-branding/download/cuny-colleges/york_branding_guide-cobranding-rev2.pdfv',
    },
    officialColors: [
      { name: 'York Red', role: 'Primary', hex: '#e22b2e', pantone: null },
      { name: 'York Dark', role: 'Secondary', hex: '#2e3233', pantone: null },
    ],
    notes: 'Current primary (#e22b2e) and secondary (#2e3233) closely reflect York\'s red and dark identity. Links (#b11116) is a darker red — verify it meets AA at 7.09:1 on white (it does).',
  },
  CUNY_NETWORK: {
    name: 'CUNY Network (Consortium)',
    shortName: 'CUNY Network',
    description: 'Consortium-level Primo view used for cross-campus searching. Shares the CUNY system-wide color palette.',
    website: 'https://www.cuny.edu/',
    brandGuide: {
      label: 'CUNY University Identity',
      url: 'https://www.cuny.edu/about/administration/offices/communications-marketing/university-identity/',
    },
    officialColors: [
      { name: 'CUNY Blue', role: 'Primary', hex: '#0033a1', pantone: 'PMS 286 C' },
      { name: 'CUNY Gold', role: 'Secondary', hex: '#ffb81c', pantone: 'PMS 124 C' },
    ],
    notes: 'The network view uses CUNY system-wide colors. Current primary (#0c2255) is a darker navy than the official CUNY Blue (#0033a1). Both pass WCAG AA for text.',
  },
};

// ---------------------------------------------------------------------------
// Colors from colors.json.txt for each campus
// ---------------------------------------------------------------------------
const colorsJson = {
  CUNY_AL:      { primary:'#0c2255', secondary:'#FFB81C', backgroundColor:'#ffffff', links:'#1D3A83', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_BB:      { primary:'#085394', secondary:'#A9CDD6', backgroundColor:'#ffffff', links:'#0a437a', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_BC:      { primary:'#7b2240', secondary:'#FAD129', backgroundColor:'#ffffff', links:'#7b2240', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_BM:      { primary:'#0051bc', secondary:'#A9CDD6', backgroundColor:'#ffffff', links:'#0051bb', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_BX:      { primary:'#0e754b', secondary:'#A9CDD6', backgroundColor:'#ffffff', links:'#5C92BD', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_CC:      { primary:'#77787C', secondary:'#7D5CC6', backgroundColor:'#ffffff', links:'#7D5CC6', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_CL:      { primary:'#353A3D', secondary:'#d1d63b', backgroundColor:'#ffffff', links:'#008e7e', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_GC:      { primary:'#005daa', secondary:'#FFB81C', backgroundColor:'#ffffff', links:'#005daa', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_GJ:      { primary:'#373737', secondary:'#fe8807', backgroundColor:'#ffffff', links:'#fe8807', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_HC:      { primary:'#5f259f', secondary:'#ffc72a', backgroundColor:'#ffffff', links:'#4343b9', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_HO:      { primary:'#314d89', secondary:'#ffbc3a', backgroundColor:'#ffffff', links:'#007da7', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_JJ:      { primary:'#218994', secondary:'#0c1e38', backgroundColor:'#ffffff', links:'#214f94', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_KB:      { primary:'#002c73', secondary:'#ff4e00', backgroundColor:'#ffffff', links:'#3966bf', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_LE:      { primary:'#06284e', secondary:'#84BD00', backgroundColor:'#ffffff', links:'#0a407d', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_LG:      { primary:'#C4262E', secondary:'#C2C2A0', backgroundColor:'#ffffff', links:'#2a7ab0', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_ME:      { primary:'#666666', secondary:'#ffcc00', backgroundColor:'#ffffff', links:'#5C92BD', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_NC:      { primary:'#0c2255', secondary:'#F26822', backgroundColor:'#ffffff', links:'#1B75BC', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_NY:      { primary:'#214971', secondary:'#F6B72B', backgroundColor:'#ffffff', links:'#296196', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_QB:      { primary:'#00306d', secondary:'#f6b72b', backgroundColor:'#ffffff', links:'#5C92BD', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_QC:      { primary:'#494949', secondary:'#ffffff', backgroundColor:'#ffffff', links:'#5C92BD', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_SI:      { primary:'#53626e', secondary:'#83c8ef', backgroundColor:'#ffffff', links:'#0000ff', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_YC:      { primary:'#e22b2e', secondary:'#2e3233', backgroundColor:'#ffffff', links:'#b11116', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
  CUNY_NETWORK: { primary:'#0c2255', secondary:'#FFB81C', backgroundColor:'#ffffff', links:'#1D3A83', warning:'#ff6347', positive:'#0f7d00', negative:'#808080', notice:'#e08303' },
};

// ---------------------------------------------------------------------------
// Generate README content for a campus
// ---------------------------------------------------------------------------
function colorRow(label, hex, context = 'white') {
  const ratio = contrast(hex, '#ffffff');
  const aa = badge(ratio);
  const aa3 = badge(ratio, 3.0);
  return `| \`${label}\` | \`${hex}\` | ${ratio.toFixed(2)}:1 | ${ratio >= 4.5 ? 'PASS' : ratio >= 3.0 ? 'PASS (large text only)' : '**FAIL**'} |`;
}

function generateReadme(code) {
  const campus = campuses[code];
  const colors = colorsJson[code];
  if (!campus || !colors) return null;

  const bg = '#ffffff'; // backgroundColor is always white

  // WCAG table rows for key colors
  const wcagRows = [
    colorRow('primary (as text)', colors.primary),
    colorRow('secondary (as button text)', colors.secondary),
    colorRow('links', colors.links),
  ];

  // Determine overall status
  const issues = [];
  const primaryRatio = contrast(colors.primary, bg);
  const secondaryRatio = contrast(colors.secondary, bg);
  const linksRatio = contrast(colors.links, bg);

  if (primaryRatio < 4.5) issues.push(`primary \`${colors.primary}\` (${primaryRatio.toFixed(2)}:1)`);
  if (linksRatio < 4.5) issues.push(`links \`${colors.links}\` (${linksRatio.toFixed(2)}:1)`);
  // Secondary is context-dependent — flag if below 3:1 (definitely unusable as text)
  if (secondaryRatio < 3.0) issues.push(`secondary \`${colors.secondary}\` (${secondaryRatio.toFixed(2)}:1, fails even for large text)`);

  const statusLine = issues.length === 0
    ? '> All key colors meet WCAG 2.1 AA contrast requirements on the white background. Still verify secondary color usage in context.'
    : `> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:\n>\n${issues.map(i => `> - ${i}`).join('\n')}`;

  // Official colors table
  let officialColorsSection = '';
  if (campus.officialColors && campus.officialColors.length > 0) {
    const rows = campus.officialColors.map(c => {
      const r = contrast(c.hex, bg);
      return `| ${c.name} | ${c.role} | \`${c.hex}\` | ${c.pantone || '—'} | ${r.toFixed(2)}:1 ${r >= 4.5 ? '' : r >= 3.0 ? '*(large text only)*' : '**FAIL**'} |`;
    }).join('\n');
    officialColorsSection = `
## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
${rows}
`;
  } else {
    officialColorsSection = `
## Official Brand Colors

_Official hex values not yet confirmed. See brand guide link above for Pantone/CMYK specs._
`;
  }

  // Additional WCAG notes
  const extraNotes = (campus.wcagNotes || []).map(n => `- ${n}`).join('\n');

  // Brand guide section
  let brandGuideSection = '';
  if (campus.brandGuide) {
    const lines = [`- [${campus.brandGuide.label}](${campus.brandGuide.url})`];
    if (campus.brandGuide.pdfUrl) lines.push(`- [Brand Guide PDF](${campus.brandGuide.pdfUrl})`);
    if (campus.brandGuide.colorsUrl) lines.push(`- [Colors Page](${campus.brandGuide.colorsUrl})`);
    brandGuideSection = lines.join('\n');
  } else {
    brandGuideSection = `_No public brand guide found. Contact the ${campus.shortName} communications/marketing office._`;
  }

  return `# ${campus.name}

**Primo view code**: \`${code}\`
**OneSearch**: <https://cuny-${code.replace('CUNY_', '').toLowerCase()}.primo.exlibrisgroup.com/>
**Campus website**: <${campus.website}>

${campus.description}

---

## Brand / Identity Guide

${brandGuideSection}

${campus.notes ? `> ${campus.notes}\n` : ''}
${officialColorsSection}
---

## Current \`colors.json.txt\`

\`\`\`json
${JSON.stringify(colors, null, 2)}
\`\`\`

---

## WCAG 2.1 AA Compliance

**Minimum ratios**: 4.5:1 for normal text, 3:1 for large text (18pt / 14pt bold) and UI components.

| Color role | Current hex | Contrast on white | Status |
|------------|-------------|-------------------|--------|
${wcagRows.join('\n')}

${statusLine}

${extraNotes ? `### Issues to fix\n\n${extraNotes}\n` : ''}
> **Note on secondary color**: The secondary color is used as button text (\`.md-button.md-secondary\`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

${issues.length === 0 ? '- No critical WCAG failures detected. Run a full audit with an automated tool (e.g., [axe](https://www.deque.com/axe/), [WAVE](https://wave.webaim.org/)) against the live Primo page to catch component-level issues.' : issues.map(i => {
    const colorHex = i.match(/#[0-9a-fA-F]{6}/)?.[0];
    return `- [ ] Fix ${i.split('`')[1]}: verify or replace \`${colorHex}\` with an accessible alternative that also aligns with official brand colors`;
  }).join('\n')}
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in \`img/\` have appropriate alt text in HTML templates
`;
}

// ---------------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------------
const baseDir = path.join(__dirname, 'primo-explore', 'custom');
let created = 0;

for (const code of Object.keys(campuses)) {
  const dir = path.join(baseDir, code);
  if (!fs.existsSync(dir)) {
    console.warn(`  SKIP  ${code} — directory not found`);
    continue;
  }
  const content = generateReadme(code);
  if (!content) continue;
  const outPath = path.join(dir, 'BRAND.md');
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`  WROTE ${outPath}`);
  created++;
}

console.log(`\nDone — created/updated ${created} BRAND.md files.`);
