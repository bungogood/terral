import React from "react";
import rawdata from "../data/data.json";
import topo from "../data/countries-50m.json";
import { Country, Settings } from "~/utils/model";
import Chart from "./chart";
import GameSettings from "./settings";
import Guesser from "./guesser";

const tids = topo.objects.countries.geometries.map((geo) => geo.id);
const countries = (rawdata.countries as Country[]).filter((state) =>
  tids.includes(state.numeric)
);

const Game = () => {
  const [settings, setSettings] = React.useState<Settings>({
    showOutlines: true,
    gridlines: true,
    autoSubmit: true,
    showLabels: false,
    projection: "geoEqualEarth",
  });

  const [found, setFound] = React.useState<Country[]>([]);

  return (
    <>
      <h1>Terral</h1>
      <GameSettings settings={settings} setSettings={setSettings} />
      <div className="chart-container">
        <Chart
          width={980}
          height={500}
          settings={settings}
          found={found}
          countries={countries}
          geography={topo}
        />
      </div>
      <Guesser
        settings={settings}
        found={found}
        setFound={setFound}
        countries={countries}
      />
    </>
  );
};

export default Game;
