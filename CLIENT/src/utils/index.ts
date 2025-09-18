
let cacheCountry: any = [];

const countryUrl = "https://countriesnow.space/api/v0.1/countries";
const statesUrl = "https://countriesnow.space/api/v0.1/countries/states";



const fetchAllCountries = async () => {
  const res = await fetch(countryUrl);
  const result = await res.json();
  cacheCountry = result.data;
 console.log(result);
  return result.data;
};

const specificSearchCountry = (searchQuery: string) => {
  const regex = new RegExp(searchQuery, "i");

  const matchedCountries = cacheCountry.filter((each: any) => {
    return regex.test(each.name);
  });
  return matchedCountries;
};

const fetchAllStates = async (countryName: string) => {
   
  const res = await fetch(statesUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: countryName })
  });

  const result = await res.json();
  return result.data.states


}


export { fetchAllStates, fetchAllCountries, specificSearchCountry };
