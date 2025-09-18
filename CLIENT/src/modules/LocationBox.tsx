import { X } from "lucide-react";
import styles from "../styles/locationbox.module.css";
import { fetchAllCountries, specificSearchCountry } from "../utils";
import type React from "react";
import { useEffect, useState } from "react";

interface LocationBoxProps {
  toogleBox: React.Dispatch<React.SetStateAction<boolean>>;
}

function LocationBox({ toogleBox }: LocationBoxProps) {
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
    <div className={styles.blackBehindContainer}>
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
              <span key={each.name}>{each.name}</span>
            ))}
        </div>
      </div>
    </div>
  );
}

export function StateBox({ toogleBox }: LocationBoxProps) {
  toogleBox(true);
}

export default LocationBox;
