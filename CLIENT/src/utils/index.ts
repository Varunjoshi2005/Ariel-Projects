const DummyLocations = [
  "INDIA",
  "USA",
  "CANADA",
  "AUSTRALIA",
  "GERMANY",
  "FRANCE",
  "JAPAN",
  "BRAZIL",
  "UK",
  "CHINA",
  "RUSSIA",
  "SOUTH AFRICA",
  "MEXICO",
  "ITALY",
  "SPAIN",
  "SINGAPORE",
  "NEW ZEALAND",
  "ARGENTINA",
  "NETHERLANDS",
  "SWEDEN",
  "NORWAY",
  "DENMARK",
  "FINLAND",
  "IRELAND",
  "SWITZERLAND",
  "POLAND",
  "AUSTRIA",
  "BELGIUM",
  "PORTUGAL",
  "TURKEY",
  "UAE",
  "SAUDI ARABIA",
  "EGYPT",
  "NIGERIA",
  "KENYA",
  "THAILAND",
  "VIETNAM",
  "PHILIPPINES",
  "SOUTH KOREA",
  "COLOMBIA",
  "PERU",
];

let cacheCountry: any = [];

const countryUrl =
  "https://proxy.corsfix.com/?https://www.apicountries.com/countries";

const fetchAllCountries = async () => {
  const res = await fetch(countryUrl);
  const result = await res.json();
  cacheCountry = result;
  return result;
};

const specificSearchCountry = (searchQuery: string) => {
  const regex = new RegExp(searchQuery, "i");

  const matchedCountries = cacheCountry.filter((each: any) => {
    return regex.test(each.name);
  });
  return matchedCountries;
};

export { DummyLocations, fetchAllCountries, specificSearchCountry };
