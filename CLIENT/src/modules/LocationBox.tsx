import { X } from "lucide-react";
import styles from "../styles/locationbox.module.css";
import { fetchAllCountries, fetchAllStates, specificSearchCountry } from "../utils";
import type React from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

interface LocationBoxProps {

  toogleBox: React.Dispatch<React.SetStateAction<boolean>>;

}

interface BothBoxProps {
  toogleBox: React.Dispatch<React.SetStateAction<boolean>>;

}



const CountryBox = ({ toogleBox }: BothBoxProps) => {
  const [allCountries, setAllCountries] = useState<any[] | null>(null);
  const [searchedCountry, setSearchedCountry] = useState<string>("");
const {  setSelectedCountry } = useUserContext();

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
            <span key={each.country} onClick={() => setSelectedCountry(each.country)}>
              {each.country}
            </span>
          ))}
      </div>
    </div>
  );
};



function StateBox({ toogleBox }: BothBoxProps) {

  const [allStates, setAllStates] = useState<any[] | null>(null);
  const [searchedState, setSearchState] = useState<string>("");
const { selectedCountry, setSelectedState} = useUserContext();

  useEffect(() => {
    (async () => {
      console.log("selected country", selectedCountry);
      const states = await fetchAllStates(selectedCountry);
      console.log("all states ,here ", states);
      setAllStates(states);
    })();
  }, [selectedCountry]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const newList = specificSearchCountry(searchedState);
      setAllStates(newList);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchedState]);


  return (
    <div className={styles.LocationBox}>
      <X
        color="black"
        onClick={() => toogleBox((prev) => !prev)}
        className={styles.CrossButton}
      />

      <div className={styles.topRegionAndInput}>
        <span>Select Your State</span>
        <input
          type="text"
          value={searchedState}
          onChange={(e) => setSearchState(e.target.value)}
          placeholder="select your state..."
        />
      </div>

      <div className={styles.LocationLists}>
        {allStates &&
          allStates.map((each) => (
            <span key={each.name} onClick={() => setSelectedState(each.name)}>
              {each.name}
            </span>
          ))}
      </div>
    </div>
  )
}

function LocationBox({ toogleBox }: LocationBoxProps) {

const { selectedCountry, selectedState } = useUserContext();

  return (
    <div className={styles.blackBehindContainer}>
      {selectedCountry == "" ?

        (<CountryBox toogleBox={toogleBox} />)

        :

        (selectedState == "" && <StateBox toogleBox={toogleBox} />)

      }
    </div>
  );
}

export default LocationBox;
