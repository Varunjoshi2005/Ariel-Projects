import { X } from "lucide-react";
import styles from "../styles/locationbox.module.css";
import { fetchAllCountries, specificSearchCountry } from "../utils";
import type React from "react";
import { useEffect, useState } from "react";

interface LocationBoxProps {
  toogleBox: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BothBoxProps {
  toogleBox: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const CountryBox = ({ toogleBox, setValue, value }: BothBoxProps) => {
  const [allCountries, setAllCountries] = useState<any[] | null>(null);
  const [searchedCountry, setSearchedCountry] = useState<string>("");

  useEffect(() => {
    (async () => {
      const countries = await fetchAllCountries();
      setAllCountries(countries);
    })();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const newList = specificSearchCountry(searchedCountry);
      setAllCountries(newList);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchedCountry]);

  return (
    <div className={styles.LocationBox}>
      <X
        color="black"
        onClick={() => toogleBox((prev) => !prev)}
        className={styles.CrossButton}
      />

      <div className={styles.topRegionAndInput}>
        <span>Select Your Region</span>
        <input
          type="text"
          value={searchedCountry}
          onChange={(e) => setSearchedCountry(e.target.value)}
          placeholder="select your country..."
        />
      </div>

      <div className={styles.LocationLists}>
        {allCountries &&
          allCountries.map((each) => (
            <span key={each.name} onClick={() => setValue(each.name)}>
              {each.name}
            </span>
          ))}
      </div>
    </div>
  );
};

export function StateBox({ toogleBox, setValue, value }: BothBoxProps) {
  toogleBox(true);
}

function LocationBox({ toogleBox }: LocationBoxProps) {
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");

  return (
    <div className={styles.blackBehindContainer}>
      {country == "" && (
        <CountryBox toogleBox={toogleBox} setValue={setCountry} value={state} />
      )}

      {}
    </div>
  );
}

export default LocationBox;
