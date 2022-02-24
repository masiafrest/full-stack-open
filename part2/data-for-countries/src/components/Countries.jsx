import CountryList from "./CountryList";
import Country from "./Country";

export default function countries({ country, countries }) {
  const filterCountries = countries.filter((e) =>
    e.name.common.toLowerCase().includes(country)
  );
  const len = filterCountries.length;

  if (len > 10) return <div>Too many matches, specify another filter</div>;
  if (len > 1 && len < 10) return <CountryList countries={filterCountries} />;
  if (len === 1) {
    return <Country data={filterCountries[0]} />;
  }
  if (len === 0) return <div>no matches</div>;
  return <div>loading....</div>;
}
