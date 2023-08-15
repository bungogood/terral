import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";
import { Country, Settings } from "~/utils/model";

type MapChartProps = {
  width: number;
  height: number;
  settings: Settings;
  countries: Country[];
  found: Country[];
  geography: any;
};

const Chart = ({
  width,
  height,
  settings,
  found,
  countries,
  geography,
}: MapChartProps) => {
  const [discovered, setDiscovered] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fids = found.map((country) => country.numeric);
    setDiscovered(() =>
      countries
        .filter(
          (country) =>
            fids.includes(country.numeric) ||
            (country.sovereignty.sovereign &&
              fids.includes(country.sovereignty.sovereign))
        )
        .map((country) => country.numeric)
    );
  }, [found, countries]);

  return (
    <ComposableMap
      projection={settings.projection}
      width={width}
      height={height}
    >
      <ZoomableGroup
        translateExtent={[
          [0, 0],
          [width, height],
        ]}
      >
        {settings.gridlines && <Graticule />}
        <Geographies geography={geography}>
          {({ geographies }) =>
            geographies.map(
              (geo) =>
                (settings.showOutlines || discovered.includes(geo.id)) && (
                  <Geography
                    className={discovered.includes(geo.id) ? "discovered" : ""}
                    key={geo.rsmKey}
                    geography={geo}
                  />
                )
            )
          }
        </Geographies>
        {settings.gridlines && (
          <Sphere
            id="rsm-sphere"
            stroke="currentcolor"
            strokeWidth={0.5}
            fill="transparent"
          />
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default Chart;
