export interface Country {
  name: string;
  title: string;
  officialName: string;
  sovereignty: {
    status: string;
    sovereign: string;
  };
  exonyms: string[];
  alpha2: string;
  alpha3: string;
  numeric: string;
}

export interface Settings {
  showOutlines: boolean;
  gridlines: boolean;
  autoSubmit: boolean;
  showLabels: boolean;
  projection: Projection;
}

export const projections = [
  "geoEqualEarth",
  "geoAzimuthalEqualArea",
  "geoAzimuthalEquidistant",
  "geoOrthographic",
  "geoConicConformal",
  "geoConicEqualArea",
  "geoConicEquidistant",
  "geoStereographic",
  "geoMercator",
  "geoTransverseMercator",
] as const;
export type Projection = (typeof projections)[number];
