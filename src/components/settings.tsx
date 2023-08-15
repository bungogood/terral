import React from "react";
import { Projection, Settings, projections } from "~/utils/model";

type GameSettingsProps = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

const GameSettings = ({ settings, setSettings }: GameSettingsProps) => {
  return (
    <div>
      <label>Projections</label>
      <select
        id="projection"
        name="projection"
        onChange={(e) =>
          setSettings({
            ...settings,
            projection: e.target.value as Projection,
          })
        }
      >
        {projections.map((projection) => (
          <option key={projection} value={projection}>
            {projection}
          </option>
        ))}
      </select>
      <label>Gridlines</label>
      <input
        type="checkbox"
        id="gridlines"
        name="gridlines"
        onChange={() =>
          setSettings({
            ...settings,
            gridlines: !settings.gridlines,
          })
        }
        checked={settings.gridlines}
      />
      <label>Outlines</label>
      <input
        type="checkbox"
        id="outlines"
        name="outlines"
        onChange={() =>
          setSettings({
            ...settings,
            showOutlines: !settings.showOutlines,
          })
        }
        checked={settings.showOutlines}
      />
      <label>Auto Submit</label>
      <input
        type="checkbox"
        id="autoSubmit"
        name="autoSubmit"
        onChange={() =>
          setSettings({
            ...settings,
            autoSubmit: !settings.autoSubmit,
          })
        }
        checked={settings.autoSubmit}
      />
      <label>Auto Labels</label>
      <input
        type="checkbox"
        id="showLabels"
        name="showLabels"
        onChange={() =>
          setSettings({
            ...settings,
            showLabels: !settings.showLabels,
          })
        }
        checked={settings.showLabels}
      />
    </div>
  );
};

export default GameSettings;
