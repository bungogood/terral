import React from "react";
import { Country, Settings } from "~/utils/model";

type GuesserProps = {
  settings: Settings;
  countries: Country[];
  found: Country[];
  setFound: React.Dispatch<React.SetStateAction<Country[]>>;
};

const Guesser = ({ settings, countries, found, setFound }: GuesserProps) => {
  const [guess, setGuess] = React.useState<string>("");

  const possible = countries.filter(
    (country) => !country.sovereignty.sovereign
  );

  const countryMap = new Map<string, Country>();
  possible.forEach((country) => {
    countryMap.set(country.name.toLowerCase(), country);
    country.exonyms.forEach((exonym) => {
      countryMap.set(exonym.toLowerCase(), country);
    });
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
    if (settings.autoSubmit) {
      search(event.target.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      search(guess);
    }
  };

  const search = (value: string) => {
    const country = countryMap.get(value.toLowerCase());
    if (country) {
      if (!found.map((c) => c.numeric).includes(country.numeric)) {
        setFound((discovered) => [...discovered, country]);
        setGuess("");
      } else {
        console.log("already found");
      }
    }
  };

  return (
    <>
      <input
        className="guess-input"
        type="text"
        placeholder="Guess"
        value={guess}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <p>
        {found.length}/{possible.length}
      </p>
      {/* {settings.showLabels &&
        Labels({ regions: data.regions, found, possible })} */}
    </>
  );
};

// const Labels = (props: {
//   regions: string[];
//   found: string[];
//   possible: Country[];
// }) => {
//   return (
//     <>
//       {props.regions.map((region) => (
//         <div>
//           <h2>{region}</h2>
//           <ul>
//             {props.possible
//               .filter((country) => country.region === region)
//               .sort((a, b) => a.name.localeCompare(b.name))
//               .map((country) => (
//                 <li
//                   className={
//                     props.found.includes(country.alpha3) ? "found-label" : ""
//                   }
//                 >
//                   {country.name}
//                 </li>
//               ))}
//           </ul>
//         </div>
//       ))}
//     </>
//   ); // // {props.found.includes(country.alpha3) && country.name}
// };

export default Guesser;
